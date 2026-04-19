"use client";

/**
 * 项目卡片封面：Linear Method 风双圆 Venn 图（浅色高级版）
 * - 背景：暖米白 / 骨色（Linear 浅色模式质感）
 * - 圆环：深色虚线，两圆反向旋转
 * - 交集斜线：深色细线静止
 * - 高亮弧段：纯黑描边，旋转感明显
 */
export const VennRotating = () => {
  const R = 210;
  const CX1 = 290;
  const CX2 = 450;
  const CY = 280;
  const W = 740;
  const H = 560;

  // 圆上精确点：给定角度(度)取 (cx + R·cos, cy + R·sin)
  // SVG 中 y 向下，所以 angle=90° 对应"下方"，angle=270° 对应"上方"
  const pt = (cx: number, cy: number, deg: number) => {
    const r = (deg * Math.PI) / 180;
    return `${cx + R * Math.cos(r)} ${cy + R * Math.sin(r)}`;
  };

  // 左圆：左下弧段，从 155° 扫到 95°（走下边缘左下）
  const leftArcStart = pt(CX1, CY, 155);
  const leftArcEnd = pt(CX1, CY, 95);
  // 右圆：右上弧段，从 -25° 扫到 -85°（走上边缘右上）
  const rightArcStart = pt(CX2, CY, -25);
  const rightArcEnd = pt(CX2, CY, -85);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        // 温润骨色底 + 微妙的径向高光，像高级印刷纸
        background:
          "radial-gradient(80% 70% at 50% 40%, #F5EFE4 0%, #ECE4D5 70%, #DFD5C2 100%)",
      }}
    >
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

      {/* 细微噪点层，让米白更"纸感" */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full relative"
        aria-hidden="true"
      >
        <defs>
          {/* 交集斜线：深色 */}
          <pattern
            id="venn-stripes-dark"
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
              stroke="rgba(20,18,14,0.55)"
              strokeWidth="1"
            />
          </pattern>
          <clipPath id="venn-left-clip">
            <circle cx={CX1} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* 交集斜线区（静止） */}
        <g clipPath="url(#venn-left-clip)">
          <circle cx={CX2} cy={CY} r={R} fill="url(#venn-stripes-dark)" />
        </g>

        {/* 左圆：顺时针 */}
        <g
          style={{
            transformOrigin: `${CX1}px ${CY}px`,
            animation: "vennSpinCW 40s linear infinite",
          }}
        >
          {/* 虚线主环 */}
          <circle
            cx={CX1}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(20,18,14,0.85)"
            strokeWidth="1.6"
            strokeDasharray="3 7"
          />
          {/* 左下粗亮弧段 — 纯黑，精确贴在圆周 */}
          <path
            d={`M ${leftArcStart} A ${R} ${R} 0 0 0 ${leftArcEnd}`}
            fill="none"
            stroke="#141210"
            strokeWidth="3"
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
            stroke="rgba(20,18,14,0.85)"
            strokeWidth="1.6"
            strokeDasharray="3 7"
          />
          {/* 右上粗亮弧段 — 纯黑，精确贴在圆周 */}
          <path
            d={`M ${rightArcStart} A ${R} ${R} 0 0 0 ${rightArcEnd}`}
            fill="none"
            stroke="#141210"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* 中心交集锚点 */}
        <circle
          cx={(CX1 + CX2) / 2}
          cy={CY}
          r={2.5}
          fill="rgba(20,18,14,0.9)"
        />
      </svg>
    </div>
  );
};

export default VennRotating;
