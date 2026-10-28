
import { motion } from "framer-motion";
import { ArrowUpRight, Gamepad2 } from "lucide-react";
import { projects } from "../data/portfolio";
import EngineBadge from "./EngineBadge";
import PlatformTags from "./PlatformTags";

function FeaturedGame() {
  const project = projects.find((item) => item.featured);

  if (!project) return null;

  return (
    <section className="reference-section featured-game" id="featured">
      <div className="reference-container">
        <div className="reference-section-heading" data-scroll-reveal>
          <span className="eyebrow">FEATURED PROJECT</span>
          <h2>A closer look at my work.</h2>
        </div>

        <motion.article
          data-scroll-reveal="featured-game-panel"
          className="featured-game-panel"
        >
          <div className="featured-game-media">
            {project.image ? (
              <img src={project.image} alt={`${project.name} preview`} />
            ) : (
              <div className="featured-game-placeholder">
                <Gamepad2 size={64} strokeWidth={1.2} />
                <span>{project.name.toUpperCase()} · PREVIEW COMING SOON</span>
              </div>
            )}

            <span className="featured-game-label">
              {project.genres[0]}
            </span>
          </div>

          <div className="featured-game-content">
            <span className="eyebrow">
              <EngineBadge engine={project.engine} />
            </span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="featured-game-tags" data-scroll-reveal="skill-tag">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
              <PlatformTags platforms={project.platforms} />
            </div>

            <a
              href="#projects"
              className="reference-button"
              data-scroll-reveal="button"
            >
              Explore all projects
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default FeaturedGame;
