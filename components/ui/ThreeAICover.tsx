"use client";

/**
 * 项目卡片封面：三 AI 协同主题
 * - 浅色极简底 + 超粗中文标题
 * - "三个" 紫色渐变 / "AI" 暖红粉渐变，突出可视差
 * - 下方一行副标，浅色小字
 */
export const ThreeAICover = () => {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #FFFFFF 0%, #F3F4F7 60%, #E9EAF0 100%)",
      }}
    >
      {/* 主标题 */}
      <div
        className="text-center leading-[1.05]"
        style={{
          fontFamily:
            '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
          fontWeight: 900,
          color: "#0B1020",
          letterSpacing: "-0.02em",
        }}
      >
        <div className="text-[clamp(20px,4.2vw,40px)] flex items-center justify-center gap-[0.18em]">
          <span>让</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #7C3AED 0%, #A855F7 45%, #6366F1 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            三个
          </span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F43F5E 0%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
        </div>
        <div className="text-[clamp(18px,3.8vw,36px)] mt-[0.15em]">
          替你把想法辩清楚
        </div>
      </div>

      {/* 副标 */}
      <p
        className="mt-5 max-w-[92%] text-center"
        style={{
          fontFamily:
            '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
          fontSize: "clamp(10px,1.2vw,13px)",
          lineHeight: 1.7,
          color: "rgba(20,22,40,0.55)",
        }}
      >
        Claude Code、Gemini CLI、Codex 在你本机协同——互相拆台、互相补位、互相打分。
        <br className="hidden sm:block" />
        全部数据留在你 Mac 上，不走云端。
      </p>
    </div>
  );
};

export default ThreeAICover;
