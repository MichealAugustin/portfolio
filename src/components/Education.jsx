import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { personalInfo } from "../data/portfolio";

function Education() {
  return (
    <section id="education" className="section">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>05 / EDUCATION</span>
          <h2>Building the foundation.</h2>
        </motion.div>

        <motion.div
          className="education-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="education-icon">
            <GraduationCap size={26} />
          </div>

          <div className="education-content">
            <span>MASTER'S DEGREE</span>

            <h3>{personalInfo.education.degree}</h3>

            <p>{personalInfo.education.institution}</p>

            <p className="education-location">{personalInfo.education.location}</p>

            <div className="education-period">{personalInfo.education.period}</div>

            <div className="education-topics">
              {personalInfo.education.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;