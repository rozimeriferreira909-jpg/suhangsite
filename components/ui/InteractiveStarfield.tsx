"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  size: number;
  baseAlpha: number;
};

type Props = {
  className?: string;
  /** 桌面粒子数 */
  desktopCount?: number;
  /** 移动端粒子数 */
  mobileCount?: number;
  /** 鼠标吸引半径（CSS px） */
  attractRadius?: number;
  /** 吸引强度（0-150） */
  attractForce?: number;
  /** 基础漂移速度（0-100） */
  drift?: number;
  /** 滚动渐隐：Hero 可视高度的像素；滚出后完全透明 */
  fadeOnScroll?: boolean;
};

export const InteractiveStarfield = ({
  className = "",
  desktopCount = 1000,
  mobileCount = 500,
  attractRadius = 250,
  attractForce = 60,
  drift = 30,
  fadeOnScroll = true,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // reduced-motion: 直接渲染一张静态星图就好
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isMobile ? mobileCount : desktopCount;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let rafId = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    const makeParticle = (): Particle => {
      const depth = Math.random();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        depth,
        size: (0.3 + depth * 1.2) * DPR,
        baseAlpha: 0.25 + depth * 0.65,
      };
    };

    const build = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) particles.push(makeParticle());
    };

    resize();
    build();

    // 鼠标追踪（touch 不开吸引，避免滚动误触）
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let mouseActive = false;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      mouseActive = true;
    };
    const onMouseLeave = () => {
      mouseActive = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      resize();
      build();
    };
    window.addEventListener("resize", onResize);

    // 滚动渐隐
    const onScroll = () => {
      if (!fadeOnScroll) return;
      const heroH = window.innerHeight;
      const opacity = Math.max(0, 1 - window.scrollY / (heroH * 0.8));
      canvas.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      // 拖尾背景
      ctx.fillStyle = "rgba(4, 7, 29, 0.18)";
      ctx.fillRect(0, 0, W, H);

      const MX = mx * DPR;
      const MY = my * DPR;
      const R = attractRadius * DPR;
      const R2 = R * R;
      const driftBase = drift / 100;
      const forceScale = attractForce / 1000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 基础漂移
        p.vx += driftBase * p.depth * 0.5;
        p.vy += Math.sin(p.x * 0.003 + i) * 0.01;

        // 鼠标吸引
        let nearMouse = false;
        if (mouseActive && !prefersReduced) {
          const dx = MX - p.x;
          const dy = MY - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < R2 && dist2 > 1) {
            nearMouse = true;
            const dist = Math.sqrt(dist2);
            const falloff = 1 - dist / R;
            const strength = forceScale * falloff * 1.5;
            p.vx += (dx / dist) * strength;
            p.vy += (dy / dist) * strength;
          }
        }

        // 阻尼
        p.vx *= 0.93;
        p.vy *= 0.93;

        p.x += p.vx;
        p.y += p.vy;

        // 环绕
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // 绘制
        let alpha = p.baseAlpha;
        let sz = p.size;
        if (nearMouse) {
          const dx = MX - p.x;
          const dy = MY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const boost = 1 - dist / R;
          alpha = Math.min(1, p.baseAlpha + boost * 0.4);
          sz = p.size * 1.5;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;

      if (!prefersReduced) rafId = requestAnimationFrame(tick);
    };

    if (prefersReduced) {
      // 只画一帧静态星图
      ctx.fillStyle = "#04071d";
      ctx.fillRect(0, 0, W, H);
      for (const p of particles) {
        ctx.globalAlpha = p.baseAlpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [
    desktopCount,
    mobileCount,
    attractRadius,
    attractForce,
    drift,
    fadeOnScroll,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default InteractiveStarfield;
