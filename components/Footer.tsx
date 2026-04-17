"use client";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const WECHAT_ID = "susu554185";

const Footer = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleContact = () => {
    setRevealed(true);
    navigator.clipboard
      .writeText(WECHAT_ID)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          如果你觉得我还不错，<span className="text-purple">聊聊</span>？
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          期待与你交流，无论是技术探讨还是项目合作
        </p>
        <MagicButton
          title="联系我"
          icon={<FaLocationArrow />}
          position="right"
          handleClick={handleContact}
        />
        {revealed && (
          <div className="mt-5 flex flex-col items-center gap-1">
            <p className="text-white text-base">
              微信：<span className="text-purple font-semibold tracking-wide">{WECHAT_ID}</span>
            </p>
            <p className="text-white-200 text-xs">
              {copied ? "✓ 已复制到剪贴板" : "点击按钮可再次复制"}
            </p>
          </div>
        )}
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light lg:mb-[-2rem] sm:mb-2">
          © 2026 苏航 · Su Hang
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 mt-4 lg:mb-8"
            >
              <a href={info.link}>
                <img src={info.img} alt="icons" width={20} height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
