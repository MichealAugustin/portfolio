import { personalInfo } from "../data/portfolio";
import BrandMark from "./BrandMark";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong className="footer-brand"><BrandMark /></strong>
          <p>{personalInfo.role} • Unity • AR/VR</p>
        </div>

        <div>
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          {personalInfo.links.linkedin && (
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}

          <a href="#home">Back to top ↑</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {personalInfo.name}
        </span>

        <span>Built with React + Vite</span>
      </div>
    </footer>
  );
}

export default Footer;