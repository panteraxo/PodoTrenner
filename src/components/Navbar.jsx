import React, { useEffect, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const links = [
  { href: "#home", label: "Startseite" },
  { href: "#tratements", label: "Unsere Leistungen" },
  { href: "#aboutme", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const navbar = document.getElementById("navbar");

      if (footer && navbar) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerPosition <= windowHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`sticky top-0 z-[1000] w-full py-2 bg-white transition-shadow ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-[5.5rem] flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src="/images/i1.webp" className="h-[5.5rem]" alt="logo" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden sm:flex space-x-6 text-sm font-medium text-gray-700 font-jost">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-1 text-5 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <div className="sm:hidden cursor-pointer" onClick={toggleMenu}>
            {isOpen ? <IoMdClose size="30" /> : <IoMdMenu size="30" />}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-[900] flex flex-col justify-center items-start px-10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            onClick={closeMenu}
            className="flex items-center h-20 border-b-[2px] w-full border-1 text-1 text-3xl font-black transition-all duration-300"
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
    </>
  );
};

export default Navbar;
