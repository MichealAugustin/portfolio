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
          data-scroll-reveal
          className="section-heading"
        >
          <span>07 / QA & TESTING</span>
          <h2>Making games work as well as they play.</h2>
        </motion.div>

        <div className="qa-intro">
          <motion.div
            data-scroll-reveal="from-left"
          >
            <p>{personalInfo.qaIntro}</p>
          </motion.div>

          <motion.div
            className="qa-label"
            data-scroll-reveal="from-right"
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
                data-scroll-reveal
                data-reveal-delay={index * 60}
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