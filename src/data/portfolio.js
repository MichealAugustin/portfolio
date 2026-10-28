import { Apple, Smartphone } from "lucide-react";

export const heroConfig = {
  artwork: "icons",
};

export const cursorRippleConfig = {
  enabled: true,
  useWebGL: false,
  intensity: 1,
  color1: "#8b5cf6",
  color2: "#38bdf8",
  maxRadius: 100,
};

const personalInfo = {
  name: "Micheal Augustin J",
  initials: "RegiMc21",
  role: "Game Developer",
  roles: [
    "Game Developer",
    "Unity Developer",
    "AR/VR Developer",
    "Gameplay Programmer",
  ],
  headline: "Hi, I'm Micheal Augustin J",
  headlineHighlight: "I make interactive experiences.",
  introduction:
    "I'm focused on game development, Unity, gameplay programming, and AR/VR experiences. I enjoy building interactive projects, solving technical challenges, and learning new development tools.",
  image: "",
  cvUrl: `${import.meta.env.BASE_URL}resume/Resume.pdf`,
  tagline:
    "Building interactive experiences through gameplay programming, Unity, and AR/VR development.",
  heroStats: [
    { value: "Unity", label: "Game engine" },
    { value: "AR / VR", label: "Interactive tech" },
    { value: "C#", label: "Gameplay code" },
  ],
  education: {
    degree: "Master of Computer Applications",
    institution: "St. Joseph's College (Autonomous)",
    location: "Tiruchirappalli, Tamil Nadu",
    period: "June 2024 — April 2026",
    topics: [
      "Programming",
      "Algorithms",
      "Software Development",
      "Computer Science",
    ],
  },
  experience: {
    role: "AR/VR Intern",
    company: "IQTechMax",
    location: "Perungudi",
    description:
      "Worked with Unity and AR/VR development as part of an internship focused on interactive application development.",
    tags: ["Unity", "AR/VR", "Vuforia", "Debugging", "Testing", "Mobile AR"],
  },
  links: {
    github: "https://github.com/MichealAugustinGamedev",
    linkedin: "",
    itch: "",
    email: "",
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  },
  githubText:
    "Explore my repositories, experiments, learning projects, and development work on GitHub.",
  journey: [
    {
      number: "01",
      title: "Programming",
      description:
        "Building the programming fundamentals needed to create software and interactive systems.",
    },
    {
      number: "02",
      title: "Unity + C#",
      description:
        "Moving into Unity development and learning how code translates into interactive gameplay.",
    },
    {
      number: "03",
      title: "2D Game Development",
      description:
        "Creating smaller games and gameplay prototypes while learning game loops, physics, input, and systems.",
    },
    {
      number: "04",
      title: "3D & Game Systems",
      description:
        "Exploring 3D environments, game systems, interactions, and more structured gameplay programming.",
    },
    {
      number: "05",
      title: "AR / VR Development",
      description:
        "Applying Unity to AR/VR experiences and exploring real-world interactive applications.",
    },
    {
      number: "06",
      title: "Unreal Engine",
      description:
        "Expanding beyond Unity by learning Unreal Engine and exploring gameplay programming concepts.",
    },
    {
      number: "07",
      title: "Gameplay + QA",
      description:
        "Combining development with debugging, gameplay testing, issue reproduction, and quality validation.",
    },
  ],
  qaIntro:
    "Game development isn't only about building features. I also have an interest in game QA and testing, with a focus on finding problems, reproducing bugs, and validating gameplay systems.",
  qaSkills: [
    {
      title: "Gameplay Testing",
      description:
        "Checking gameplay systems, controls, interactions, and overall player experience.",
    },
    {
      title: "Bug Reproduction",
      description:
        "Reproducing issues consistently and identifying the conditions that cause them.",
    },
    {
      title: "Functional Testing",
      description:
        "Validating whether game features and systems behave as intended.",
    },
    {
      title: "Regression Testing",
      description:
        "Rechecking existing functionality after changes and fixes.",
    },
    {
      title: "Test Case Thinking",
      description:
        "Breaking gameplay features into scenarios and checking expected results.",
    },
    {
      title: "Debugging",
      description:
        "Using debugging and development tools to investigate technical issues.",
    },
  ],
};

