"use client";

const SERIF_STACK =
  '"Noto Serif SC","Source Han Serif SC","Source Han Serif CN","Songti SC","SimSun","STSong",serif';

/**
 * 项目卡片封面：用药守护 · DRUG GUARD
 * - 深森林绿渐变底（#1F4842 → #16332D）
 * - 顶部：药盾 SVG icon + 「用药守护」 + 副标 DRUG GUARD · 家人用药安全
 * - 中部：双行超粗衬线大字
 *   - 智能识别 → 米白
 *   - 药物冲突 → 珊瑚橙
 * - 底部：两行小字描述
 */
export const DrugGuardCover = () => {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #214E45 0%, #1B4039 55%, #142E29 100%)",
        color: "#F2EAD9",
        padding: "6%",
        fontFamily:
          '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
      }}
    >
      {/* 顶部：图标 + 标题 + 副标 */}
      <div className="flex items-center gap-3">
        <DrugShieldIcon />
        <div className="flex flex-col leading-tight">
          <div
            className="text-[clamp(15px,2vw,22px)]"
            style={{ fontWeight: 800, color: "#F2EAD9" }}
          >
            用药守护
          </div>
          <div
            className="mt-1 text-[clamp(9px,1.1vw,12px)] tracking-[0.12em]"
            style={{ color: "rgba(242,234,217,0.6)" }}
          >
            DRUG GUARD · 家人用药安全
          </div>
        </div>
      </div>

      {/* 中部：超粗衬线双行大字 */}
      <div
        className="mt-[6%] leading-[0.95]"
        style={{
          fontFamily: SERIF_STACK,
          fontWeight: 900,
          letterSpacing: "-0.01em",
        }}
      >
        <div
          className="text-[clamp(28px,5.6vw,64px)]"
          style={{ color: "#F4ECDA" }}
        >
          智能识别
        </div>
        <div
          className="text-[clamp(28px,5.6vw,64px)] mt-[0.04em]"
          style={{ color: "#F0B392" }}
        >
          药物冲突
        </div>
      </div>

    </div>
  );
};

/** 顶部小图标：圆角浅蓝底 + 盾牌轮廓 + 胶囊 + 加号 */
const DrugShieldIcon = () => {
  return (
    <svg
      viewBox="0 0 64 64"
      width="clamp(34px,4vw,46px)"
      height="clamp(34px,4vw,46px)"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* 圆角底 */}
      <rect width="64" height="64" rx="14" fill="#D6E9EE" />
      {/* 盾牌轮廓 */}
      <path
        d="M32 9 L52 16 V32 C52 44 42 53 32 56 C22 53 12 44 12 32 V16 Z"
        fill="none"
        stroke="#3F7E92"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* 胶囊（蓝/绿） */}
      <g transform="translate(32 32) rotate(-35)">
        <rect
          x="-13"
          y="-6"
          width="26"
          height="12"
          rx="6"
          fill="#7FBFD0"
          stroke="#214E45"
          strokeWidth="1.8"
        />
        <rect
          x="0"
          y="-6"
          width="13"
          height="12"
          rx="0"
          fill="#7FCDA8"
        />
        <rect
          x="0"
          y="-6"
          width="13"
          height="12"
          rx="0"
          fill="none"
          stroke="#214E45"
          strokeWidth="1.8"
        />
      </g>
      {/* 加号气泡（右下角） */}
      <g transform="translate(46 46)">
        <circle r="8" fill="#7FCDA8" stroke="#214E45" strokeWidth="1.6" />
        <path
          d="M -3.6 0 H 3.6 M 0 -3.6 V 3.6"
          stroke="#214E45"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default DrugGuardCover;
