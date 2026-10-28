import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";
import {
  markUserNavigation,
  scrollToSection,
} from "./scrollRevealAnimation";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    let frame = 0;

    const updateActiveLink = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const navHeight = document.querySelector(".navbar").getBoundingClientRect().height;
        const links = [...document.querySelectorAll(".nav-links a")];
        let activeItem;

        links.forEach((link) => {
          const section = document.querySelector(link.hash);
          if (section && section.getBoundingClientRect().top <= navHeight + 24) {
            activeItem = link;
          }
        });

        setActiveHref(activeItem?.hash ?? "");
      });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    event.currentTarget.blur();
    markUserNavigation();
    const href = event.currentTarget.hash;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
    setOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(target));
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="logo" aria-label="RegiMc21, home">
          <BrandMark />
        </a>

        <nav id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={handleClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;