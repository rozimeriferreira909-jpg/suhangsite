"use client";

import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { PixelatedCanvas } from "./ui/pixelated-canvas";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            全栈开发 · AI 应用 · 创意工程
          </p>

          <TextGenerateEffect
            words="用技术把想象力变成产品"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            你好！我是苏航，一名全栈工程师 & AI 应用开发者
          </p>

          <a href="#about">
            <MagicButton
              title="查看我的作品"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>

          {/* Pixelated Canvas 头像 */}
          <div className="mt-16">
            <PixelatedCanvas
              src="/avatar.jpg"
              width={340}
              height={420}
              cellSize={3}
              dotScale={0.88}
              shape="square"
              backgroundColor="#000319"
              dropoutStrength={0.3}
              interactive
              distortionStrength={4}
              distortionRadius={90}
              distortionMode="swirl"
              followSpeed={0.15}
              jitterStrength={3}
              jitterSpeed={3}
              sampleAverage
              tintColor="#CBACF9"
              tintStrength={0.1}
              className="rounded-2xl border border-white/[0.1] shadow-[0_0_40px_rgba(203,172,249,0.15)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
