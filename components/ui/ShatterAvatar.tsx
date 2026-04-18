"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PixelatedCanvas } from "./pixelated-canvas";

const COLS = 10;
const ROWS = 8;
const SHATTER_MS = 900;
const HOLD_MS = 2000;

type Phase = "idle" | "shatter-out" | "cat" | "shatter-back";

type Shard = {
  row: number;
  col: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
};

const AVATAR_SRC = "/avatar.jpg";
const CAT_SRC = "/cat-welcome.png";

const buildShards = (): Shard[] => {
  const shards: Shard[] = [];
  const cx = (COLS - 1) / 2;
  const cy = (ROWS - 1) / 2;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // 方向：远离中心
      const vx = c - cx;
      const vy = r - cy;
      const len = Math.max(0.001, Math.sqrt(vx * vx + vy * vy));
      const push = 600 + Math.random() * 500; // px
      const jitterX = (Math.random() - 0.5) * 200;
      const jitterY = (Math.random() - 0.5) * 200;
      shards.push({
        row: r,
        col: c,
        dx: (vx / len) * push + jitterX,
        dy: (vy / len) * push + jitterY,
        rot: (Math.random() - 0.5) * 720,
        delay: Math.random() * 80,
      });
    }
  }
  return shards;
};

const ShatterOverlay = ({ src, keyName }: { src: string; keyName: string }) => {
  // 每次进入都重新摇一套碎片方向
  const shards = useMemo(buildShards, [keyName]);

  return (
    <motion.div
      key={keyName}
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {shards.map((s, i) => {
        // 每片覆盖一块 grid 区域；background 反向拼出整幅图
        const cellW = 100 / COLS;
        const cellH = 100 / ROWS;
        return (
          <motion.div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: `${s.col * cellW}%`,
              top: `${s.row * cellH}%`,
              width: `${cellW}%`,
              height: `${cellH}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(s.col / (COLS - 1)) * 100}% ${
                (s.row / (ROWS - 1)) * 100
              }%`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 0 1px rgba(0,0,0,0.35)",
            }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: s.dx,
              y: s.dy,
              rotate: s.rot,
              opacity: 0,
            }}
            transition={{
              duration: SHATTER_MS / 1000,
              ease: [0.22, 0.7, 0.2, 1],
              delay: s.delay / 1000,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export const ShatterAvatar = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showCat, setShowCat] = useState(false);

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;

    // 1) 破碎——头像
    setPhase("shatter-out");
    setTimeout(() => {
      setShowCat(true);
      setPhase("cat");
      // 2) 猫图停留
      setTimeout(() => {
        setPhase("shatter-back");
        setTimeout(() => {
          setShowCat(false);
          setPhase("idle");
        }, SHATTER_MS);
      }, HOLD_MS);
    }, SHATTER_MS);
  }, [phase]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`relative ${
          phase === "idle" ? "cursor-pointer" : "cursor-default"
        }`}
        role="button"
        aria-label="点击头像"
      >
        {/* 底层永远是 PixelatedCanvas 头像 */}
        <div
          className={`transition-opacity duration-200 ${
            showCat ? "opacity-0" : "opacity-100"
          }`}
        >
          <PixelatedCanvas
            src={AVATAR_SRC}
            width={340}
            height={420}
            cellSize={3}
            dotScale={0.88}
            shape="square"
            backgroundColor="#000319"
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
        </div>

        {/* 猫图覆盖层（「营业中·欢迎光临」） */}
        {showCat && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/[0.1] bg-white shadow-[0_0_40px_rgba(203,172,249,0.25)] overflow-hidden">
            <motion.img
              src={CAT_SRC}
              alt="营业中 欢迎光临"
              className="w-full h-full object-contain p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* 全局破碎 overlay */}
      <AnimatePresence>
        {phase === "shatter-out" && (
          <ShatterOverlay src={AVATAR_SRC} keyName="out" />
        )}
        {phase === "shatter-back" && (
          <ShatterOverlay src={CAT_SRC} keyName="back" />
        )}
      </AnimatePresence>
    </>
  );
};

export default ShatterAvatar;
