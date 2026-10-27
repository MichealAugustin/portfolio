import { motion } from "framer-motion";
import {
  Bug,
  CheckCircle,
  Search,
  RotateCcw,
  ClipboardCheck,
  Wrench,
} from "lucide-react";
import { personalInfo } from "../data/portfolio";

const testingIcons = [Search, Bug, CheckCircle, RotateCcw, ClipboardCheck, Wrench];

function QASection() {
  return (
    <section id="qa" className="section section-alt">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>07 / QA & TESTING</span>
          <h2>Making games work as well as they play.</h2>
        </motion.div>

        <div className="qa-intro">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>{personalInfo.qaIntro}</p>
          </motion.div>

          <motion.div
            className="qa-label"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span>ADDITIONAL STRENGTH</span>
            <strong>DEVELOPMENT + QUALITY</strong>
          </motion.div>
        </div>

        <div className="qa-grid">
          {personalInfo.qaSkills.map((item, index) => {
            const Icon = testingIcons[index];

            return (
              <motion.div
                className="qa-card"
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="qa-icon">
                  <Icon size={20} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QASection;