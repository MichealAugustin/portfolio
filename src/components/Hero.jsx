
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Dices,
  Headset,
  Heart,
  Joystick,
  Star,
  Sword,
} from "lucide-react";
import { heroConfig, personalInfo } from "../data/portfolio";

const orbitingArtwork = [
  { name: "joystick", size: 66, left: "16%", top: "21%", speed: 5.2, phase: "-1.2s", depth: 1.15, rotate: true },
  { name: "cube", size: 54, left: "78%", top: "24%", speed: 6.4, phase: "-3.1s", depth: 0.78, rotate: true },
  { name: "headset", size: 48, left: "83%", top: "65%", speed: 5.7, phase: "-2s", depth: 0.9, rotate: false },
  { name: "dice", size: 42, left: "20%", top: "75%", speed: 7.1, phase: "-4.3s", depth: 1.05, rotate: true },
  { name: "heart", size: 34, left: "51%", top: "12%", speed: 4.8, phase: "-0.7s", depth: 1.2, rotate: false },
  { name: "star", size: 28, left: "49%", top: "87%", speed: 6.8, phase: "-2.6s", depth: 1.3, rotate: true },
  { name: "sword", size: 25, left: "11%", top: "49%", speed: 5.9, phase: "-3.7s", depth: 1.35, rotate: true },
];

const artworkIcons = {
  joystick: Joystick,
  cube: Box,
  headset: Headset,
  dice: Dices,
  heart: Heart,
  star: Star,
  sword: Sword,
};

const sparkles = [
  { left: "34%", top: "18%", delay: "-1s" },
  { left: "66%", top: "18%", delay: "-2.4s" },
  { left: "33%", top: "81%", delay: "-3.2s" },
  { left: "71%", top: "78%", delay: "-0.6s" },
  { left: "11%", top: "33%", delay: "-1.8s" },
  { left: "89%", top: "43%", delay: "-2.8s" },
  { left: "57%", top: "30%", delay: "-0.2s" },
  { left: "41%", top: "69%", delay: "-1.4s" },
];

function GamepadIllustration() {
  return (
    <svg
      className="gamepad-art"
      viewBox="0 0 240 180"
      fill="none"
      role="img"
      aria-label="Glowing purple and cyan game controller"
    >
      <defs>
        <linearGradient id="gamepad-gradient" x1="30" y1="26" x2="202" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="gamepad-glow" x="-35%" y="-45%" width="170%" height="190%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.28 0 1 0 0 0.16 0 0 1 0 0.8 0 0 0 0.45 0" />
          <feBlend in="SourceGraphic" mode="screen" />
        </filter>
      </defs>
      <g filter="url(#gamepad-glow)" stroke="url(#gamepad-gradient)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M66 54c5-13 15-21 27-21h54c12 0 22 8 27 21l24 61c8 20-12 38-30 27l-30-19H102l-30 19c-18 11-38-7-30-27l24-61Z"
          fill="#111626"
          fillOpacity=".9"
          strokeWidth="5"
        />
        <path d="M82 72v35m-17-17h35" strokeWidth="7" />
        <circle cx="156" cy="77" r="6" fill="#38bdf8" strokeWidth="2" />
        <circle cx="174" cy="94" r="6" fill="#8b5cf6" strokeWidth="2" />
        <circle cx="138" cy="94" r="6" fill="#8b5cf6" strokeWidth="2" />
        <circle cx="156" cy="111" r="6" fill="#38bdf8" strokeWidth="2" />
        <path d="M102 129h36M111 140h18" strokeWidth="3" opacity=".8" />
      </g>
    </svg>
  );
}

