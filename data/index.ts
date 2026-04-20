export const navItems = [
  { name: "关于", link: "#about" },
  { name: "项目", link: "#projects" },
  { name: "经历", link: "#experience" },
  { name: "联系", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "注重团队协作，擅长跨部门沟通与高效推进",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "全栈开发能力，前后端均可独立交付",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "技术栈",
    description: "持续精进中",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "热衷探索 AI 与工程化的结合，追求用技术创造价值",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "正在打造个人 AI 创意工具平台",
    description: "最新动态",
    className: "md:col-span-3 md:row-span-2",
    imgClassName:
      "absolute right-0 bottom-0 md:w-96 w-60 mix-blend-screen animate-[spin_40s_linear_infinite]",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/network-graph.png",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "想一起做点有意思的事吗？",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "郑在豫见 · AI 读书会运营平台",
    des: "为喜欢读书的人提供一个追逐热爱的社群。",
    img: "/bookclub-logo.png",
    iconLists: [
      "/openai.svg",
      "/tail.svg",
      "/git.svg",
      "/cloud.svg",
      "/ts.svg",
    ],
    link: "https://zhengzaiyujian.cn",
  },
  {
    id: 2,
    title: "苏苏一人公司系统",
    des: "苏苏一人公司系统，与君共享。",
    img: "/linear.png",
    customVisual: "venn",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/three.svg",
      "/fm.svg",
    ],
    link: "https://www.suhangcompany.site",
  },
  {
    id: 3,
    title: "让三个 AI 替你把想法辩清楚",
    des: "Claude Code、Gemini CLI、Codex 在你本机协同——互相拆台、互相补位、互相打分。全部数据留在你 Mac 上，不走云端。",
    img: "/wiki.jpg",
    customVisual: "three-ai",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/three.svg",
      "/fm.svg",
    ],
    link: "https://www.suhangaichat.site",
  },
  {
    id: 4,
    title: "全栈博客系统",
    des: "从零搭建的个人博客平台，支持 Markdown 写作、标签分类、全文搜索、暗黑模式，前端 Next.js + 后端 Node.js + 数据库 PostgreSQL。",
    img: "/driver.svg",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/three.svg",
      "/fm.svg",
    ],
    link: "https://github.com/suhang",
  },
];

export const testimonials = [
  {
    quote:
      "苏杭在项目中展现出极强的学习能力和执行力，独立完成了前端架构设计和核心组件开发，代码质量远超预期。他对技术细节的把控和对用户体验的关注让整个团队印象深刻。",
    name: "张明",
    title: "某互联网公司 技术总监",
  },
  {
    quote:
      "与苏杭合作开发 AI 工具平台的过程非常愉快。他不仅技术扎实，更难得的是能从产品角度思考问题，提出了很多有价值的优化建议，最终产品上线后用户反馈非常好。",
    name: "李文",
    title: "某科技公司 产品经理",
  },
  {
    quote:
      "苏杭在数据可视化项目中的表现让人眼前一亮。他对图表交互的设计非常有想法，做出的看板不仅数据展示清晰，视觉效果也非常专业，客户非常满意。",
    name: "王芳",
    title: "某数据公司 项目负责人",
  },
  {
    quote:
      "作为团队中最年轻的成员，苏杭的成长速度令人惊叹。他主动承担了系统性能优化的任务，通过技术方案将页面加载速度提升了 60%，展现出优秀的工程素养。",
    name: "陈磊",
    title: "某创业公司 CTO",
  },
  {
    quote:
      "苏杭对新技术的敏锐度很高，他率先在团队中引入了 AI 辅助开发流程，显著提升了整体开发效率。他的技术热情和分享精神也带动了团队的技术氛围。",
    name: "赵然",
    title: "某 AI 公司 技术负责人",
  },
];

export const companies = [
  {
    id: 1,
    name: "Next.js",
    img: "/next.svg",
    nameImg: "",
  },
  {
    id: 2,
    name: "TypeScript",
    img: "/ts.svg",
    nameImg: "",
  },
  {
    id: 3,
    name: "Tailwind",
    img: "/tail.svg",
    nameImg: "",
  },
  {
    id: 4,
    name: "Three.js",
    img: "/three.svg",
    nameImg: "",
  },
  {
    id: 5,
    name: "Docker",
    img: "/dock.svg",
    nameImg: "",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "第一阶段 · 需求与规划",
    desc: "Product Manager Agent 负责需求调研、竞品分析与 PRD 输出；UX Researcher Agent 设计用户访谈与问卷，输出洞察报告；Project Planner Agent 拆解里程碑、排版本、管理依赖与风险。",
    className: "md:col-span-2",
    thumbnail: "/agent1.svg",
  },
  {
    id: 2,
    title: "第二阶段 · 设计",
    desc: "UI/UX Designer Agent 产出信息架构、交互流程图、线框图与高保真设计稿；Brand & Visual Agent 生成 Logo、配色方案、字体体系与 Design Token，供开发直接使用。",
    className: "md:col-span-2",
    thumbnail: "/agent2.svg",
  },
  {
    id: 3,
    title: "第三阶段 · 架构与开发",
    desc: "Architect Agent 技术选型与系统架构设计；Frontend Agent 页面开发与多端适配；Backend Agent 实现 API、业务逻辑与认证鉴权；DevOps Agent 搭建 CI/CD、容器化部署与监控告警。",
    className: "md:col-span-2",
    thumbnail: "/agent3.svg",
  },
  {
    id: 4,
    title: "第四阶段 · 质量保障",
    desc: "QA/Testing Agent 自动生成测试用例并执行回归与性能压测；Security Agent 代码安全扫描与渗透测试；Code Review Agent 负责 PR 审查、代码质量把关与性能瓶颈识别。",
    className: "md:col-span-2",
    thumbnail: "/agent4.svg",
  },
  {
    id: 5,
    title: "第五阶段 · 上线与运营",
    desc: "Release Agent 管理版本打包与灰度发布；Analytics Agent 设计埋点方案与 A/B 实验；Content Agent 产出商店文案与推送文案；Support Agent 自动回复常见问题并收集用户反馈。",
    className: "md:col-span-2",
    thumbnail: "/agent5.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/suhang",
  },
  {
    id: 2,
    img: "/medium.svg",
    link: "#",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "#",
  },
];
