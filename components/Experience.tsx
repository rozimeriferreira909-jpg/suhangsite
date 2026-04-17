import React from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const ExperienceCard = ({ card }: { card: (typeof workExperience)[0] }) => (
  <Button
    duration={Math.floor(Math.random() * 10000) + 10000}
    borderRadius="1.75rem"
    style={{
      background: "rgb(4,7,29)",
      backgroundColor:
        "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      borderRadius: `calc(1.75rem* 0.96)`,
    }}
    className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
  >
    <div className="flex flex-col p-5 lg:p-8 gap-3">
      <div className="flex items-center gap-4">
        <img
          src={card.thumbnail}
          alt={card.title}
          className="w-16 md:w-20 shrink-0"
        />
        <h1 className="text-start text-lg md:text-xl font-bold">
          {card.title}
        </h1>
      </div>
      <p className="text-start text-white-100 mt-1 text-sm font-semibold leading-relaxed">
        {card.desc}
      </p>
    </div>
  </Button>
);

const Experience = () => {
  return (
    <div className="py-20 w-full" id="experience">
      <h1 className="heading">
        AI Agent<span className="text-purple"> 协作体系</span>
      </h1>
      <p className="text-center text-white-100 mt-4 mb-2 text-sm md:text-base max-w-2xl mx-auto opacity-80">
        16 个专业 Agent 覆盖产品全生命周期，从需求到上线的完整自动化流水线
      </p>

      <div className="w-full mt-12 flex flex-col gap-8 items-center max-w-4xl mx-auto">
        {workExperience.map((card) => (
          <div key={card.id} className="w-full">
            <ExperienceCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
