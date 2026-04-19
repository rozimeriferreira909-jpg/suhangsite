"use client";

/**
 * 项目卡片封面：Linear Method 风双圆 Venn 图
 * - 两圆反向旋转（左顺 40s / 右逆 50s）
 * - 圆环用更明显的虚线 + 柔和发光
 * - 左紫（#CBACF9）/ 右蓝（#79C8FF），旋转方向一目了然
 * - 每圆带一段"粗亮弧段"让转动感更足
 * - 交集区域填细密斜线（静止锚点）
 */
export const VennRotating = () => {
  const R = 210;
  const CX1 = 290;
  const CX2 = 450;
  const CY = 280;
  const W = 740;
  const H = 560;

  return (
    <div className="relative w-full h-full bg-[#07070d] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes vennSpinCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes vennSpinCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      {/* 背景柔和的径向光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(203,172,249,0.10) 0%, rgba(121,200,255,0.05) 40%, transparent 75%)",
        }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full relative"
        aria-hidden="true"
      >
        <defs>
          {/* 交集斜线 */}
          <pattern
            id="venn-stripes"
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
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1"
            />
          </pattern>
          <clipPath id="venn-left-clip">
            <circle cx={CX1} cy={CY} r={R} />
          </clipPath>

          {/* 左圆发光滤镜 */}
          <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* 右圆发光滤镜 */}
          <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 高亮弧段用的渐变 */}
          <linearGradient id="arc-purple" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBACF9" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="arc-blue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#79C8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 交集斜线（静止） */}
        <g clipPath="url(#venn-left-clip)">
          <circle cx={CX2} cy={CY} r={R} fill="url(#venn-stripes)" />
        </g>

        {/* 左圆：顺时针 · 紫色 */}
        <g
          style={{
            transformOrigin: `${CX1}px ${CY}px`,
            animation: "vennSpinCW 40s linear infinite",
          }}
          filter="url(#glow-purple)"
        >
          {/* 底层稍虚的环 */}
          <circle
            cx={CX1}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(203,172,249,0.25)"
            strokeWidth="2"
          />
          {/* 明显虚线环 */}
          <circle
            cx={CX1}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(203,172,249,0.85)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 粗亮弧段（左下） */}
          <path
            d={`M ${CX1 - R * 0.82} ${CY + R * 0.58}
                A ${R} ${R} 0 0 1
                  ${CX1 + R * 0.02} ${CY + R}`}
            fill="none"
            stroke="url(#arc-purple)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* 右圆：逆时针 · 蓝色 */}
        <g
          style={{
            transformOrigin: `${CX2}px ${CY}px`,
            animation: "vennSpinCCW 50s linear infinite",
          }}
          filter="url(#glow-blue)"
        >
          <circle
            cx={CX2}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(121,200,255,0.25)"
            strokeWidth="2"
          />
          <circle
            cx={CX2}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(121,200,255,0.85)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 粗亮弧段（右上） */}
          <path
            d={`M ${CX2 + R * 0.82} ${CY - R * 0.58}
                A ${R} ${R} 0 0 1
                  ${CX2 - R * 0.02} ${CY - R}`}
            fill="none"
            stroke="url(#arc-blue)"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(180 ${CX2} ${CY})`}
          />
        </g>

        {/* 中心交集处一个很小的装饰点 */}
        <circle
          cx={(CX1 + CX2) / 2}
          cy={CY}
          r={2.5}
          fill="rgba(255,255,255,0.75)"
        />
      </svg>
    </div>
  );
};

export default VennRotating;
