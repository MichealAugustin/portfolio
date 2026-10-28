import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { aboutMe, personalInfo } from "../data/portfolio";

function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="section about-section">
      <div className="about-layout">
        <motion.div
          data-scroll-reveal="from-left"
          className="about-photo-frame"
        >
          {aboutMe.photo && !photoFailed ? (
            <img
              src={aboutMe.photo}
              alt="Portrait of Micheal Augustin J"
              width="380"
              height="380"
              loading="eager"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <div
              className="about-photo-placeholder"
              role="img"
              aria-label={`${personalInfo.name} profile photo placeholder`}
            >
              <span>{personalInfo.initials}</span>
              <small>{personalInfo.role}</small>
            </div>
          )}
        </motion.div>

        <motion.div
          data-scroll-reveal="from-right"
          className="about-content"
        >
          <div className="about-eyebrow">
            <span aria-hidden="true" />
            <span>{aboutMe.eyebrow}</span>
          </div>

          <h2 className="about-title">{aboutMe.heading}</h2>

          <div className="about-copy">
            {aboutMe.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-skill-groups">
            {aboutMe.skillGroups.map((group, index) => (
              <div className="about-skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <div
                  className="about-tags"
                  data-scroll-reveal="skill-tag"
                  data-reveal-delay={index * 50}
                >
                  {group.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="about-actions">
            <a
              className="about-button about-button-primary"
              data-scroll-reveal="button"
              data-reveal-delay="0"
              href={aboutMe.cvUri}
              download
            >
              <ArrowDownToLine size={18} aria-hidden="true" />
              Download CV
            </a>
            <a
              className="about-button about-button-secondary"
              data-scroll-reveal="button"
              data-reveal-delay="50"
              href="#contact"
            >
              Contact me
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
