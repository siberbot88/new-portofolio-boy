export type MethodologyStep = {
  title: string;
  description: string;
  artifact: string;
  signal: string;
};

export type SolutionArtifact = {
  title: string;
  description: string;
  image: string;
  alt: string;
  url?: string;
  actionLabel?: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  year: string;
  title: string;
  client: string;
  category: string;
  discipline: string;
  role: string;
  duration: string;
  techStack: string[];
  thumbnail: string;
  heroImage: string;
  repoUrl: string;
  liveUrl?: string;
  summary: string;
  challenge: string;
  methodology: MethodologyStep[];
  solution: SolutionArtifact[];
  impactMetrics: ImpactMetric[];
  nextProjectSlug: string;
};

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "davis-presentation",
    number: "01",
    year: "2026",
    title: "Davis Presentation",
    client: "Superstore / Furniture Q4 Analysis",
    category: "Dashboard / Analytics",
    discipline: "Data Storytelling",
    role: "Business Analysis / Data Visualization",
    duration: "Presentation sprint",
    techStack: ["JavaScript", "D3.js", "Express", "MySQL"],
    thumbnail: "/projects/davis-presentation.png",
    heroImage: "/projects/davis-presentation.png",
    repoUrl: "https://github.com/siberbot88/Davis-presentation",
    summary:
      "A data-story presentation for Superstore Furniture Q4 profitability, built around revenue, profit, margin, discount, customer, and region signals.",
    challenge:
      "The presentation needed to move beyond descriptive charts and create an executive story that explains why Furniture revenue momentum still needs margin control.",
    methodology: [
      {
        title: "Story Arc Planning",
        description:
          "Structured the presentation as hook, context, momentum, root cause, customer evidence, and action priority.",
        artifact: "7 narrative tabs",
        signal: "86%"
      },
      {
        title: "Metric Framing",
        description:
          "Compared Q4 Furniture revenue with profit margin, discount pressure, sub-category leakage, and customer-level loss orders.",
        artifact: "Q4 scope",
        signal: "82%"
      },
      {
        title: "Executive Review",
        description:
          "Audited chart titles, hierarchy, and action notes so each slide can support a short management presentation.",
        artifact: "Audit notes",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Narrative Dashboard Deck",
        description:
          "A tabbed presentation format where every view carries one clear business claim and supporting chart evidence.",
        image: "/projects/davis-presentation.png",
        alt: "Davis Presentation preview with Q4 furniture profitability cards and charts"
      },
      {
        title: "Profitability Action Board",
        description:
          "Final recommendations turn data signals into margin-control priorities for discount, region, and customer review.",
        image: "/projects/davis-presentation.png",
        alt: "Davis Presentation action priority board"
      }
    ],
    impactMetrics: [
      {
        value: "07",
        label: "Story Sections",
        description:
          "The dashboard is arranged as a seven-part presentation instead of a flat chart gallery."
      },
      {
        value: "Q4",
        label: "Focused Scope",
        description:
          "The analysis narrows the business question to Q4 Furniture performance and margin quality."
      },
      {
        value: "04",
        label: "Action Themes",
        description:
          "The final view prioritizes discount, customer, benchmark, and Q1 margin actions."
      }
    ],
    nextProjectSlug: "dashboard-analitik-superstore"
  },
  {
    id: "project-02",
    slug: "dashboard-analitik-superstore",
    number: "02",
    year: "2026",
    title: "Dashboard Analitik Superstore",
    client: "Retail Analytics / Superstore Dataset",
    category: "Dashboard / Analytics",
    discipline: "Interactive Visualization",
    role: "Data Analysis / Frontend Development",
    duration: "Dashboard sprint",
    techStack: ["HTML", "CSS", "JavaScript", "D3.js"],
    thumbnail: "/projects/dashboard-analitik-superstore.png",
    heroImage: "/projects/dashboard-analitik-superstore.png",
    repoUrl: "https://github.com/siberbot88/Dashboard-Analitik-Superstore",
    liveUrl: "https://dashboard-analitik-superstore.vercel.app",
    summary:
      "An interactive D3.js dashboard for Superstore sales, product contribution, regional performance, and demand exploration.",
    challenge:
      "The dataset contains many overlapping sales dimensions, so the dashboard needed distinct analytical pages that do not repeat the same insight.",
    methodology: [
      {
        title: "Question Mapping",
        description:
          "Separated the dashboard into location, product, and demand questions so every chart has a different analytical job.",
        artifact: "3 views",
        signal: "88%"
      },
      {
        title: "Hierarchy Design",
        description:
          "Used radial tree and zoomable sunburst patterns to expose market, region, country, category, sub-category, and product relationships.",
        artifact: "D3 hierarchy",
        signal: "84%"
      },
      {
        title: "Filter Logic",
        description:
          "Built page-specific filters and summary states so exploration remains readable across different segments and time levels.",
        artifact: "Scoped filters",
        signal: "80%"
      }
    ],
    solution: [
      {
        title: "Visual Analytics Workspace",
        description:
          "A responsive dashboard with KPI summaries, tabbed analysis pages, and interactive D3 visualizations.",
        image: "/projects/dashboard-analitik-superstore.png",
        alt: "Dashboard Analitik Superstore interface preview"
      },
      {
        title: "Demand Exploration View",
        description:
          "Radial stacked bars and filters help users inspect when demand changes by category, market, segment, and time level.",
        image: "/projects/dashboard-analitik-superstore.png",
        alt: "Superstore demand analytics dashboard preview"
      }
    ],
    impactMetrics: [
      {
        value: "51K+",
        label: "Rows Loaded",
        description:
          "The public dashboard loads and visualizes the Superstore transaction dataset in-browser."
      },
      {
        value: "03",
        label: "Analysis Pages",
        description:
          "Location, product, and demand are separated into focused analytical workflows."
      },
      {
        value: "D3",
        label: "Visualization Core",
        description:
          "The project uses custom D3 charts instead of static report screenshots."
      }
    ],
    nextProjectSlug: "bullet-forge-commandos"
  },
  {
    id: "project-03",
    slug: "bullet-forge-commandos",
    number: "03",
    year: "2026",
    title: "Bullet Forge Commandos",
    client: "Game Prototype / AI Studio",
    category: "Game / Interactive",
    discipline: "Game UI / Frontend",
    role: "Digital Development",
    duration: "Prototype sprint",
    techStack: ["TypeScript", "React", "Vite", "Motion"],
    thumbnail: "/projects/bullet-forge-commandos.png",
    heroImage: "/projects/bullet-forge-commandos.png",
    repoUrl: "https://github.com/siberbot88/Bullet-Forge-Commandos",
    liveUrl: "https://ai.studio/apps/bb931300-9f12-47d3-94b4-b411632d5aab",
    summary:
      "A fast 2D run-and-gun game prototype with campaign mode, endless mode, rank progression, armory upgrades, and combat systems.",
    challenge:
      "The game needed a compact browser experience that combines readable controls, persistent progression, and quick access to campaign, endless, and armory modes.",
    methodology: [
      {
        title: "Mode Structure",
        description:
          "Defined campaign, endless, armory, controls, reset, and rank states so the player can move between loops quickly.",
        artifact: "Game menu",
        signal: "83%"
      },
      {
        title: "Combat Systems",
        description:
          "Organized weapons, melee weapons, armor, levels, ranks, and game engine types into reusable modules.",
        artifact: "Game engine",
        signal: "79%"
      },
      {
        title: "Progression UX",
        description:
          "Designed the main menu around rank, XP, upgrades, and mode selection to make progression visible from the first screen.",
        artifact: "Rank UI",
        signal: "76%"
      }
    ],
    solution: [
      {
        title: "Campaign Entry Screen",
        description:
          "A high-contrast game menu gives immediate access to campaign, endless mode, armory, controls, and progress reset.",
        image: "/projects/bullet-forge-commandos.png",
        alt: "Bullet Forge Commandos main menu preview"
      },
      {
        title: "Upgradeable Combat Loop",
        description:
          "The armory and rank system create a progression layer around the core action loop.",
        image: "/projects/bullet-forge-commandos.png",
        alt: "Bullet Forge Commandos progression interface"
      }
    ],
    impactMetrics: [
      {
        value: "06",
        label: "Campaign Levels",
        description:
          "The README describes six campaign levels plus endless survival mode."
      },
      {
        value: "XP",
        label: "Rank Progression",
        description:
          "The player profile uses rank and XP as the main persistence signal."
      },
      {
        value: "03",
        label: "Equipment Systems",
        description:
          "Weapons, melee weapons, and armor support the upgrade layer."
      }
    ],
    nextProjectSlug: "koperasi-sembako-platform"
  },
  {
    id: "project-04",
    slug: "koperasi-sembako-platform",
    number: "04",
    year: "2026",
    title: "Koperasi Sembako Platform",
    client: "Cooperative Commerce / Grocery Operations",
    category: "Web App / Platform",
    discipline: "Full-Stack Commerce",
    role: "Business Analysis / Digital Development",
    duration: "Product build",
    techStack: ["Laravel", "Livewire", "MongoDB", "Tailwind CSS", "ApexCharts"],
    thumbnail: "/projects/koperasi-sembako-platform.png",
    heroImage: "/projects/koperasi-sembako-platform.png",
    repoUrl: "https://github.com/siberbot88/koperasi-sembako-platform",
    liveUrl: "https://koperasi-sembako-c95c4670870e.herokuapp.com",
    summary:
      "A modern e-commerce platform for grocery cooperatives with storefront, seller dashboard, order flow, loyalty, reviews, promotions, and AI support.",
    challenge:
      "Traditional cooperative sales workflows needed a digital storefront that still supports admin operations, stock control, orders, promotions, and customer support.",
    methodology: [
      {
        title: "Role Mapping",
        description:
          "Separated customer storefront workflows from seller/admin workflows so commerce and operations can be managed in one system.",
        artifact: "2 role groups",
        signal: "87%"
      },
      {
        title: "Operational Modules",
        description:
          "Modeled product, cart, checkout, order history, rewards, wishlist, reviews, promotions, and seller analytics modules.",
        artifact: "11 modules",
        signal: "85%"
      },
      {
        title: "Production Planning",
        description:
          "Documented Heroku, MongoDB Atlas, SSL, seeding, and environment setup for production deployment.",
        artifact: "Deploy docs",
        signal: "80%"
      }
    ],
    solution: [
      {
        title: "Customer Storefront",
        description:
          "A digital grocery storefront with product catalog, cart, checkout, wishlist, order tracking, loyalty, and reviews.",
        image: "/projects/koperasi-sembako-platform.png",
        alt: "Koperasi Sembako storefront visual preview"
      },
      {
        title: "Seller Operations Dashboard",
        description:
          "Admin tools cover product CRUD, order management, promotions, review insight, and sales analytics.",
        image: "/projects/koperasi-sembako-platform.png",
        alt: "Koperasi Sembako seller dashboard preview"
      }
    ],
    impactMetrics: [
      {
        value: "45",
        label: "Seed Products",
        description:
          "The platform includes product seeding for a ready-to-test grocery catalog."
      },
      {
        value: "07",
        label: "Courier Options",
        description:
          "Checkout supports multiple Indonesian delivery services."
      },
      {
        value: "AI",
        label: "Support Widget",
        description:
          "The application includes an AI support widget for customer questions."
      }
    ],
    nextProjectSlug: "early-warning-system"
  },
  {
    id: "project-05",
    slug: "early-warning-system",
    number: "05",
    year: "2026",
    title: "Early Warning System",
    client: "Open University / Learning Analytics",
    category: "Data Science / ML",
    discipline: "Predictive Analytics",
    role: "Data Analysis / Machine Learning",
    duration: "Analytics build",
    techStack: ["Python", "Jupyter Notebook", "Streamlit", "Decision Tree"],
    thumbnail: "/projects/early-warning-system.png",
    heroImage: "/projects/early-warning-system.png",
    repoUrl: "https://github.com/siberbot88/Early-Warning-System",
    liveUrl: "https://early-warning-system-bigdata.streamlit.app/",
    summary:
      "A learning analytics dashboard for detecting students at risk of failure or withdrawal using OULAD behavioral and assessment data.",
    challenge:
      "Online learning teams need earlier risk signals from VLE activity and assessment behavior so tutor intervention can happen before failure or withdrawal.",
    methodology: [
      {
        title: "Data Lifecycle",
        description:
          "Processed OULAD raw data through cleaning, integration, feature engineering, modeling, and dashboard visualization.",
        artifact: "Data pipeline",
        signal: "90%"
      },
      {
        title: "Model Comparison",
        description:
          "Compared decision tree and logistic regression, then selected the more interpretable and slightly stronger model.",
        artifact: "2 models",
        signal: "93%"
      },
      {
        title: "Risk Dashboard",
        description:
          "Translated predictive outputs into KPI tracking and intervention-oriented dashboard views.",
        artifact: "Streamlit app",
        signal: "84%"
      }
    ],
    solution: [
      {
        title: "Risk Detection Dashboard",
        description:
          "A Streamlit dashboard surfaces withdrawal risk, fail risk, engagement, assessment completion, and detection signals.",
        image: "/projects/early-warning-system.png",
        alt: "Early Warning System learning analytics preview"
      },
      {
        title: "Intervention Evidence Model",
        description:
          "Decision tree outputs make the strongest drivers easier to explain to academic support teams.",
        image: "/projects/early-warning-system.png",
        alt: "Early Warning System model feature preview"
      }
    ],
    impactMetrics: [
      {
        value: "93.04%",
        label: "Accuracy",
        description:
          "The README reports decision tree accuracy for fail or withdrawal risk classification."
      },
      {
        value: "96.80%",
        label: "Precision",
        description:
          "The primary model prioritizes high-confidence risk identification."
      },
      {
        value: "89.77%",
        label: "Recall",
        description:
          "The model is designed to catch at-risk students early enough for support action."
      }
    ],
    nextProjectSlug: "ets-storytelling"
  },
  {
    id: "project-06",
    slug: "ets-storytelling",
    number: "06",
    year: "2026",
    title: "ETS Storytelling",
    client: "KopiNusa / Data Storytelling Practice",
    category: "Learning / Storytelling",
    discipline: "Educational Web Experience",
    role: "Frontend Development / Learning Design",
    duration: "Learning sprint",
    techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "Framer Motion"],
    thumbnail: "/projects/ets-storytelling.png",
    heroImage: "/projects/ets-storytelling.png",
    repoUrl: "https://github.com/siberbot88/ets-storytelling",
    liveUrl: "https://ets-storytelling.vercel.app/",
    summary:
      "An interactive Indonesian learning site for practicing executive data storytelling using the KopiNusa Analytics case study.",
    challenge:
      "Students needed a guided way to turn dashboard observations into concise, evidence-based opening narratives and strategic recommendations.",
    methodology: [
      {
        title: "Learning Flow",
        description:
          "Organized case context, data, visualization, essay prompt, answer examples, principles, checklist, and extra examples.",
        artifact: "8 sections",
        signal: "86%"
      },
      {
        title: "Answer Rubric",
        description:
          "Provided ideal, sufficient, and weak answer examples with scoring logic to make quality differences visible.",
        artifact: "3 examples",
        signal: "82%"
      },
      {
        title: "Interactive Checklist",
        description:
          "Added a seven-item pre-submit checklist so learners can self-review narrative strength before finishing.",
        artifact: "7 checks",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Guided Storytelling Page",
        description:
          "A single-page learning experience introduces the KopiNusa business case and walks users through data storytelling principles.",
        image: "/projects/ets-storytelling.png",
        alt: "ETS Storytelling landing section preview"
      },
      {
        title: "Practice and Feedback Structure",
        description:
          "Examples, rubrics, principles, and checklist sections support repeatable practice before submission.",
        image: "/projects/ets-storytelling.png",
        alt: "ETS Storytelling practice interface preview"
      }
    ],
    impactMetrics: [
      {
        value: "10",
        label: "Extra Examples",
        description:
          "The site includes additional answer variations from different insight perspectives."
      },
      {
        value: "05",
        label: "Principles",
        description:
          "BLUF, number credibility, insight, recommendations, and audience language are formalized as guidance."
      },
      {
        value: "48.6K",
        label: "Transactions",
        description:
          "The fictional KopiNusa case uses transaction volume as part of the business context."
      }
    ],
    nextProjectSlug: "website-sajak-kopi"
  },
  {
    id: "project-07",
    slug: "website-sajak-kopi",
    number: "07",
    year: "2026",
    title: "Website Sajak Kopi",
    client: "Sajak Kopi / Coffee and Literature Brand",
    category: "Web App / Platform",
    discipline: "Brand Commerce Website",
    role: "Frontend / Backend Development",
    duration: "Website build",
    techStack: ["Angular", "Express", "MongoDB", "Node.js", "Netlify"],
    thumbnail: "/projects/website-sajak-kopi.png",
    heroImage: "/projects/website-sajak-kopi.png",
    repoUrl: "https://github.com/siberbot88/website-sajak-kopi",
    liveUrl: "https://sajakopi.netlify.app/",
    summary:
      "A warm coffee-shop website and catalog for Sajak Kopi, combining product browsing, brand story, and a library-inspired cafe concept.",
    challenge:
      "The brand needed an online presence that presents menu items and commerce structure while preserving the literary, warm, and intimate identity of the cafe.",
    methodology: [
      {
        title: "Brand Narrative",
        description:
          "Built the experience around coffee, literature, warmth, and the cafe library corner as the main identity signals.",
        artifact: "Brand system",
        signal: "85%"
      },
      {
        title: "Catalog Structure",
        description:
          "Modeled products by category with API endpoints for all products, filtered products, and product detail views.",
        artifact: "Product API",
        signal: "80%"
      },
      {
        title: "Page Architecture",
        description:
          "Separated homepage, products, about, and library pages so the site can function as both catalog and profile.",
        artifact: "4 pages",
        signal: "82%"
      }
    ],
    solution: [
      {
        title: "Cafe Brand Website",
        description:
          "The homepage uses a real cafe visual, warm copy, and focused navigation for menu, story, and library content.",
        image: "/projects/website-sajak-kopi.png",
        alt: "Sajak Kopi website hero preview"
      },
      {
        title: "MEAN Stack Catalog",
        description:
          "The product catalog is backed by Express, MongoDB, and Angular components for filtering and product browsing.",
        image: "/projects/website-sajak-kopi.png",
        alt: "Sajak Kopi product catalog preview"
      }
    ],
    impactMetrics: [
      {
        value: "04",
        label: "Main Pages",
        description:
          "The site covers homepage, products, about, and library content areas."
      },
      {
        value: "MEAN",
        label: "Stack",
        description:
          "The repo combines MongoDB, Express, Angular, and Node.js."
      },
      {
        value: "API",
        label: "Product Endpoints",
        description:
          "The backend exposes product list, category filter, and product detail endpoints."
      }
    ],
    nextProjectSlug: "web-blogging-siberbot88"
  },
  {
    id: "project-08",
    slug: "web-blogging-siberbot88",
    number: "08",
    year: "2026",
    title: "Web Blogging Siberbot88",
    client: "Fyndra / Personal Blogging Website",
    category: "Portfolio / Web",
    discipline: "Frontend Website",
    role: "Frontend Development / Content Interface",
    duration: "Website build",
    techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    thumbnail: "/projects/github/web-blogging-siberbot88.webp",
    heroImage: "/projects/github/web-blogging-siberbot88.webp",
    repoUrl: "https://github.com/siberbot88/Web-Blogging-Siberbot88",
    liveUrl: "https://fyndra.netlify.app/",
    summary:
      "A personal blogging and profile website with a dark visual identity, navigation, project sections, and blog-oriented content structure.",
    challenge:
      "The site needed to combine personal identity, project navigation, and blog presentation without feeling like a generic static homepage.",
    methodology: [
      {
        title: "Brand Layout",
        description:
          "Designed a personal hero, social links, and section navigation around a consistent dark portfolio mood.",
        artifact: "Website shell",
        signal: "82%"
      },
      {
        title: "Content Sections",
        description:
          "Separated home, about, project, blog, and contact areas so visitors can move through the profile quickly.",
        artifact: "5 sections",
        signal: "78%"
      },
      {
        title: "Static Delivery",
        description:
          "Kept the implementation lightweight for Netlify deployment and simple content iteration.",
        artifact: "Netlify deploy",
        signal: "76%"
      }
    ],
    solution: [
      {
        title: "Personal Blog Homepage",
        description:
          "A dark personal website with profile navigation, project access, blog entry points, and external social links.",
        image: "/projects/github/web-blogging-siberbot88.webp",
        alt: "Web Blogging Siberbot88 homepage preview"
      },
      {
        title: "Lightweight Static Frontend",
        description:
          "The project uses simple web fundamentals to keep the portfolio and blog surface easy to host and maintain.",
        image: "/projects/github/web-blogging-siberbot88.webp",
        alt: "Web Blogging Siberbot88 static frontend preview"
      }
    ],
    impactMetrics: [
      {
        value: "05",
        label: "Main Sections",
        description:
          "The site organizes identity, about, projects, blog, and contact in one browsing flow."
      },
      {
        value: "HTML",
        label: "Core Stack",
        description:
          "The repository is mostly HTML with CSS and JavaScript for presentation behavior."
      },
      {
        value: "Live",
        label: "Published Site",
        description:
          "The project is deployed publicly through Netlify."
      }
    ],
    nextProjectSlug: "liora-match-platform"
  },
  {
    id: "project-09",
    slug: "liora-match-platform",
    number: "09",
    year: "2025",
    title: "Liora Match Platform",
    client: "Liora Match / EdTech Marketplace",
    category: "Mobile / Platform",
    discipline: "Full-Stack Product System",
    role: "Product Architecture / Mobile and Web Development",
    duration: "Platform build",
    techStack: ["NestJS", "Next.js", "React Native", "MySQL", "Prisma"],
    thumbnail: "/projects/github/liora.png",
    heroImage: "/projects/github/liora.png",
    repoUrl: "https://github.com/siberbot88/liora-match-app",
    liveUrl: "https://lioramatch.netlify.app/",
    summary:
      "A full-stack online learning platform connecting educators and students through mobile, landing, admin, pricing, messaging, and payment workflows.",
    challenge:
      "The product needed to handle different user roles, teaching formats, and pricing models across web, mobile, and backend services.",
    methodology: [
      {
        title: "Role Architecture",
        description:
          "Mapped separate workflows for students, teachers, and superadmins across mobile and web surfaces.",
        artifact: "3 role groups",
        signal: "90%"
      },
      {
        title: "Learning Commerce",
        description:
          "Modeled online courses, private tutoring, public lessons, assignments, bookings, and payments in one platform.",
        artifact: "EdTech model",
        signal: "88%"
      },
      {
        title: "Service Layer",
        description:
          "Organized NestJS, Prisma, MySQL, Redis, Firebase, Socket.io, and Midtrans into a deployable platform stack.",
        artifact: "Full stack",
        signal: "86%"
      }
    ],
    solution: [
      {
        title: "Mobile Learning Experience",
        description:
          "The mobile UI supports discovery, profile setup, lesson matching, progress, messaging, and student flows.",
        image: "/projects/github/liora.png",
        alt: "Liora Match mobile application UI preview"
      },
      {
        title: "Backend and Admin System",
        description:
          "The platform includes REST APIs, real-time messaging, Firebase authentication, Midtrans payment, and admin management.",
        image: "/projects/github/liora.png",
        alt: "Liora Match platform landing preview",
        url: "https://lioramatch.netlify.app/",
        actionLabel: "Open backend/admin"
      }
    ],
    impactMetrics: [
      {
        value: "15+",
        label: "Data Models",
        description:
          "The README describes user, class, booking, session, transaction, message, and notification models."
      },
      {
        value: "03",
        label: "Client Layers",
        description:
          "The architecture covers mobile app, admin panel, and landing website."
      },
      {
        value: "Pay",
        label: "Payment Flow",
        description:
          "Midtrans support is included for the learning commerce layer."
      }
    ],
    nextProjectSlug: "machine-learning-tracker"
  },
  {
    id: "project-10",
    slug: "machine-learning-tracker",
    number: "10",
    year: "2026",
    title: "Machine Learning Tracker",
    client: "Siberbot / ML Learning Roadmap",
    category: "Data Science / ML",
    discipline: "Learning Productivity Tool",
    role: "Frontend Development / Learning System Design",
    duration: "Tracker build",
    techStack: ["TypeScript", "React", "Next.js", "Vercel"],
    thumbnail: "/projects/github/machine-learning-tracker.webp",
    heroImage: "/projects/github/machine-learning-tracker.webp",
    repoUrl: "https://github.com/siberbot88/Machine-Learning-Tracker",
    liveUrl: "https://machine-learning-tracker.vercel.app/",
    summary:
      "A learning companion for tracking a machine learning roadmap, weekly tasks, submissions, and structured progress toward AI and data science goals.",
    challenge:
      "Self-paced machine learning study needed a clearer structure than scattered notes, with progress and submission tracking visible from the start.",
    methodology: [
      {
        title: "Roadmap Framing",
        description:
          "Turned the ML learning journey into a weekly progression from foundations toward deeper AI topics.",
        artifact: "12-week path",
        signal: "84%"
      },
      {
        title: "Task Status Design",
        description:
          "Created a task management structure so study items can move through clear progress states.",
        artifact: "Task board",
        signal: "82%"
      },
      {
        title: "Submission Tracking",
        description:
          "Added a portfolio-like layer for notebooks, repositories, or learning evidence to be saved against the roadmap.",
        artifact: "Evidence log",
        signal: "80%"
      }
    ],
    solution: [
      {
        title: "ML Roadmap Landing",
        description:
          "The homepage introduces a structured machine learning journey with a clear start action and GitHub access.",
        image: "/projects/github/machine-learning-tracker.webp",
        alt: "Machine Learning Tracker landing page preview"
      },
      {
        title: "Systematic Study Interface",
        description:
          "Feature sections frame roadmap, task management, and submission tracking as a focused study system.",
        image: "/projects/github/machine-learning-tracker.webp",
        alt: "Machine Learning Tracker feature interface preview"
      }
    ],
    impactMetrics: [
      {
        value: "12",
        label: "Week Roadmap",
        description:
          "The app positions the learning flow as a twelve-week machine learning track."
      },
      {
        value: "Tasks",
        label: "Study States",
        description:
          "The tracker supports task progress for structured learning follow-through."
      },
      {
        value: "Live",
        label: "Vercel Deploy",
        description:
          "The project is available as a public web application."
      }
    ],
    nextProjectSlug: "legacy-portfolio"
  },
  {
    id: "project-11",
    slug: "legacy-portfolio",
    number: "11",
    year: "2025",
    title: "Legacy Portfolio Website",
    client: "Mohammad Bayu Rizki / Earlier Portfolio",
    category: "Portfolio / Web",
    discipline: "Personal Website",
    role: "Frontend Development / Portfolio Design",
    duration: "Portfolio build",
    techStack: ["JavaScript", "React", "Netlify"],
    thumbnail: "/projects/github/legacy-portfolio.webp",
    heroImage: "/projects/github/legacy-portfolio.webp",
    repoUrl: "https://github.com/siberbot88/portofolio",
    liveUrl: "https://portofoliomohbayu.netlify.app/",
    summary:
      "An earlier personal portfolio site presenting identity, project highlights, and frontend development practice through a published Netlify build.",
    challenge:
      "The portfolio needed to introduce skills and work in a straightforward format before the current archive-driven portfolio system existed.",
    methodology: [
      {
        title: "Identity Page",
        description:
          "Built the main page around personal identity, summary, and portfolio navigation.",
        artifact: "Hero profile",
        signal: "78%"
      },
      {
        title: "Project Showcase",
        description:
          "Organized portfolio content into visible project areas for quick scanning.",
        artifact: "Showcase page",
        signal: "76%"
      },
      {
        title: "Hosted Iteration",
        description:
          "Published the site on Netlify as a stable earlier version of the portfolio.",
        artifact: "Netlify site",
        signal: "74%"
      }
    ],
    solution: [
      {
        title: "Earlier Portfolio Snapshot",
        description:
          "A published personal portfolio representing the previous visual and content direction.",
        image: "/projects/github/legacy-portfolio.webp",
        alt: "Legacy portfolio website preview"
      },
      {
        title: "Portfolio Baseline",
        description:
          "The project provided a foundation for later improvements in archive structure, interaction, and case-study depth.",
        image: "/projects/github/legacy-portfolio.webp",
        alt: "Legacy portfolio baseline interface preview"
      }
    ],
    impactMetrics: [
      {
        value: "Live",
        label: "Published",
        description:
          "The portfolio is deployed publicly through Netlify."
      },
      {
        value: "React",
        label: "Frontend Stack",
        description:
          "The project uses JavaScript frontend development patterns."
      },
      {
        value: "V1",
        label: "Portfolio Iteration",
        description:
          "The site acts as an earlier milestone before the current archive system."
      }
    ],
    nextProjectSlug: "academic-web-portfolio"
  },
  {
    id: "project-12",
    slug: "academic-web-portfolio",
    number: "12",
    year: "2025",
    title: "Academic Web Portfolio",
    client: "University Web Portfolio / 23082010054",
    category: "Portfolio / Web",
    discipline: "Static Website",
    role: "Frontend Development / Academic Submission",
    duration: "Course project",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    thumbnail: "/projects/github/academic-web-portfolio.webp",
    heroImage: "/projects/github/academic-web-portfolio.webp",
    repoUrl: "https://github.com/siberbot88/23082010054-Mohammad-Bayu-Rizki-web-porto",
    liveUrl: "https://23082010054-mohammad-bayu-rizki-web.vercel.app/",
    summary:
      "A course portfolio website for presenting identity, academic profile, and web fundamentals through a deployed static interface.",
    challenge:
      "The site needed to satisfy academic web requirements while still functioning as a readable personal profile.",
    methodology: [
      {
        title: "Academic Brief",
        description:
          "Structured the content around student identity, portfolio information, and required web sections.",
        artifact: "Course scope",
        signal: "77%"
      },
      {
        title: "Responsive Basics",
        description:
          "Applied HTML, CSS, and JavaScript fundamentals for a deployable static site.",
        artifact: "Static stack",
        signal: "75%"
      },
      {
        title: "Vercel Publish",
        description:
          "Used Vercel deployment to make the project accessible as a live web submission.",
        artifact: "Live URL",
        signal: "74%"
      }
    ],
    solution: [
      {
        title: "Academic Profile Page",
        description:
          "A deployed portfolio page made for university web development practice and identity presentation.",
        image: "/projects/github/academic-web-portfolio.webp",
        alt: "Academic web portfolio preview"
      },
      {
        title: "Static Web Foundation",
        description:
          "The project documents basic frontend structure before later portfolio versions became more product-focused.",
        image: "/projects/github/academic-web-portfolio.webp",
        alt: "Academic static portfolio interface preview"
      }
    ],
    impactMetrics: [
      {
        value: "HTML",
        label: "Core Build",
        description:
          "The repository is primarily a static web project."
      },
      {
        value: "Vercel",
        label: "Deployment",
        description:
          "The academic portfolio is available through a public Vercel link."
      },
      {
        value: "Course",
        label: "Submission",
        description:
          "The site is framed around a university web portfolio deliverable."
      }
    ],
    nextProjectSlug: "current-portfolio-system"
  },
  {
    id: "project-13",
    slug: "current-portfolio-system",
    number: "13",
    year: "2026",
    title: "Current Portfolio System",
    client: "Mohammad Bayu Rizki / Archive Portfolio",
    category: "Portfolio / Web",
    discipline: "Next.js Portfolio System",
    role: "Frontend Architecture / Interaction Design",
    duration: "Portfolio system",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GSAP"],
    thumbnail: "/projects/github/current-portfolio-system.webp",
    heroImage: "/projects/github/current-portfolio-system.webp",
    repoUrl: "https://github.com/siberbot88/new-portofolio-boy",
    liveUrl: "https://new-portofolio-boy.vercel.app",
    summary:
      "A modern archive-based portfolio system for case studies, project filtering, motion, visual archive views, and portfolio storytelling.",
    challenge:
      "The portfolio needed to scale beyond a landing page into an archive that can carry dashboards, platforms, ML, games, UI/UX, and older work.",
    methodology: [
      {
        title: "Archive Structure",
        description:
          "Built project data, filters, visual previews, archive pages, and detail pages around a single project model.",
        artifact: "Project index",
        signal: "90%"
      },
      {
        title: "Motion System",
        description:
          "Added page transitions, scroll reveals, custom cursor, carousel motion, and archive view interactions.",
        artifact: "Motion layer",
        signal: "86%"
      },
      {
        title: "Performance Pass",
        description:
          "Optimized heavy UI/UX image previews and scroll work so the archive remains usable with more projects.",
        artifact: "Asset pass",
        signal: "84%"
      }
    ],
    solution: [
      {
        title: "Archive Portfolio Interface",
        description:
          "The current portfolio combines index, visual carousel, archive table, visual archive, case studies, and footer contact paths.",
        image: "/projects/github/current-portfolio-system.webp",
        alt: "Current portfolio system preview"
      },
      {
        title: "Expandable Case Study Model",
        description:
          "Project entries drive cards, filters, hero visuals, solution sections, methodology, impact metrics, and next-project navigation.",
        image: "/projects/github/current-portfolio-system.webp",
        alt: "Current archive portfolio interface preview"
      }
    ],
    impactMetrics: [
      {
        value: "Next",
        label: "App Router",
        description:
          "The portfolio is built on Next.js with TypeScript project data."
      },
      {
        value: "02",
        label: "Archive Views",
        description:
          "The archive supports both table and visual browsing modes."
      },
      {
        value: "22",
        label: "Projects Ready",
        description:
          "The archive now carries the selected polished GitHub projects alongside the original case studies."
      }
    ],
    nextProjectSlug: "sokoban-game-python"
  },
  {
    id: "project-14",
    slug: "sokoban-game-python",
    number: "14",
    year: "2025",
    title: "Sokoban Game in Python",
    client: "Python Puzzle Game / Course Build",
    category: "Game / Interactive",
    discipline: "Game Logic Programming",
    role: "Python Development / Game Logic",
    duration: "Game prototype",
    techStack: ["Python", "Game Logic", "Grid System"],
    thumbnail: "/projects/github/sokoban-game-python.webp",
    heroImage: "/projects/github/sokoban-game-python.webp",
    repoUrl: "https://github.com/siberbot88/Sokoban-game-in-python",
    summary:
      "A Python implementation of Sokoban-style box pushing gameplay focused on grid movement, player actions, walls, targets, and puzzle state logic.",
    challenge:
      "Sokoban gameplay requires strict movement rules because each move can change whether the puzzle remains solvable.",
    methodology: [
      {
        title: "Grid Modeling",
        description:
          "Represented walls, spaces, targets, boxes, and the player as a state-based puzzle board.",
        artifact: "Board state",
        signal: "78%"
      },
      {
        title: "Movement Rules",
        description:
          "Implemented push constraints so boxes only move when the target cell is valid.",
        artifact: "Game rules",
        signal: "80%"
      },
      {
        title: "Puzzle Feedback",
        description:
          "Structured the game loop around move validation, board redraw, and win-state checks.",
        artifact: "Loop logic",
        signal: "76%"
      }
    ],
    solution: [
      {
        title: "Sokoban Puzzle Core",
        description:
          "A compact game logic project that practices state management through classic box-pushing puzzles.",
        image: "/projects/github/sokoban-game-python.webp",
        alt: "Sokoban Game in Python project card"
      },
      {
        title: "Python Gameplay Prototype",
        description:
          "The project focuses on rules, levels, and clear movement constraints instead of visual-heavy presentation.",
        image: "/projects/github/sokoban-game-python.webp",
        alt: "Sokoban Python gameplay logic preview"
      }
    ],
    impactMetrics: [
      {
        value: "Grid",
        label: "State System",
        description:
          "The project centers on board-state updates and cell validation."
      },
      {
        value: "Rules",
        label: "Puzzle Logic",
        description:
          "Movement and push behavior are the primary technical challenge."
      },
      {
        value: "Py",
        label: "Language",
        description:
          "The repo is a Python game programming exercise."
      }
    ],
    nextProjectSlug: "ucommodity-ecommerce"
  },
  {
    id: "project-15",
    slug: "ucommodity-ecommerce",
    number: "15",
    year: "2026",
    title: "UCommodity Ecommerce",
    client: "UCommodity / Agriculture Commerce",
    category: "E-commerce / Platform",
    discipline: "Laravel Commerce",
    role: "Full-Stack Web Development",
    duration: "Commerce build",
    techStack: ["Laravel", "Blade", "PHP", "MySQL"],
    thumbnail: "/projects/github/ucommodity-ecommerce.webp",
    heroImage: "/projects/github/ucommodity-ecommerce.webp",
    repoUrl: "https://github.com/siberbot88/UCommodity-Ecommerce",
    summary:
      "An e-commerce platform concept for ornamental plants and agricultural products with catalog, cart, checkout, and storefront workflows.",
    challenge:
      "Agriculture commerce needs product browsing and ordering flows that can represent plants, garden goods, and harvest commodities clearly.",
    methodology: [
      {
        title: "Catalog Planning",
        description:
          "Modeled product categories, product display, and browsing paths for agriculture-related goods.",
        artifact: "Product catalog",
        signal: "82%"
      },
      {
        title: "Cart Flow",
        description:
          "Structured cart and checkout behavior as the core commercial workflow.",
        artifact: "Purchase path",
        signal: "80%"
      },
      {
        title: "Laravel Build",
        description:
          "Used Laravel and Blade patterns to keep storefront, routing, and backend behavior connected.",
        artifact: "MVC stack",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Agriculture Storefront",
        description:
          "A commerce system for presenting agriculture and ornamental plant products through a dedicated storefront.",
        image: "/projects/github/ucommodity-ecommerce.webp",
        alt: "UCommodity Ecommerce project card"
      },
      {
        title: "Order Flow Foundation",
        description:
          "The platform frames product discovery, cart management, and checkout as one integrated transaction flow.",
        image: "/projects/github/ucommodity-ecommerce.webp",
        alt: "UCommodity commerce workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "Store",
        label: "Commerce Flow",
        description:
          "The project covers catalog-to-checkout e-commerce behavior."
      },
      {
        value: "Agri",
        label: "Domain",
        description:
          "The product category focuses on plants and agricultural goods."
      },
      {
        value: "Blade",
        label: "Stack",
        description:
          "The repository language is primarily Laravel Blade."
      }
    ],
    nextProjectSlug: "personal-academic-manager"
  },
  {
    id: "project-16",
    slug: "personal-academic-manager",
    number: "16",
    year: "2026",
    title: "Personal Academic Manager",
    client: "Academic Productivity / Personal System",
    category: "Productivity / Tool",
    discipline: "Task and Study Management",
    role: "Product Design / PHP Development",
    duration: "Productivity build",
    techStack: ["PHP", "Web App", "Checklist Logic"],
    thumbnail: "/projects/github/personal-academic-manager.webp",
    heroImage: "/projects/github/personal-academic-manager.webp",
    repoUrl: "https://github.com/siberbot88/personal-academic-manager",
    summary:
      "A personal academic manager for tasks, early-start planning, study sessions, inbox capture, progress checklists, and health scoring.",
    challenge:
      "Academic workload can become reactive, so the system needed to split assignments into actionable phases before deadlines create panic.",
    methodology: [
      {
        title: "Deadline Breakdown",
        description:
          "Used auto-splitting phases and checklist progress to turn large tasks into smaller execution steps.",
        artifact: "Phase planner",
        signal: "86%"
      },
      {
        title: "Study Rhythm",
        description:
          "Framed the system around weekly study sessions and a top-priority dashboard.",
        artifact: "Top 3",
        signal: "82%"
      },
      {
        title: "Capture Layer",
        description:
          "Added an inbox capture concept for files and links from WhatsApp or Drive references.",
        artifact: "Inbox",
        signal: "80%"
      }
    ],
    solution: [
      {
        title: "Academic Control Panel",
        description:
          "A personal productivity system for tracking assignments, sessions, captured resources, and study health.",
        image: "/projects/github/personal-academic-manager.webp",
        alt: "Personal Academic Manager project card"
      },
      {
        title: "Anti-Stagnation Workflow",
        description:
          "The app emphasizes earlier starts, visible progress, and weekly accountability through structured task states.",
        image: "/projects/github/personal-academic-manager.webp",
        alt: "Personal Academic Manager workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "Top 3",
        label: "Focus System",
        description:
          "The dashboard prioritizes the most important academic tasks."
      },
      {
        value: "5x",
        label: "Study Sessions",
        description:
          "The repo description targets five study sessions per week."
      },
      {
        value: "Score",
        label: "Health Signal",
        description:
          "A health score is used to detect stagnation and panic risk."
      }
    ],
    nextProjectSlug: "insta-nutri-calc"
  },
  {
    id: "project-17",
    slug: "insta-nutri-calc",
    number: "17",
    year: "2025",
    title: "Insta Nutri Calc",
    client: "Nutrition Utility / Instant Food",
    category: "Utility / Tool",
    discipline: "Nutrition Calculator",
    role: "Frontend Development / Utility Design",
    duration: "Utility build",
    techStack: ["HTML", "JavaScript", "Tailwind CSS"],
    thumbnail: "/projects/github/insta-nutri-calc.webp",
    heroImage: "/projects/github/insta-nutri-calc.webp",
    repoUrl: "https://github.com/siberbot88/insta-nutri-calc",
    summary:
      "A web utility for calculating instant food nutrition with real-time food search, daily consumption lists, and automatic calorie and macro summaries.",
    challenge:
      "Instant food tracking needs to be quick enough for daily use while still showing calorie, protein, carbohydrate, and fat totals clearly.",
    methodology: [
      {
        title: "Food Search",
        description:
          "Built real-time search interaction so users can quickly find and add consumed items.",
        artifact: "Search UI",
        signal: "82%"
      },
      {
        title: "Macro Summary",
        description:
          "Grouped calories, protein, carbohydrates, and fat into a clear daily summary.",
        artifact: "Nutrition totals",
        signal: "80%"
      },
      {
        title: "Responsive Utility",
        description:
          "Kept the layout compact and mobile-friendly for fast entry and review.",
        artifact: "Responsive page",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Nutrition Calculator",
        description:
          "A lightweight daily nutrition tracker tailored to instant food entries and quick macro totals.",
        image: "/projects/github/insta-nutri-calc.webp",
        alt: "Insta Nutri Calc project card"
      },
      {
        title: "Fast Food Entry Flow",
        description:
          "The interface prioritizes search, add-to-list behavior, and automatic nutritional summaries.",
        image: "/projects/github/insta-nutri-calc.webp",
        alt: "Insta Nutri Calc nutrition workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "04",
        label: "Macro Totals",
        description:
          "Calories, protein, carbohydrates, and fat are summarized automatically."
      },
      {
        value: "Live",
        label: "Utility Pattern",
        description:
          "The project is designed as a single-purpose utility workflow."
      },
      {
        value: "CSS",
        label: "Repo Language",
        description:
          "The repository uses Tailwind-oriented frontend styling."
      }
    ],
    nextProjectSlug: "harvestfarm-mobile"
  },
  {
    id: "project-18",
    slug: "harvestfarm-mobile",
    number: "18",
    year: "2025",
    title: "HarvestFarm Mobile",
    client: "HarvestFarm / Agriculture Sales",
    category: "Mobile / Platform",
    discipline: "Mobile Commerce",
    role: "Mobile Development / Product UI",
    duration: "Mobile app build",
    techStack: ["Kotlin", "Android", "Mobile UI"],
    thumbnail: "/projects/design-ui-ux/optimized/Harversfarm-APP.webp",
    heroImage: "/projects/design-ui-ux/optimized/Harversfarm-APP.webp",
    repoUrl: "https://github.com/siberbot88/Harvestfarm-mobile-version",
    summary:
      "A mobile application concept for agricultural product sales, connecting harvest product browsing with ordering and farm-commerce interactions.",
    challenge:
      "Farm produce commerce needs a mobile-first interface that can represent fresh products, order intent, and transaction steps clearly.",
    methodology: [
      {
        title: "Mobile Catalog",
        description:
          "Designed the product surface around farm goods, visual product cards, and mobile browsing.",
        artifact: "Catalog UI",
        signal: "82%"
      },
      {
        title: "Order Journey",
        description:
          "Mapped product selection, cart-like behavior, and buyer actions for mobile use.",
        artifact: "Order flow",
        signal: "80%"
      },
      {
        title: "Android Build",
        description:
          "Implemented the mobile version with Kotlin as the application foundation.",
        artifact: "Kotlin app",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Farm Commerce Mobile UI",
        description:
          "A mobile storefront direction for browsing and ordering agricultural products.",
        image: "/projects/design-ui-ux/optimized/Harversfarm-APP.webp",
        alt: "HarvestFarm mobile application UI preview"
      },
      {
        title: "Agriculture Sales Flow",
        description:
          "The app frames farmer product presentation and buyer action through a focused mobile experience.",
        image: "/projects/design-ui-ux/optimized/Harversfarm-APP.webp",
        alt: "HarvestFarm mobile commerce workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "Kotlin",
        label: "Mobile Stack",
        description:
          "The repository language is Kotlin for Android development."
      },
      {
        value: "Agri",
        label: "Commerce Domain",
        description:
          "The product focuses on farm produce and agricultural sales."
      },
      {
        value: "App",
        label: "Mobile Surface",
        description:
          "The project extends the HarvestFarm concept into a mobile version."
      }
    ],
    nextProjectSlug: "bbi-hub-applications"
  },
  {
    id: "project-19",
    slug: "bbi-hub-applications",
    number: "19",
    year: "2025",
    title: "BBI HUB Applications",
    client: "BBI HUB / Internal Operations",
    category: "Web App / Platform",
    discipline: "Laravel Operations System",
    role: "Full-Stack Development / UI Implementation",
    duration: "Application build",
    techStack: ["Laravel", "Blade", "PHP", "MySQL"],
    thumbnail: "/projects/design-ui-ux/optimized/BBIHUB.webp",
    heroImage: "/projects/design-ui-ux/optimized/BBIHUB.webp",
    repoUrl: "https://github.com/siberbot88/BBI-HUB-applications",
    summary:
      "An internal hub application concept for coordinating operational data, records, users, and business process workflows in a centralized web platform.",
    challenge:
      "Operational teams need a hub that can keep records and workflows accessible without scattering information across disconnected tools.",
    methodology: [
      {
        title: "Process Mapping",
        description:
          "Identified the main operational surfaces that need to be centralized in a hub-style application.",
        artifact: "Workflow map",
        signal: "82%"
      },
      {
        title: "Dashboard Structure",
        description:
          "Organized navigation, data pages, and management views into an application shell.",
        artifact: "Hub UI",
        signal: "80%"
      },
      {
        title: "Laravel Foundation",
        description:
          "Used Laravel and Blade as the base for web routing, views, and data operations.",
        artifact: "MVC app",
        signal: "78%"
      }
    ],
    solution: [
      {
        title: "Internal Hub Interface",
        description:
          "A web application direction for centralizing business records and operational activities.",
        image: "/projects/design-ui-ux/optimized/BBIHUB.webp",
        alt: "BBI HUB application UI preview"
      },
      {
        title: "Operations Platform Base",
        description:
          "The project frames Laravel as a practical foundation for an internal business application.",
        image: "/projects/design-ui-ux/optimized/BBIHUB.webp",
        alt: "BBI HUB operations platform preview"
      }
    ],
    impactMetrics: [
      {
        value: "Hub",
        label: "System Type",
        description:
          "The application is framed as a centralized internal platform."
      },
      {
        value: "Blade",
        label: "Frontend Layer",
        description:
          "The repository uses Laravel Blade for presentation."
      },
      {
        value: "Ops",
        label: "Use Case",
        description:
          "The project focuses on operational coordination and management."
      }
    ],
    nextProjectSlug: "ngekoss-app-laravel"
  },
  {
    id: "project-20",
    slug: "ngekoss-app-laravel",
    number: "20",
    year: "2025",
    title: "Ngekoss App Laravel",
    client: "Ngekoss / Housing Platform",
    category: "Web App / Platform",
    discipline: "Rental Listing System",
    role: "Laravel Development / Platform Build",
    duration: "Web app build",
    techStack: ["Laravel", "PHP", "MySQL", "Blade"],
    thumbnail: "/projects/github/ngekoss-app-laravel.webp",
    heroImage: "/projects/github/ngekoss-app-laravel.webp",
    repoUrl: "https://github.com/siberbot88/ngekoss_app_Laravel",
    summary:
      "A Laravel-based housing platform concept for kost discovery, listing management, and rental information workflows.",
    challenge:
      "Kost search needs structured listing information so users can compare options without relying on scattered chat or manual notes.",
    methodology: [
      {
        title: "Listing Model",
        description:
          "Structured the application around room, location, price, and availability-style information.",
        artifact: "Kost data",
        signal: "78%"
      },
      {
        title: "Search Surface",
        description:
          "Framed the browsing experience around discovery and comparison of room options.",
        artifact: "Browse flow",
        signal: "76%"
      },
      {
        title: "Laravel CRUD",
        description:
          "Used Laravel patterns for creating, reading, updating, and organizing rental listings.",
        artifact: "CRUD app",
        signal: "76%"
      }
    ],
    solution: [
      {
        title: "Kost Listing Platform",
        description:
          "A Laravel platform direction for browsing and managing rental room information.",
        image: "/projects/github/ngekoss-app-laravel.webp",
        alt: "Ngekoss App Laravel project card"
      },
      {
        title: "Rental Management Base",
        description:
          "The system provides a foundation for structured housing listings and rental decision workflows.",
        image: "/projects/github/ngekoss-app-laravel.webp",
        alt: "Ngekoss rental platform workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "Kost",
        label: "Domain",
        description:
          "The project focuses on Indonesian room rental discovery."
      },
      {
        value: "CRUD",
        label: "Core Flow",
        description:
          "Listing management is the main application behavior."
      },
      {
        value: "PHP",
        label: "Stack",
        description:
          "The project is built with Laravel/PHP conventions."
      }
    ],
    nextProjectSlug: "unitunes-music-management"
  },
  {
    id: "project-21",
    slug: "unitunes-music-management",
    number: "21",
    year: "2025",
    title: "UNITUNES Music Management",
    client: "UNITUNES / Music Library App",
    category: "Desktop / Management",
    discipline: "Java Application",
    role: "Java Development / Information System",
    duration: "Desktop app build",
    techStack: ["Java", "Desktop App", "OOP"],
    thumbnail: "/projects/github/unitunes-music-management.webp",
    heroImage: "/projects/github/unitunes-music-management.webp",
    repoUrl: "https://github.com/siberbot88/UNITUNES-Music-Management-Application",
    summary:
      "A Java music management application for practicing object-oriented structure, catalog management, and desktop information-system workflows.",
    challenge:
      "Music catalog management needs clear entities and actions so songs, artists, playlists, or library records can be maintained consistently.",
    methodology: [
      {
        title: "Entity Design",
        description:
          "Modeled music library records around object-oriented concepts and management actions.",
        artifact: "OOP model",
        signal: "76%"
      },
      {
        title: "Management Flow",
        description:
          "Organized the app around adding, viewing, updating, and maintaining catalog information.",
        artifact: "Catalog CRUD",
        signal: "76%"
      },
      {
        title: "Desktop Practice",
        description:
          "Used Java as a practice ground for information-system behavior outside a web stack.",
        artifact: "Java app",
        signal: "74%"
      }
    ],
    solution: [
      {
        title: "Music Management App",
        description:
          "A Java application direction for managing music library data and practicing desktop app structure.",
        image: "/projects/github/unitunes-music-management.webp",
        alt: "UNITUNES Music Management project card"
      },
      {
        title: "OOP Catalog System",
        description:
          "The project uses catalog-management behavior as a practical object-oriented programming exercise.",
        image: "/projects/github/unitunes-music-management.webp",
        alt: "UNITUNES Java application workflow preview"
      }
    ],
    impactMetrics: [
      {
        value: "Java",
        label: "Language",
        description:
          "The repository is built as a Java application."
      },
      {
        value: "OOP",
        label: "Practice Focus",
        description:
          "The app emphasizes object-oriented information-system modeling."
      },
      {
        value: "CRUD",
        label: "Management Flow",
        description:
          "Catalog maintenance is the primary application behavior."
      }
    ],
    nextProjectSlug: "palletgrid"
  },
  {
    id: "project-22",
    slug: "palletgrid",
    number: "22",
    year: "2026",
    title: "PaletteGrid",
    client: "Design Tooling / Starter System Generator",
    category: "Utility / Tool",
    discipline: "Design System Generator",
    role: "Frontend Development / Design Engineering",
    duration: "Tool build",
    techStack: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    thumbnail: "/projects/github/palletgrid.png",
    heroImage: "/projects/github/palletgrid.png",
    repoUrl: "https://github.com/siberbot88/PalleteGrid",
    summary:
      "A design system generator that creates starter systems from color and type. Pick a mood, tune the palette, preview real UI components, then copy CSS, Tailwind, or JSON tokens.",
    challenge:
      "Starting a new project's visual identity from scratch is slow. Designers and developers need a quick way to generate cohesive color palettes, typography pairings, and preview them as real UI components before committing to a direction.",
    methodology: [
      {
        title: "Mood-Based Generation",
        description:
          "Built a mood selector system with presets like Future Neon that drive palette generation, contrast rules, and typography direction automatically.",
        artifact: "Mood engine",
        signal: "88%"
      },
      {
        title: "Semantic Color System",
        description:
          "Generated palettes produce semantic tokens — canvas, ink, primary, accent — ready for immediate UI use with accessible contrast.",
        artifact: "Color tokens",
        signal: "86%"
      },
      {
        title: "Live Preview Canvas",
        description:
          "Designed a preview canvas that renders the generated palette as real design directions: homepage concepts, dashboards, business cards, and typography specimens.",
        artifact: "Preview UI",
        signal: "84%"
      }
    ],
    solution: [
      {
        title: "Design System Landing",
        description:
          "A clean hero introducing PaletteGrid's purpose: generate a starter design system from color and type, with immediate generate and preview actions.",
        image: "/projects/github/palletgrid.png",
        alt: "PaletteGrid hero landing page with generate system call-to-action"
      },
      {
        title: "Generator Controls Panel",
        description:
          "An interactive control panel for shaping the starter system: palette size, mood, contrast level, canvas color, font pairing, with generate, randomize, and reset actions.",
        image: "/projects/github/palletgrid2.png",
        alt: "PaletteGrid generator controls with mood selector and semantic color result cards"
      },
      {
        title: "Preview Canvas Showcase",
        description:
          "A live preview canvas rendering the palette as real design directions — web concepts, abstract compositions, business cards, dashboards, and typography specimens.",
        image: "/projects/github/palletgrid3.png",
        alt: "PaletteGrid preview canvas showing homepage concept, dashboard, and typography specimen"
      }
    ],
    impactMetrics: [
      {
        value: "06",
        label: "Semantic Tokens",
        description:
          "Each generated palette produces canvas, ink, primary, accent, muted, and border semantic color roles."
      },
      {
        value: "03",
        label: "Export Formats",
        description:
          "The tool outputs design tokens in CSS custom properties, Tailwind config, and JSON formats."
      },
      {
        value: "Live",
        label: "Preview Canvas",
        description:
          "Generated palettes are immediately previewed as real UI components and layout directions."
      }
    ],
    nextProjectSlug: "davis-presentation"
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
