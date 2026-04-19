"use client";

/**
 * 项目卡片封面：Linear Method 风双圆 Venn 图
 * - 两个虚线圆分别反向旋转
 * - 交集区域填充细密斜线（静止锚点）
 * - 每个圆带一段"高亮弧段"，让旋转视觉明显
 */
export const VennRotating = () => {
  const R = 230;
  const CX1 = 290;
  const CX2 = 450;
  const CY = 280;
  const W = 740;
  const H = 560;

  return (
    <div className="relative w-full h-full bg-[#0a0a12] flex items-center justify-center overflow-hidden">
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

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="venn-stripes"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
          </pattern>
          <clipPath id="venn-left-clip">
            <circle cx={CX1} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* 交集斜线（静止） */}
        <g clipPath="url(#venn-left-clip)">
          <circle cx={CX2} cy={CY} r={R} fill="url(#venn-stripes)" />
        </g>

        {/* 左圆：顺时针 */}
        <g
          style={{
            transformOrigin: `${CX1}px ${CY}px`,
            animation: "vennSpinCW 40s linear infinite",
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

        {/* 右圆：逆时针 */}
        <g
          style={{
            transformOrigin: `${CX2}px ${CY}px`,
            animation: "vennSpinCCW 50s linear infinite",
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
    </div>
  );
};

export default VennRotating;
