import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";

function Journey() {
  return (
    <section id="journey" className="section section-alt">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>06 / JOURNEY</span>
          <h2>From code to interactive experiences.</h2>
        </motion.div>

        <div className="journey">
          {personalInfo.journey.map((item, index) => (
            <motion.div
              className="journey-item"
              key={item.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="journey-number">
                {item.number}
              </div>

              <div className="journey-line" />

              <div className="journey-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journey;