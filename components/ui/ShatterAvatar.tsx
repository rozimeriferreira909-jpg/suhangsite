"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PixelatedCanvas } from "./pixelated-canvas";

const W = 340;
const H = 420;
const CELL = 4; // 粒子粒度（像素格边长）
const DOT_SCALE = 0.88; // 方块绘制比例
const COLLAPSE_MS = 900;
const HOLD_MS = 2000;
const ASSEMBLE_MS = 900;
const SWIRL_TURNS = 1.2; // 塌陷 / 组合过程中的旋转圈数
const BG = "#000319";

const AVATAR_SRC = "/avatar.jpg";
const CAT_SRC = "/cat-welcome.png";

type Phase = "idle" | "collapse" | "cat" | "assemble";

type Particle = {
  x: number;
  y: number;
  color: string;
};

const loadParticles = (src: string): Promise<Particle[]> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) {
        resolve([]);
        return;
      }
      // cover 裁切
      const ir = img.width / img.height;
      const cr = W / H;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) {
        sh = img.height;
        sw = img.height * cr;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / cr;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      const data = octx.getImageData(0, 0, W, H).data;
      const parts: Particle[] = [];
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL) {
          const cx = Math.min(W - 1, x + (CELL >> 1));
          const cy = Math.min(H - 1, y + (CELL >> 1));
          const idx = (cy * W + cx) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a < 8) continue;
          parts.push({
            x: x + CELL / 2,
            y: y + CELL / 2,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }
      resolve(parts);
    };
    img.onerror = reject;
    img.src = src;
  });

const drawStatic = (
  ctx: CanvasRenderingContext2D,
  parts: Particle[],
  bg: string
) => {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const sz = CELL * DOT_SCALE;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
  }
};

// mode: "collapse" 塌陷（粒子→中心） / "assemble" 组合（中心→粒子）
const runAnim = (
  ctx: CanvasRenderingContext2D,
  parts: Particle[],
  mode: "collapse" | "assemble",
  duration: number,
  bg: string
): Promise<void> =>
  new Promise((resolve) => {
    const t0 = performance.now();
    const cx = W / 2;
    const cy = H / 2;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      // 塌陷：easeInCubic（后段加速）；组合：easeOutCubic（前段快）
      const eased =
        mode === "collapse" ? t * t * t : 1 - Math.pow(1 - t, 3);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      const swirl = eased * SWIRL_TURNS * Math.PI * 2;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const dx = p.x - cx;
        const dy = p.y - cy;
        const r0 = Math.sqrt(dx * dx + dy * dy);
        const theta0 = Math.atan2(dy, dx);
        const rFactor = mode === "collapse" ? 1 - eased : eased;
        const r = r0 * rFactor;
        const theta =
          mode === "collapse" ? theta0 + swirl : theta0 - (1 - eased) * SWIRL_TURNS * Math.PI * 2;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        const sizeFactor =
          mode === "collapse" ? 1 - eased * 0.7 : 0.3 + eased * 0.7;
        const alpha =
          mode === "collapse"
            ? Math.max(0, 1 - eased * 0.85)
            : Math.min(1, 0.2 + eased);
        const sz = CELL * DOT_SCALE * sizeFactor;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });

export const ShatterAvatar = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarPartsRef = useRef<Particle[]>([]);
  const catPartsRef = useRef<Particle[]>([]);
  const readyRef = useRef(false);

  // 预加载粒子数据（只做一次）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [a, c] = await Promise.all([
        loadParticles(AVATAR_SRC),
        loadParticles(CAT_SRC),
      ]);
      if (cancelled) return;
      avatarPartsRef.current = a;
      catPartsRef.current = c;
      readyRef.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (phase !== "idle" || !readyRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1) 塌陷：头像粒子 → 中心
    setPhase("collapse");
    // 第一帧先铺静态头像，避免 PixelatedCanvas 切到空白的闪烁
    drawStatic(ctx, avatarPartsRef.current, BG);
    await new Promise((r) => requestAnimationFrame(r));
    await runAnim(ctx, avatarPartsRef.current, "collapse", COLLAPSE_MS, BG);

    // 2) 猫图停留
    setPhase("cat");
    await new Promise((r) => setTimeout(r, HOLD_MS));

    // 3) 组合回头像：粒子从中心 → 各自位置
    setPhase("assemble");
    // 初始全黑，粒子会从中心弹出
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    await new Promise((r) => requestAnimationFrame(r));
    await runAnim(ctx, avatarPartsRef.current, "assemble", ASSEMBLE_MS, BG);

    // 4) 回到 idle（PixelatedCanvas 重新接管）
    setPhase("idle");
  }, [phase]);

  return (
    <div
      onClick={handleClick}
      className={`relative select-none ${
        phase === "idle" ? "cursor-pointer" : "cursor-default"
      }`}
      role="button"
      aria-label="点击头像切换"
      style={{ width: W, height: H }}
    >
      {/* idle：PixelatedCanvas（保留 hover swirl 交互） */}
      {phase === "idle" && (
        <PixelatedCanvas
          src={AVATAR_SRC}
          width={W}
          height={H}
          cellSize={3}
          dotScale={0.88}
          shape="square"
          backgroundColor={BG}
          dropoutStrength={0.3}
          interactive
          distortionStrength={4}
          distortionRadius={90}
          distortionMode="swirl"
          followSpeed={0.15}
          jitterStrength={3}
          jitterSpeed={3}
          sampleAverage
          tintColor="#CBACF9"
          tintStrength={0.1}
          className="rounded-2xl border border-white/[0.1] shadow-[0_0_40px_rgba(203,172,249,0.15)]"
        />
      )}

      {/* collapse / assemble：自绘粒子 canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="absolute inset-0 rounded-2xl border border-white/[0.1] shadow-[0_0_40px_rgba(203,172,249,0.15)]"
        style={{
          display:
            phase === "collapse" || phase === "assemble" ? "block" : "none",
          width: W,
          height: H,
        }}
      />

      {/* cat：静态猫图「营业中·欢迎光临」 */}
      {phase === "cat" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/[0.1] bg-white overflow-hidden shadow-[0_0_40px_rgba(203,172,249,0.25)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAT_SRC}
            alt="营业中 欢迎光临"
            className="w-full h-full object-contain p-4"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default ShatterAvatar;
