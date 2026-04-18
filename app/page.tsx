"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import { InteractiveStarfield } from "@/components/ui/InteractiveStarfield";
// import Footer from "@/components/Footer";
// import Clients from "@/components/Clients";
// import Approach from "@/components/Approach";
// import Experience from "@/components/Experience";
// import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import RecentProjects from "@/components/RecentProjects";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
      {/* 整站鼠标交互星空背景（持续显示） */}
      <InteractiveStarfield
        className="fixed inset-0 z-0"
        fadeOnScroll={false}
      />
      <div className="max-w-7xl w-full relative z-10">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        {/* <Clients /> */}
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
