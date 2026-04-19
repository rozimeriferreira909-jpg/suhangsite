import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "线性方法 · 建造实践",
  description:
    "苏苏一人公司系统，与君共享。打造真正高质量软件的技艺已逐渐失传，以下是构建所依据的基本理念。",
};

const SERIF_STACK =
  '"Noto Serif SC","Source Han Serif SC","Source Han Serif CN","Songti SC","SimSun","STSong",serif';

const PRINCIPLES = [
  {
    tag: "01 — 愿景",
    title: "为创造者而建",
    body:
      "Linear 面向真正关心产品的人——工程师、设计师、产品经理。他们希望心无旁骛地做出好东西，而不是与流程和工具做斗争。",
  },
  {
    tag: "02 — 原则",
    title: "重要的事，而非便利的事",
    body:
      "我们拒绝用热闹填满屏幕。每一条路径、每一个按钮，都必须服务于真正关键的工作，而不是图一时方便。",
  },
  {
    tag: "03 — 专注",
    title: "聚焦于本质",
    body:
      "最好的软件常常不是功能最多的，而是去掉了多余之后剩下的。我们相信克制会带来更长久的力量。",
  },
  {
    tag: "04 — 速度",
    title: "速度即一种尊重",
    body:
      "当工具足够快，思考就不会被打断。速度不是炫技，而是对使用者注意力最基本的尊重。",
  },
  {
    tag: "05 — 品质",
    title: "追求工艺感",
    body:
      "像工匠一样对待每一个细节。真正的品质不是一次大突破，而是成千上万次小决定的结果。",
  },
];

/**
 * 卡片内部使用的 Venn 双圆
 * - 尺寸适配卡片容器（viewBox 固定，随卡片宽度缩放）
 * - 两圆反向旋转
 */
function VennCirclesCard() {
  const R = 260;
  const CX1 = 320;
  const CX2 = 500;
  const CY = 320;
  const W = 820;
  const H = 640;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full h-auto"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="card-diagonal-stripes"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          />
        </pattern>
        <clipPath id="card-left-circle-clip">
          <circle cx={CX1} cy={CY} r={R} />
        </clipPath>
      </defs>

      {/* 交集斜线：右圆被左圆裁出 lens */}
      <g clipPath="url(#card-left-circle-clip)">
        <circle cx={CX2} cy={CY} r={R} fill="url(#card-diagonal-stripes)" />
      </g>

      {/* 左圆：顺时针旋转 */}
      <g
        style={{
          transformOrigin: `${CX1}px ${CY}px`,
          animation: "methodSpin 40s linear infinite",
        }}
      >
        <circle
          cx={CX1}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        {/* 高亮弧段 */}
        <path
          d={`M ${CX1 - R * 0.72} ${CY + R * 0.72}
              Q ${CX1 - R * 0.25} ${CY + R * 0.99}
                ${CX1 + R * 0.18} ${CY + R * 0.97}`}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>

      {/* 右圆：逆时针旋转 */}
      <g
        style={{
          transformOrigin: `${CX2}px ${CY}px`,
          animation: "methodSpinReverse 50s linear infinite",
        }}
      >
        <circle
          cx={CX2}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        {/* 右上高亮弧段 */}
        <path
          d={`M ${CX2 + R * 0.72} ${CY - R * 0.72}
              Q ${CX2 + R * 0.25} ${CY - R * 0.99}
                ${CX2 - R * 0.18} ${CY - R * 0.97}`}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function MethodPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* 旋转关键帧 */}
      <style>{`
        @keyframes methodSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes methodSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      {/* HERO：项目卡片风格 */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <a
          href="https://www.suhangcompany.site"
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full max-w-[920px] rounded-[28px] border border-white/10
                     bg-gradient-to-b from-white/[0.03] to-white/[0.01]
                     p-6 md:p-8 lg:p-10
                     shadow-[0_0_60px_rgba(255,255,255,0.04)]
                     transition-all duration-500
                     hover:border-white/20 hover:shadow-[0_0_80px_rgba(255,255,255,0.08)]"
        >
          {/* 顶部视觉区：Venn 双圆（可旋转） */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10
                       bg-[#0a0a0a]
                       aspect-[820/520]
                       flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <VennCirclesCard />
            </div>
          </div>

          {/* 标题区 */}
          <div className="pt-8 md:pt-10">
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-5">
              线性方法 · Method
            </p>
            <h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: SERIF_STACK,
                fontWeight: 800,
                fontSize: "clamp(34px, 5vw, 64px)",
              }}
            >
              建造实践
            </h1>

            <p className="mt-5 text-[15px] md:text-[17px] leading-[1.9] text-white/60 max-w-[620px]">
              苏苏一人公司系统，与君共享。
            </p>

            {/* 底部：技术栈占位 + CTA */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {["N", "T", "Ts", "△", "M"].map((s, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10
                               flex items-center justify-center text-[12px] text-white/55
                               backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-2 text-[15px] md:text-[16px]
                           text-[#CBACF9] tracking-wide
                           transition-transform duration-300
                           group-hover:translate-x-1"
              >
                查看详情
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* 往下的正文：五条理念 */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto space-y-40">
          {PRINCIPLES.map((p) => (
            <article key={p.tag} className="group">
              <p className="text-[11px] tracking-[0.3em] text-white/40 mb-6">
                {p.tag}
              </p>
              <h2
                className="text-white leading-[1.05] mb-8"
                style={{
                  fontFamily: SERIF_STACK,
                  fontWeight: 800,
                  fontSize: "clamp(40px, 5.2vw, 72px)",
                }}
              >
                {p.title}
              </h2>
              <p className="text-white/60 leading-[2] text-[15px] md:text-[16px] max-w-[560px]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-white/10 py-10 px-6 text-center">
        <p className="text-[11px] tracking-[0.3em] text-white/30 uppercase">
          — fin —
        </p>
      </footer>
    </main>
  );
}
