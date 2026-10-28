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
  role: "Open to work",
  heroLabel: "UNITY · AR/VR · GAME QA",
  headline: "Hi, I'm Micheal Augustin J.",
  headlineHighlight: "Unity Game Developer & Game QA Tester",
  introduction:
    "I build playable Unity (C#) games and AR/VR apps, then test and debug every build. 4-month AR/VR internship in Unity and Unreal Engine. Open to Junior Game Developer, Unity Developer and Game QA roles.",
  heroProof: "3 projects · AR app tested on iPad · Udemy Game Tester · Google IT Support",
  image: "",
  cvUrl: `${import.meta.env.BASE_URL}files/Micheal_Augustin_J_Resume.pdf`,
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
    github: "https://github.com/MichealAugustin",
    linkedin: "https://www.linkedin.com/in/michealaugustin",
    itch: "",
    email: "michealaugustin0000@gmail.com",
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
  heading: "Hiring for a game role? Let's talk.",
  text: "I'm open to QA testing and game development roles and collaborations. If you're hiring, building something cool, or just want to talk games, reach out.",
  phone: {
    label: "Call me",
    number: "+91 9659626548",
    url: "tel:+919659626548",
  },
  links: [
    {
      label: "Email",
      subtitle: "michealaugustin0000@gmail.com",
      url: "mailto:michealaugustin0000@gmail.com",
      icon: "email",
    },
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
  heading: "Game developer with a tester's mindset",
  paragraphs: [
    "I'm a fresher Unity (C#) developer with an MCA from St. Joseph's College, Tiruchirappalli. I interned for 4 months at IQ TechMax, building AR/VR applications in Unity and Unreal Engine.",
    "I focus on gameplay programming, debugging and performance. I test every build I make, so what I hand over is stable and playable.",
    "I'm looking for a Junior Game Developer, Unity Developer or Game QA Tester role at a game studio.",
  ],
  skillGroups: [
    {
      label: "GAME DEVELOPMENT",
      tags: ["Unity", "C#", "Gameplay Programming", "Physics", "2D & 3D Games", "UI Design"],
    },
    {
      label: "AR / VR",
      tags: ["Vuforia", "XR Interaction Toolkit", "iPad AR"],
    },
    {
      label: "QA & TESTING",
      tags: ["Manual Testing", "Gameplay Testing", "Bug Identification & Reporting", "Debugging"],
    },
    {
      label: "TOOLS",
      tags: ["Unreal Engine", "Git", "GitHub", "Visual Studio", "Blender (Basics)"],
    },
  ],
  cvUri: `${import.meta.env.BASE_URL}files/Micheal_Augustin_J_Resume.pdf`,
  photo: `${import.meta.env.BASE_URL}images/profile/Profile.jpg`,
  photoAlt: "Portrait of Micheal Augustin J",
};

const skills = [
  {
    title: "GAME DEVELOPMENT",
    items: ["Unity", "C#", "Gameplay Programming", "Physics", "2D & 3D Games", "UI Design"],
  },
  {
    title: "AR / VR",
    items: ["Vuforia", "XR Interaction Toolkit", "iPad AR"],
  },
  {
    title: "QA & TESTING",
    items: ["Manual Testing", "Gameplay Testing", "Bug Identification & Reporting", "Debugging"],
  },
  {
    title: "TOOLS",
    items: ["Unreal Engine", "Git", "GitHub", "Visual Studio", "Blender (Basics)"],
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
      "AR app that overlays 3D models on real objects with Vuforia Model Targets, with a guided Scan, Adjust, Retry, Checklist flow. Tested on iPad.",
    genres: ["Augmented Reality", "Interactive Experience"],
    platforms: ["iOS"],
    engine: "Unity",
    technologies: ["C#", "Vuforia"],
    features: ["AR Interaction", "Model Detection", "UI Systems", "Mobile AR"],
    role: "Unity · AR Development",
    links: [{ label: "GitHub", url: "https://github.com/MichealAugustin" }],
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
    role: "Unity · VR Development",
    links: [{ label: "GitHub", url: "https://github.com/MichealAugustin" }],
    media: towerVrMedia,
    featured: true,
  },
  {
    id: "chess",
    name: "2D & 3D Chess",
    category: "Game",
    description:
      "A Unity chess game with 2D and 3D modes, rule-checked piece movement, turn-based play and UI.",
    genres: ["Strategy", "Board Game", "2D"],
    platforms: ["PC"],
    engine: "Unity",
    technologies: ["C#"],
    features: ["Board System", "Piece Movement", "Game Logic", "UI"],
    role: "Unity · Gameplay Programming",
    links: [{ label: "GitHub", url: "https://github.com/MichealAugustin" }],
    cover: chessMedia[0].source,
    media: chessMedia,
    featured: true,
  },
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    category: "Game",
    description: "A Unity mobile arcade game built around responsive input, obstacles and score tracking.",
    genres: ["Game"],
    platforms: ["Mobile"],
    engine: "Unity",
    technologies: ["C#"],
    features: ["2D Gameplay", "Physics", "Obstacle System", "Score System"],
    role: "Unity · Gameplay Programming",
    links: [{ label: "GitHub", url: "https://github.com/MichealAugustin" }],
    media: [],
    featured: false,
  },
  {
    id: "dino",
    name: "Dino",
    category: "Game",
    description: "A Unity mobile endless runner with obstacle spawning, player movement and game-state logic.",
    genres: ["Game"],
    platforms: ["Mobile"],
    engine: "Unity",
    technologies: ["C#"],
    features: ["Endless Runner", "Player Movement", "Obstacles", "Game Loop"],
    role: "Unity · Gameplay Programming",
    links: [{ label: "GitHub", url: "https://github.com/MichealAugustin" }],
    media: [],
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