const contact = {
  eyebrow: "Contact",
  heading: "Let's build something great",
  text: "I'm open to QA testing and game development roles and collaborations. If you're hiring, building something cool, or just want to talk games, reach out.",
  phone: {
    label: "Call me",
    number: "+91 9659626548",
    url: "tel:+919659626548",
  },
  links: [
    {
      label: "LinkedIn",
      subtitle: "Best for work and roles",
      url: "https://www.linkedin.com/in/michealaugustin",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      subtitle: "Code and projects",
      url: personalInfo.links.github,
      icon: "github",
    },
    {
      label: "itch.io",
      subtitle: "Play my games",
      url: "https://michealaugustinj-gamedev.itch.io",
      icon: "itch",
    },
    {
      label: "Instagram",
      subtitle: "Behind the scenes",
      url: "https://www.instagram.com/j.michealaugustin/",
      icon: "instagram",
    },
    {
      label: "Discord",
      subtitle: "Chat with me",
      url: "https://discord.com/users/1137607567074414642",
      icon: "discord",
    },
  ],
};

const aboutMe = {
  eyebrow: "About me",
  heading: "From game tester to game developer",
  paragraphs: [
    "With a Master of Computer Applications (MCA) from St. Joseph's College (Autonomous), Tiruchirappalli, I combine a foundation in software development with hands-on experience in Unity, C#, and AR/VR application development.",
    "During my AR/VR internship at IQTechMax, I worked with Unity on interactive applications. I'm also exploring Unreal Engine as I continue to grow as a game developer.",
    "My projects include the AR Overlay Application, Mobile Tower VR Simulator, and 2D Chess Game. I'm looking for a QA or game developer role at a game studio where I can contribute and keep learning.",
  ],
  skillGroups: [
    {
      label: "Game development",
      tags: ["Unity", "Unreal Engine", "C#", "AR / VR", "2D & 3D games"],
    },
    {
      label: "QA & testing",
      tags: [
        "Game testing",
        "Bug reporting",
        "Test cases",
        "PC gaming",
        "IT support",
      ],
    },
  ],
  cvUri: `${import.meta.env.BASE_URL}resume/Resume.pdf`,
  photo: `${import.meta.env.BASE_URL}images/profile/Profile.jpg`,
  photoAlt: "Portrait of Micheal Augustin J",
};

const skills = [
  {
    title: "Game Development",
    items: [
      "Unity",
      "C#",
      "Gameplay Programming",
      "2D Game Development",
      "3D Game Development",
      "Game Systems",
      "Physics",
      "UI",
    ],
  },
  {
    title: "AR / VR",
    items: [
      "Vuforia",
      "AR Foundation",
      "XR Interaction Toolkit",
      "AR Development",
      "VR Development",
      "iPad AR",
    ],
  },
  { title: "Engines", items: ["Unity", "Unreal Engine 5"] },
  {
    title: "Programming",
    items: ["C#", "C/C++", "Python", "JavaScript"],
  },
  {
    title: "Development",
    items: [
      "Git",
      "GitHub",
      "Debugging",
      "Testing",
      "Performance Optimization",
    ],
  },
  {
    title: "Other",
    items: ["React", "Node.js", "Express", "MongoDB", "Ollama"],
  },
];

const arOverlayMedia = ["1.png", "2.png", "3.png", "4.png"].map(
  (filename, index) => ({
    type: "image",
    source: encodeURI(
      `${import.meta.env.BASE_URL}images/projects/AR Overlay Application/${filename}`,
    ),
    title: `AR Overlay Application screenshot ${index + 1}`,
  }),
);

const towerVrMedia = ["1.png", "2.png", "3.png", "4.png"].map(
  (filename, index) => ({
    type: "image",
    source: encodeURI(
      `${import.meta.env.BASE_URL}images/projects/Mobile Tower VR Simulator/${filename}`,
    ),
    title: `Mobile Tower VR Simulator screenshot ${index + 1}`,
  }),
);

const chessMedia = ["1.png", "2.png", "3.png", "4.png", "5.png"].map(
  (filename, index) => ({
    type: "image",
    source: encodeURI(
      `${import.meta.env.BASE_URL}images/projects/2D Chess Game/${filename}`,
    ),
    title: `2D Chess Game screenshot ${index + 1}`,
  }),
);

const marioMedia = ["1.png", "2.png", "3.png"].map((filename, index) => ({
  type: "image",
  source: encodeURI(
    `${import.meta.env.BASE_URL}images/projects/Mario/${filename}`,
  ),
  title: `Mario Clone screenshot ${index + 1}`,
}));