function HeroArtwork({ onMouseMove, onMouseLeave, isVisible, mode, onImageError }) {
  const imageSource = `${import.meta.env.BASE_URL}images/profile/Cartoon.png`;
  const fallbackSource = `${import.meta.env.BASE_URL}images/profile/Profile.jpg`;
  const [useProfileFallback, setUseProfileFallback] = useState(false);
  if (mode === "profile") {
    return (
      <div
        className="portrait-frame portrait-frame-profile"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-visible={isVisible}
      >
        <svg className="artwork-filter-defs" aria-hidden="true">
          <defs>
            <filter id="subtle-cartoon">
              <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0 .18 .42 .68 .86 1" />
                <feFuncG type="discrete" tableValues="0 .18 .42 .68 .86 1" />
                <feFuncB type="discrete" tableValues="0 .18 .42 .68 .86 1" />
              </feComponentTransfer>
              <feColorMatrix type="saturate" values="1.25" result="posterized" />
              <feConvolveMatrix
                in="posterized"
                order="3"
                kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
                result="edges"
              />
              <feComponentTransfer in="edges" result="outline">
                <feFuncA type="linear" slope=".28" intercept=".5" />
              </feComponentTransfer>
              <feBlend in="posterized" in2="outline" mode="multiply" />
            </filter>
          </defs>
        </svg>
        <div className="profile-art-parallax">
          <img
            className={`profile-art-image${useProfileFallback ? " profile-art-filtered" : ""}`}
            src={useProfileFallback ? fallbackSource : imageSource}
            alt={`${personalInfo.name} profile`}
            onError={() => {
              if (!useProfileFallback) {
                setUseProfileFallback(true);
              } else {
                onImageError();
              }
            }}
          />
        </div>
        <div className="portrait-label">GAME DEVELOPER</div>
        <div className="portrait-decoration" aria-hidden="true">GAME / BUILD / REPEAT</div>
      </div>
    );
  }

  return (
    <div
      className="portrait-frame portrait-frame-artwork"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-visible={isVisible}
    >
      <svg className="artwork-definitions" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-gradient">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      {sparkles.map((sparkle, index) => (
        <span
          className="artwork-sparkle"
          key={`sparkle-${index}`}
          style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay }}
        />
      ))}
      <div className="gamepad-parallax">
        <div className="gamepad-float">
          <GamepadIllustration />
        </div>
      </div>
      {orbitingArtwork.map((icon) => {
        const Icon = artworkIcons[icon.name];
        return (
          <div
            className="game-icon-parallax"
            key={icon.name}
            style={{
              left: icon.left,
              top: icon.top,
              "--icon-size": `${icon.size}px`,
              "--float-duration": `${icon.speed}s`,
              "--float-delay": icon.phase,
              "--icon-depth": icon.depth,
            }}
            data-size={icon.size}
          >
            <div className="game-icon-float">
              <Icon
                className={icon.rotate ? "game-icon-rotating" : ""}
                size={icon.size}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>
          </div>
        );
      })}
      <div className="portrait-label">GAME DEVELOPER</div>
      <div className="portrait-decoration" aria-hidden="true">GAME / BUILD / REPEAT</div>
    </div>
  );
}

function Hero() {
  const artworkRef = useRef(null);
  const pointerFrameRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const [artworkVisible, setArtworkVisible] = useState(true);
  const [profileFailed, setProfileFailed] = useState(false);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setArtworkVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(artwork);

    return () => observer.disconnect();
  }, []);

  const handleArtworkMouseMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };
    if (pointerFrameRef.current) return;

    const updatePointer = () => {
      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      const frame = artworkRef.current;
      if (frame) {
        frame.style.setProperty("--pointer-x", `${current.x}`);
        frame.style.setProperty("--pointer-y", `${current.y}`);
      }
      if (Math.abs(target.x - current.x) > 0.002 || Math.abs(target.y - current.y) > 0.002) {
        pointerFrameRef.current = window.requestAnimationFrame(updatePointer);
      } else {
        pointerFrameRef.current = 0;
      }
    };
    pointerFrameRef.current = window.requestAnimationFrame(updatePointer);
  };

  const handleArtworkMouseLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    handleArtworkMouseMove({
      currentTarget: artworkRef.current,
      clientX: artworkRef.current.getBoundingClientRect().left + artworkRef.current.clientWidth / 2,
      clientY: artworkRef.current.getBoundingClientRect().top + artworkRef.current.clientHeight / 2,
    });
  };

  useEffect(() => () => {
    window.cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  const socials = [
    { label: "GitHub", url: personalInfo.links.github },
    { label: "LinkedIn", url: personalInfo.links.linkedin },
    {
      label: "Email",
      url: personalInfo.links.email
        ? `mailto:${personalInfo.links.email}`
        : "",
    },
  ].filter((item) => item.url);

  return (
    <section className="reference-hero" id="home">
      <div className="reference-container reference-hero-grid">
        <motion.div
          className="reference-hero-copy"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="reference-role">
            <span className="status-dot" />
            {personalInfo.role}
          </span>

          <h1>
            {personalInfo.headline}.{" "}
            <span>{personalInfo.headlineHighlight}</span>
          </h1>

          <p className="reference-hero-intro">{personalInfo.introduction}</p>

          <div className="reference-hero-actions">
            <a href="#projects" className="reference-button">
              See my projects
              <ArrowUpRight size={17} />
            </a>

            <a
              href={personalInfo.cvUrl}
              className="reference-button reference-button-ghost"
              download
            >
              Download CV
            </a>

            <a href="#contact" className="reference-button reference-button-ghost">
              Get in touch
            </a>
          </div>

          <div className="reference-socials">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.url.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {social.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>

          <div className="reference-stats">
            {personalInfo.heroStats.map((stat) => (
              <div key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="reference-hero-portrait"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <div ref={artworkRef} className="hero-artwork">
            <HeroArtwork
              mode={heroConfig.artwork === "profile" && !profileFailed ? "profile" : "icons"}
              isVisible={artworkVisible}
              onMouseMove={handleArtworkMouseMove}
              onMouseLeave={handleArtworkMouseLeave}
              onImageError={() => setProfileFailed(true)}
            />
          </div>
        </motion.div>
      </div>

      <a href="#featured" className="reference-scroll">
        Discover my work
        <ArrowDown size={15} />
      </a>
    </section>
  );
}

export default Hero;
