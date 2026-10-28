import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="section-container">
        <motion.div
          data-scroll-reveal
          className="section-heading"
        >
          <span>02 / SKILLS</span>
          <h2>Tools I use to build interactive experiences.</h2>
        </motion.div>

        <div className="skills-grid">
          {skills.map((category, index) => (
            <motion.div
              className="skill-group"
              key={category.title}
              data-scroll-reveal
              data-reveal-delay={index * 50}
            >
              <h3>{category.title}</h3>

              <div
                className="skill-list"
                data-scroll-reveal="skill-tag"
                data-reveal-delay={index * 50}
              >
                {category.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;