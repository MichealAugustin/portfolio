import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { personalInfo } from "../data/portfolio";

function GithubSection() {
  return (
    <section id="github" className="section">
      <div className="section-container">
        <motion.div
          data-scroll-reveal
          className="github-panel"
        >
          <div className="github-icon">
            <GitBranch size={30} />
          </div>

          <div className="github-content">
            <span>08 / GITHUB</span>

            <h2>More of my work.</h2>

            <p>{personalInfo.githubText}</p>

            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              data-scroll-reveal="button"
            >
              Visit GitHub
              <ExternalLink size={17} />
            </a>
          </div>

          <div className="github-handle">
            <span>GITHUB</span>
            <strong>@{personalInfo.links.github.split("/").filter(Boolean).pop()}</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GithubSection;