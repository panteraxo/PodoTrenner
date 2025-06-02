import React from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Toogle = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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

export default Toogle;
