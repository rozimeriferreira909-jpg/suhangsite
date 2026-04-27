"use client";

import { VennRotating } from "./ui/VennRotating";

/**
 * 苏苏一人公司架构 横幅
 * - 长方形（16:5）旋转 Venn 视觉
 * - 下方一行小字："一人公司架构"
 * - 整块点击跳转 suhangcompany.site
 *
 * 注意：本组件本身不带外层 section / py 间距，
 * 由父组件（Experience）控制纵向位置。
 */
const OneCompanyBanner = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <a
        href="https://www.suhangcompany.site"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-2xl overflow-hidden border border-white/10
                   transition-all duration-500
                   hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]"
        style={{ aspectRatio: "16 / 5" }}
      >
        <VennRotating />
      </a>
      <p className="mt-4 text-center text-white-100 text-xs md:text-sm tracking-[0.28em] uppercase opacity-70">
        一人公司架构
      </p>
    </div>
  );
};

export default OneCompanyBanner;
