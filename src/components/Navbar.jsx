import { useState } from "react";
import { Menu, X } from "lucide-react";
import { personalInfo } from "../data/portfolio";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="logo" aria-label="Micheal Augustin J, home">
          {personalInfo.initials}<span>.</span>
        </a>

        <nav id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
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