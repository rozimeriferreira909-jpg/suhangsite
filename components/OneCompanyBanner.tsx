"use client";

import { VennRotating } from "./ui/VennRotating";

/**
 * 苏苏一人公司系统 横幅
 * - 长方形（16:6）整块旋转 Venn 视觉
 * - 无任何文字
 * - 点击跳转 suhangcompany.site
 */
const OneCompanyBanner = () => {
  return (
    <section className="py-20 w-full">
      <a
        href="https://www.suhangcompany.site"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-2xl overflow-hidden border border-white/10
                   transition-all duration-500
                   hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]"
        style={{ aspectRatio: "16 / 6" }}
      >
        <VennRotating />
      </a>
    </section>
  );
};

export default OneCompanyBanner;
