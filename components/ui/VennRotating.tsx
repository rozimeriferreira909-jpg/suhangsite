"use client";

/**
 * 旋转 Venn 双圆视觉（浅色高级版）
 * - 暖骨色径向底
 * - 两圆反向旋转（左顺 40s / 右逆 50s）
 * - 高亮弧段用三角函数精确锚到圆周
 */
export const VennRotating = () => {
  const R = 210;
  const CX1 = 290;
  const CX2 = 450;
  const CY = 280;
  const W = 740;
  const H = 560;

  const pt = (cx: number, cy: number, deg: number) => {
    const r = (deg * Math.PI) / 180;
    return `${cx + R * Math.cos(r)} ${cy + R * Math.sin(r)}`;
  };

  const leftArcStart = pt(CX1, CY, 155);
  const leftArcEnd = pt(CX1, CY, 95);
  const rightArcStart = pt(CX2, CY, -25);
  const rightArcEnd = pt(CX2, CY, -85);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 70% at 50% 40%, #F5EFE4 0%, #ECE4D5 70%, #DFD5C2 100%)",
      }}
    >
      <style>{`
        @keyframes vennSpinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes vennSpinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>

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

        <g clipPath="url(#venn-left-clip)">
          <circle cx={CX2} cy={CY} r={R} fill="url(#venn-stripes-dark)" />
        </g>

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
            stroke="rgba(20,18,14,0.85)"
            strokeWidth="1.6"
            strokeDasharray="3 7"
          />
          <path
            d={`M ${leftArcStart} A ${R} ${R} 0 0 0 ${leftArcEnd}`}
            fill="none"
            stroke="#141210"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

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
          <path
            d={`M ${rightArcStart} A ${R} ${R} 0 0 0 ${rightArcEnd}`}
            fill="none"
            stroke="#141210"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

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
