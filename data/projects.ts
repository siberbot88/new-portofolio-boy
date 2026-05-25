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
    nextProjectSlug: "davis-presentation"
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
