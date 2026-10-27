import { motion } from "framer-motion";
import { contact } from "../data/portfolio";

function BrandIcon({ name }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.64-1.24-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.62 1.22 3.26.94.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
        />
      </svg>
    );
  }

  if (name === "itch") {
    return (
      <svg viewBox="0 0 32 24" focusable="false">
        <text
          x="1"
          y="19"
          fill="currentColor"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="-1"
        >
          itch
        </text>
      </svg>
    );
  }

  if (name === "discord") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M19.73 5.06a18.6 18.6 0 0 0-4.58-1.42c-.2.36-.44.85-.6 1.23a17.2 17.2 0 0 0-5.1 0c-.17-.38-.4-.87-.61-1.23a18.5 18.5 0 0 0-4.59 1.43C1.36 9.43.57 13.7.96 17.91a18.4 18.4 0 0 0 5.63 2.89c.45-.61.85-1.27 1.19-1.97a12 12 0 0 1-1.9-.93l.47-.36c3.65 1.7 7.61 1.7 11.22 0 .15.13.31.25.47.37-.61.36-1.25.67-1.91.92.34.7.74 1.36 1.2 1.97a18.3 18.3 0 0 0 5.63-2.89c.46-4.89-.79-9.13-3.23-12.85ZM8.48 14.94c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.12 0 2.02.99 2 2.2 0 1.21-.88 2.2-2 2.2Zm7.04 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.12 0 2.02.99 2 2.2 0 1.21-.88 2.2-2 2.2Z"
        />
      </svg>
    );
  }

  return null;
}

function Contact() {
  const visibleLinks = contact.links.filter(
    (link) =>
      typeof link.url === "string" &&
      link.url.trim() !== "",
  );

  return (
    <section id="contact" className="contact-section">
      <div className="section-container contact-container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="contact-copy">
            <div className="contact-eyebrow">
              <span aria-hidden="true" />
              <span>{contact.eyebrow}</span>
            </div>
            <h2>{contact.heading}</h2>
            <p>{contact.text}</p>
            {contact.phone?.url && (
              <a className="contact-phone" href={contact.phone.url}>
                <span>{contact.phone.label}</span>
                <strong>{contact.phone.number}</strong>
              </a>
            )}
          </div>

          <div className="contact-links" aria-label="Contact links">
            {visibleLinks.map((link) => (
              <a
                className="contact-link-card"
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${link.subtitle}`}
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <BrandIcon name={link.icon} />
                </span>
                <span className="contact-link-copy">
                  <strong>{link.label}</strong>
                  <span>{link.subtitle}</span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;