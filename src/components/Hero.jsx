
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data/portfolio";

function Hero() {
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
          <div className="portrait-frame">
            {personalInfo.image ? (
              <img src={personalInfo.image} alt={`${personalInfo.name} profile`} />
            ) : (
              <div className="portrait-fallback" aria-label="Profile image placeholder">
                <span>{personalInfo.initials}</span>
                <small>GAME DEVELOPER</small>
              </div>
            )}
          </div>

          <div className="portrait-caption">
            <span>BASED IN</span>
            <strong>{personalInfo.education.location.split(", ").slice(-2).join(", ")}</strong>
          </div>

          <div className="portrait-decoration" aria-hidden="true">
            GAME / BUILD / REPEAT
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
