# 苏航 · 个人作品集

> Next.js 14 构建的面试展示型个人站,核心呈现:Pixelated Canvas 头像 + Bento Grid 技能展示 + 项目作品 + 5 阶段 16 Agent 协作体系。

---

## 0. 项目一句话介绍

Next.js 14 (App Router) 个人作品集。首页 Pixelated Canvas 渲染真实头像,中部 Bento Grid 展示技能,项目区 3D Pin 卡片,底部 5 阶段 16 Agent 协作体系竖排展示。**不含任何需要后端推理的交互**,纯前端静态站。

---

## 1. 核心功能模块

### A. 首页 Hero
- `<TextGenerateEffect>` 逐字打出主标题
- 三束 Spotlight + 网格背景
- **Pixelated Canvas 头像**:真实头像图转像素点阵,鼠标 swirl 扭曲交互

### B. Bento Grid 关于我
- 3D GitHub Globe(`three-globe`)
- 技术栈标签(React / Next.js / TypeScript / Node.js / Python / AI·ML)
- 渐变动画 + 邮箱复制 Lottie

### C. 精选项目作品
- 4 张 3D Pin 倾斜卡片
- 点击「查看详情」跳转对应外链(GitHub / 项目页)
- **项目 1**:AI 智能电商商品场景建模系统 — 展示 Stable Diffusion + ComfyUI 工作流方案(SDXL Inpaint + ControlNet + IP-Adapter)

### D. AI Agent 协作体系(5 阶段 × 16 Agent)
- 5 张竖排卡片,每张带流光边框动画
- 5 个自绘黑客风 SVG 图标(雷达 / 线框 / 代码 IDE / 盾牌 / 数据看板)
- 覆盖:需求规划 → 设计 → 架构开发 → 质量保障 → 上线运营

---

## 2. 技术栈

- **Next.js 14.1.4** (App Router)
- **React 18** + **TypeScript 5**
- **Tailwind CSS 3.3** + **Aceternity UI** (Spotlight / Pin / BentoGrid / FloatingNav / PixelatedCanvas)
- **Framer Motion 11** (页面过渡、hover 动画)
- **Three.js + react-three-fiber + drei** (3D 地球)
- **react-lottie** (邮箱复制 confetti,动态 import SSR 关闭)

**无后端**,部署时走 Next.js SSG/ISR 即可。

---

## 3. 关键文件清单

| 文件 | 作用 |
|------|------|
| `app/page.tsx` | 首页组装(Hero / Grid / Projects / Experience / Approach / Footer) |
| `app/layout.tsx` | 元数据:「苏航 · 个人作品集」 |
| `components/Hero.tsx` | Hero 区 + Pixelated Canvas 头像 |
| `components/RecentProjects.tsx` | 项目卡片(纯展示,外链跳转) |
| `components/Experience.tsx` | 5 阶段竖排 Agent 卡片 |
| `components/ui/pixelated-canvas.tsx` | Aceternity 像素画布组件 |
| `data/index.ts` | 所有文案、项目列表、Agent 分阶段说明 |
| `public/avatar.jpg` | 苏航本人头像(Pixelated 原图) |
| `public/agent1~5.svg` | 5 个自绘黑客风图标 |

---

## 4. 历史 Bug & 修复记录

### Bug #1 — react-lottie SSR 报错
**现象**:首屏白屏,`document is not defined`
**修复**:`BentoGrid.tsx` 里 `Lottie` 改成 `next/dynamic` + `{ ssr: false }` + 条件渲染(仅在 `copied` 时挂载)

### (已废弃) AI 实验室相关 Bug
项目早期集成过 RunningHub API 代理 + 弹窗实验室(`AIWorkbench.tsx` + `app/api/generate/route.ts`),因为真实推理需要对象存储 + 异步轮询 + 工作流节点 ID 对齐成本高,且演示模式有误导风险,**已整体下架**。保留文档以防后续重新接入。

---

## 5. 本地开发

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start      # 预览生产构建
```

---

## 6. 部署到 Vercel

```bash
npx vercel login
npx vercel --prod
```

纯前端站,无需配置环境变量(Sentry token 已在 `env.local`,仅构建期使用)。

---

## 7. 面试演示话术

### 开场
> "这是我主导设计的个人作品集站。技术栈 Next.js 14 + TypeScript + Tailwind + Framer Motion + Three.js。亮点有三:第一,首页用 Pixelated Canvas 做交互式头像;第二,项目区展示了我在 Stable Diffusion + ComfyUI 方向的工作流设计能力;第三,底部是我构建的 5 阶段 16 Agent 协作体系,覆盖从需求到上线的全生命周期。"

### 核心演示节奏
1. **首页**:Pixelated Canvas 头像 → 鼠标 hover swirl 扭曲,解释像素化算法
2. **About**:3D Globe + 技术栈标签 + 邮箱 Lottie 交互
3. **项目卡片**:3D Pin 倾斜效果,点击跳转 GitHub / 外链
4. **Agent 协作体系**:5 阶段竖排卡片,流光边框,讲清每阶段 Agent 职责与协作关系

### 可被追问 & 应答准备
- **为什么选 Next.js App Router 而非 Pages Router?**
  → App Router 原生支持 Server Components、嵌套 Layout、Streaming,适合现代交互型作品集
- **Pixelated Canvas 怎么做的?**
  → Aceternity UI 提供组件,基于 Canvas API 采样像素 + 鼠标距离场驱动 swirl 形变
- **5 阶段 16 Agent 是真用了还是设计稿?**
  → 设计方法论,展示我对 AI Agent 工程化的系统性思考

---

## 8. 后续路线图

- [ ] SEO 优化(OpenGraph 封面、sitemap)
- [ ] 深色/浅色主题切换
- [ ] 移动端细节优化
- [ ] (可选)重新接入真实 AI 推理能力 — 需配合对象存储 + 任务轮询

---

*Created by 苏航 | Powered by Next.js 14 + Vercel*
