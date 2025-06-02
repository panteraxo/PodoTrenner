import React, { useEffect, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => {
      const menu = document.getElementById("menu");
      if (menu) {
        if (!prevState) {
          menu.classList.remove("translate-x-full");
          menu.classList.add("translate-x-0");
        } else {
          menu.classList.add("translate-x-full");
          menu.classList.remove("translate-x-0");
        }
      }
      return !prevState;
    });
  };

  useEffect(() => {
    const handleLinkClick = () => {
      setIsMenuOpen(false);
      const menu = document.getElementById("menu");
      if (menu) {
        menu.classList.add("translate-x-full");
        menu.classList.remove("translate-x-0");
      }
    };

    const links = document.querySelectorAll("#menu a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <div onClick={toggleMenu} className="cursor-pointer lg:hidden">
      {isMenuOpen ? (
        <IoMdClose size="30" color="black" />
      ) : (
        <IoMdMenu size="30" color="black" />
      )}
    </div>
  );
};

export default HamburgerMenu;
