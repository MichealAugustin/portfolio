import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>02 / SKILLS</span>
          <h2>Tools I use to build interactive experiences.</h2>
        </motion.div>

        <div className="skills-grid">
          {skills.map((category, index) => (
            <motion.div
              className="skill-group"
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <h3>{category.title}</h3>

              <div className="skill-list">
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