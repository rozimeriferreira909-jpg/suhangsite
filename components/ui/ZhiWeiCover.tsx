"use client";

/**
 * 项目卡片封面：知味（foodcap.site）
 * - 米白底 + 极淡网格底纹
 * - 左上「知 / 味」大字竖排，"味"上加小红圆点（类似日式书法标点）
 * - 右上拼音 Zhī · Wèi + TASTE, KNOWN
 * - 中部 curated with care（红字）+ 两侧细线
 * - 底部斜体英文标语
 */
export const ZhiWeiCover = () => {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #FBF5E9 0%, #F6EFDC 60%, #EFE6CD 100%)",
        fontFamily:
          '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
        color: "#1A1814",
      }}
    >
      {/* 极淡网格底纹（右上角更明显，类似截图） */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,90,55,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,90,55,0.55) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(75% 65% at 80% 15%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(75% 65% at 80% 15%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, transparent 90%)",
        }}
      />

      {/* 主内容容器 */}
      <div className="relative h-full w-full px-[6%] py-[6%] flex flex-col">
        {/* 顶部：知味大字 + 拼音 */}
        <div className="flex items-start gap-4">
          {/* 竖排"知/味" */}
          <div className="relative leading-[0.95]">
            <div
              className="text-[clamp(36px,7vw,68px)]"
              style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              知
            </div>
            {/* 红点 */}
            <span
              className="absolute"
              style={{
                top: "calc(clamp(36px,7vw,68px) * 0.92)",
                left: "44%",
                width: "0.42em",
                height: "0.42em",
                fontSize: "clamp(36px,7vw,68px)",
                background: "#C8332B",
                borderRadius: "9999px",
                transform: "translate(-50%, 0)",
              }}
            />
            <div
              className="text-[clamp(36px,7vw,68px)] mt-[0.22em]"
              style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              味
            </div>
          </div>

          {/* 竖分隔线 */}
          <div
            className="self-stretch mt-1"
            style={{
              width: "1px",
              background: "rgba(26,24,20,0.35)",
              minHeight: "clamp(36px,5vw,56px)",
            }}
          />

          {/* 拼音 + 英译 */}
          <div className="flex flex-col mt-1">
            <div
              className="text-[clamp(11px,1.4vw,16px)]"
              style={{ fontWeight: 700, letterSpacing: "0.02em" }}
            >
              Zhī · Wèi
            </div>
            <div
              className="mt-1 text-[clamp(9px,1.1vw,12px)] tracking-[0.18em]"
              style={{ color: "rgba(26,24,20,0.55)" }}
            >
              TASTE, KNOWN
            </div>
          </div>
        </div>

        {/* 中部 curated with care + 两侧线条 */}
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <div
              className="flex-1"
              style={{ height: "1px", background: "rgba(26,24,20,0.35)" }}
            />
            <div
              className="text-[clamp(11px,1.4vw,15px)] whitespace-nowrap"
              style={{ color: "#C8332B", fontWeight: 600 }}
            >
              curated with care
            </div>
            <div
              className="flex-1"
              style={{ height: "1px", background: "rgba(26,24,20,0.35)" }}
            />
          </div>

          {/* 底部标语 */}
          <p
            className="mt-3 text-[clamp(12px,1.6vw,18px)] italic leading-[1.45]"
            style={{ color: "rgba(26,24,20,0.62)" }}
          >
            Three picks.
            <br />
            Nothing extra, nothing hidden.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZhiWeiCover;
