"use client";

/**
 * 项目卡片封面：空占位
 * - 低调虚线边框 + 居中「敬请期待」小字 + 加号
 */
export const EmptyCover = () => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(90% 80% at 50% 40%, #11142a 0%, #0a0c1e 100%)",
      }}
    >
      <div
        className="absolute inset-3 rounded-xl flex flex-col items-center justify-center"
        style={{
          border: "1px dashed rgba(203,172,249,0.25)",
        }}
      >
        <div
          className="text-[clamp(28px,5vw,56px)] leading-none"
          style={{ color: "rgba(203,172,249,0.55)", fontWeight: 200 }}
        >
          +
        </div>
        <p
          className="mt-3 tracking-[0.3em] uppercase"
          style={{
            fontSize: "11px",
            color: "rgba(190,193,221,0.45)",
          }}
        >
          coming soon
        </p>
        <p
          className="mt-1"
          style={{
            fontSize: "12px",
            color: "rgba(190,193,221,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          敬请期待
        </p>
      </div>
    </div>
  );
};

export default EmptyCover;
