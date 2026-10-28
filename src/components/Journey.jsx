import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";

function Journey() {
  return (
    <section id="journey" className="section section-alt">
      <div className="section-container">
        <motion.div
          data-scroll-reveal
          className="section-heading"
        >
          <span>06 / JOURNEY</span>
          <h2>From code to interactive experiences.</h2>
        </motion.div>

        <div className="journey">
          {personalInfo.journey.map((item, index) => (
            <motion.div
              data-scroll-reveal={index % 2 === 0 ? "from-left" : "from-right"}
              className="journey-item"
              key={item.number}
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