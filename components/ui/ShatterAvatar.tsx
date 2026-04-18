"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const W = 340;
const H = 420;
const CELL = 4;
const DOT_SCALE = 0.9;
const COLLAPSE_MS = 900;
const HOLD_MS = 2000;
const ASSEMBLE_MS = 900;
const SWIRL_TURNS = 1.2;
const BG = "#000319";
const TINT = { r: 203, g: 172, b: 249 }; // #CBACF9
const TINT_STRENGTH = 0.1;

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
      let data: Uint8ClampedArray;
      try {
        data = octx.getImageData(0, 0, W, H).data;
      } catch (e) {
        // 跨域兜底：直接返回空，仍不影响组件可渲染
        resolve([]);
        return;
      }
      const parts: Particle[] = [];
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL) {
          const cx = Math.min(W - 1, x + (CELL >> 1));
          const cy = Math.min(H - 1, y + (CELL >> 1));
          const idx = (cy * W + cx) * 4;
          const a = data[idx + 3];
          if (a < 8) continue;
          let r = data[idx];
          let g = data[idx + 1];
          let b = data[idx + 2];
          // 轻微紫色调
          r = Math.round(r * (1 - TINT_STRENGTH) + TINT.r * TINT_STRENGTH);
          g = Math.round(g * (1 - TINT_STRENGTH) + TINT.g * TINT_STRENGTH);
          b = Math.round(b * (1 - TINT_STRENGTH) + TINT.b * TINT_STRENGTH);
          parts.push({
            x: x + CELL / 2,
            y: y + CELL / 2,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }
      resolve(parts);
    };
    img.onerror = () => reject(new Error(`load fail: ${src}`));
    img.src = src;
  });

const paintStatic = (
  ctx: CanvasRenderingContext2D,
  parts: Particle[]
) => {
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  const sz = CELL * DOT_SCALE;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
  }
};

// mode: "collapse" 粒子→中心 / "assemble" 中心→粒子
const runAnim = (
  ctx: CanvasRenderingContext2D,
  parts: Particle[],
  mode: "collapse" | "assemble",
  duration: number
): Promise<void> =>
  new Promise((resolve) => {
    const t0 = performance.now();
    const cx = W / 2;
    const cy = H / 2;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased =
        mode === "collapse" ? t * t * t : 1 - Math.pow(1 - t, 3);
      ctx.fillStyle = BG;
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
          mode === "collapse"
            ? theta0 + swirl
            : theta0 - (1 - eased) * SWIRL_TURNS * Math.PI * 2;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarPartsRef = useRef<Particle[]>([]);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  // 预加载头像粒子 → 绘制 idle
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const parts = await loadParticles(AVATAR_SRC);
        if (cancelled) return;
        avatarPartsRef.current = parts;
        setReady(true);
        const c = canvasRef.current;
        if (c) {
          const ctx = c.getContext("2d");
          if (ctx && phaseRef.current === "idle") paintStatic(ctx, parts);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[ShatterAvatar] avatar load failed", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (phaseRef.current !== "idle" || !ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parts = avatarPartsRef.current;
    if (!parts.length) return;

    // 1) 塌陷：头像粒子向中心螺旋收缩
    phaseRef.current = "collapse";
    setPhase("collapse");
    await runAnim(ctx, parts, "collapse", COLLAPSE_MS);

    // 2) 展示猫图 2s
    phaseRef.current = "cat";
    setPhase("cat");
    await new Promise((r) => setTimeout(r, HOLD_MS));

    // 3) 组合回头像：粒子从中心螺旋展开
    phaseRef.current = "assemble";
    setPhase("assemble");
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    await runAnim(ctx, parts, "assemble", ASSEMBLE_MS);

    // 4) 回 idle
    phaseRef.current = "idle";
    setPhase("idle");
    paintStatic(ctx, parts);
  }, [ready]);

  return (
    <div
      onClick={handleClick}
      className={`relative select-none ${
        phase === "idle" && ready ? "cursor-pointer" : "cursor-default"
      }`}
      role="button"
      aria-label="点击头像切换"
      style={{ width: W, height: H }}
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="block rounded-2xl border border-white/[0.1] shadow-[0_0_40px_rgba(203,172,249,0.15)]"
        style={{ width: W, height: H, background: BG }}
      />

      {/* cat：静态猫图「营业中·欢迎光临」，覆盖在 canvas 之上 */}
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

      {/* loading 提示（仅粒子还没采样完的极短窗口） */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30 tracking-widest">
          LOADING…
        </div>
      )}
    </div>
  );
};

export default ShatterAvatar;