const unrealLearningMedia = [
  {
    type: "image",
    source: encodeURI(
      `${import.meta.env.BASE_URL}images/projects/Unreal Engine/UnrealEngine.png`,
    ),
    title: "Unreal Engine Learning screenshot",
  },
];

const engineInfo = {
  Unity: {
    icon: `${import.meta.env.BASE_URL}images/engines/unity.svg`,
    alt: "Unity",
    label: "Unity",
  },
  "Unreal Engine 5": {
    icon: `${import.meta.env.BASE_URL}images/engines/UnrealEngine.png`,
    alt: "Unreal Engine",
    label: "Unreal Engine 5",
    fallback: "Unreal Engine",
  },
};

const platformInfo = {
  Mobile: { Icon: Smartphone },
  iOS: { Icon: Apple },
};

const projects = [
  {
    id: "ar-overlay",
    name: "AR Overlay Application",
    category: "AR/VR",
    cover: arOverlayMedia[0].source,
    description:
      "An AR overlay application built in Unity with Vuforia, combining model detection, interactive UI systems, and mobile AR.",
    genres: ["Augmented Reality", "Interactive Experience"],
    platforms: ["iOS"],
    engine: "Unity",
    technologies: ["C#", "Vuforia"],
    features: ["AR Interaction", "Model Detection", "UI Systems", "Mobile AR"],
    links: [],
    media: arOverlayMedia,
    featured: true,
  },
  {
    id: "tower-vr",
    name: "Mobile Tower VR Simulator",
    category: "VR",
    cover: towerVrMedia[0].source,
    description:
      "A mobile VR tower simulator built in Unity, featuring a 3D environment, interactive objects, and XR systems.",
    genres: ["Simulation", "Virtual Reality"],
    platforms: ["Mobile VR"],
    engine: "Unity",
    technologies: ["C#", "XR Interaction Toolkit"],
    features: ["VR Interaction", "3D Environment", "Interactive Objects", "XR Systems"],
    links: [],
    media: towerVrMedia,
    featured: true,
  },
  {
    id: "chess",
    name: "2D Chess Game",
    category: "Game",
    description:
      "A Unity 2D chess game with board systems, piece movement, game logic, and UI.",
    genres: ["Strategy", "Board Game", "2D"],
    platforms: [],
    engine: "Unity",
    technologies: ["C#"],
    features: ["Board System", "Piece Movement", "Game Logic", "UI"],
    links: [],
    cover: chessMedia[0].source,
    media: chessMedia,
    featured: true,
  },
  {
    id: "mario",
    name: "Mario Clone",
    category: "Game",
    description: "Project details coming soon.",
    genres: ["Game"],
    platforms: [],
    engine: "Unity",
    technologies: ["C#"],
    features: ["Player Movement", "Platforming", "Level System", "Gameplay"],
    links: [],
    cover: marioMedia[0].source,
    media: marioMedia,
    featured: false,
  },
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    category: "Game",
    description: "Project details coming soon.",
    genres: ["Game"],
    platforms: ["Mobile"],
    engine: "Unity",
    technologies: ["C#"],
    features: ["2D Gameplay", "Physics", "Obstacle System", "Score System"],
    links: [],
    media: [],
    featured: false,
  },
  {
    id: "dino",
    name: "Dino Endless Runner",
    category: "Game",
    description: "Project details coming soon.",
    genres: ["Game"],
    platforms: ["Mobile"],
    engine: "Unity",
    technologies: ["C#"],
    features: ["Endless Runner", "Player Movement", "Obstacles", "Game Loop"],
    links: [],
    media: [],
    featured: false,
  },
  {
    id: "unreal-learning",
    name: "Unreal Engine Learning",
    category: "Learning",
    description: "Project details coming soon.",
    genres: ["Learning"],
    platforms: [],
    engine: "Unreal Engine 5",
    technologies: ["Blueprints", "C++"],
    features: ["Blueprints", "C++", "Gameplay Concepts", "UE5 Fundamentals"],
    links: [],
    cover: unrealLearningMedia[0].source,
    media: unrealLearningMedia,
    featured: false,
  },
];

export {
  aboutMe,
  contact,
  engineInfo,
  personalInfo,
  platformInfo,
  projects,
  skills,
};
