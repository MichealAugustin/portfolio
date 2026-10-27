import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { personalInfo } from "../data/portfolio";

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>04 / EXPERIENCE</span>
          <h2>Where I've worked.</h2>
        </motion.div>

        <motion.div
          className="experience-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="experience-icon">
            <Briefcase size={22} />
          </div>

          <div className="experience-content">
            <div className="experience-top">
              <div>
                <span className="experience-type">
                  INTERNSHIP
                </span>

                <h3>{personalInfo.experience.role}</h3>

                <p className="experience-company">
                  {personalInfo.experience.company} · {personalInfo.experience.location}
                </p>
              </div>

              <span className="experience-date">
                AR / VR
              </span>
            </div>

            <p className="experience-description">{personalInfo.experience.description}</p>

            <div className="experience-tags">
              {personalInfo.experience.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;