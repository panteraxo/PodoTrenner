import React, { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Startseite" },
  { href: "#tratements", label: "Unsere Leistungen" },
  { href: "#aboutme", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
  { href: "#faq", label: "FAQ" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (e) => {
      setIsOpen(e.detail);
    };

    window.addEventListener("toggle-menu", handleToggle);
    return () => window.removeEventListener("toggle-menu", handleToggle);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-menu", { detail: false }));
  };

  return (
    <div
      id="menu"
      className={`fixed inset-0 bg-white z-[900] flex flex-col justify-center items-start px-10 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          onClick={handleLinkClick}
          className="flex items-center h-20 border-b-[2px] w-full border-1 text-1 text-3xl font-black transition-opacity duration-500"
          style={{
            transitionDelay: isOpen ? `${i * 100}ms` : "0ms",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateX(0)" : "translateX(50px)",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default MobileMenu;
