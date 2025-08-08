import React, { useEffect, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = ({
  home,
  services,
  about,
  contact,
  faq,
  languages,
  currentLang,
  languageLabel,
}) => {
  const links = [
    { href: "#home", label: home },
    { href: "#tratements", label: services },
    { href: "#aboutme", label: about },
    { href: "#contact", label: contact },
    { href: "#faq", label: faq },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState("/");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Función para manejar el cambio de idioma
  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;

    // Tomamos hash actual si existe (#aboutme, etc.)
    const currentHash = window.location.hash;

    // Cambiamos solo el prefijo de idioma en el pathname
    const newPath = window.location.pathname.replace(
      /^\/(de|en|es|it)/,
      `/${selectedLang}`
    );

    // Redirigimos manteniendo hash
    window.location.href = newPath + currentHash;
  };

  // Función para generar href dinámico
  const getHref = (originalHref) => {
    // Si el href es un ancla (#aboutme, etc.), lo unimos con el idioma actual
    if (originalHref.startsWith("#")) {
      return `/${currentLang}${originalHref}`;
    }
    return originalHref;
  };

  // Función para determinar el color del navbar
  const getNavbarClasses = () => {
    const pagesWithDifferentNavbar = ["/impressum", "/datenschutz"];
    const isDifferentPage = pagesWithDifferentNavbar.includes(currentPath);

    const baseClasses = `sticky top-0 z-[1000] w-full py-2 transition-shadow ${
      isVisible ? "opacity-100" : "opacity-0 hidden"
    }`;

    const bgClasses = isDifferentPage ? "bg-1" : "bg-white";

    return `${baseClasses} ${bgClasses}`;
  };

  // Función para determinar el color de los enlaces
  const getLinkClasses = () => {
    const pagesWithDifferentNavbar = ["/impressum", "/datenschutz"];
    const isDifferentPage = pagesWithDifferentNavbar.includes(currentPath);

    return isDifferentPage
      ? "hover:text-white text-gray-100 transition-colors duration-200"
      : "hover:text-1 text-5 transition-colors duration-200";
  };

  // Función para determinar el color del ícono móvil
  const getIconColor = () => {
    const pagesWithDifferentNavbar = ["/impressum", "/datenschutz"];
    const isDifferentPage = pagesWithDifferentNavbar.includes(currentPath);

    return isDifferentPage ? "white" : "black";
  };
  useEffect(() => {
    // Actualizar la ruta actual cuando el componente se monta
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const navbar = document.getElementById("navbar");

      // Si estamos en páginas específicas, mantener el navbar siempre visible
      const pagesWithPersistentNavbar = ["/impressum", "/datenschutz"];
      const shouldAlwaysShow = pagesWithPersistentNavbar.includes(currentPath);

      if (shouldAlwaysShow) {
        setIsVisible(true);
        return;
      }

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
  }, [currentPath]);

  return (
    <>
      <nav id="navbar" className={getNavbarClasses()}>
        <div className="max-w-7xl mx-auto px-4 h-[5.5rem] flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src="/images/i1.webp" className="h-[5.5rem]" alt="logo" />
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center space-x-6">
            <ul className="flex space-x-6 text-sm font-medium font-jost">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={getHref(link.href)} className={getLinkClasses()}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Language selector */}
            {languages && (
              <select
                id="lang-select"
                value={currentLang}
                onChange={handleLanguageChange}
                className={`text-sm font-medium font-jost border rounded px-2 py-1 ${
                  getNavbarClasses().includes("bg-1")
                    ? "bg-1 text-white border-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="sm:hidden cursor-pointer" onClick={toggleMenu}>
            {isOpen ? (
              <IoMdClose size="30" color={getIconColor()} />
            ) : (
              <IoMdMenu size="30" color={getIconColor()} />
            )}
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
            href={getHref(link.href)}
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

        {/* Language selector for mobile */}
        {languages && (
          <div className="mt-8 w-full">
            <label className="block text-1 text-xl font-bold mb-2">
              {languageLabel}
            </label>
            <select
              id="lang-select-mobile"
              value={currentLang}
              onChange={handleLanguageChange}
              className="w-full text-lg font-medium border-2 border-1 rounded px-4 py-2 bg-white text-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
