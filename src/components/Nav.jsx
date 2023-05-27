import { useState, useEffect, useRef } from "react";
import IgLogo from "../asset/Ig.png";
// import MenuIcon from "@mui/icons-material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowHamburger(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowMenu(false);
      setShowHamburger(true);
    } else {
      setShowMenu(true);
      setShowHamburger(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="nav">
      <button className="logo">
        <img src={IgLogo} alt="logo" />
      </button>
      <input type="text" className="search" placeholder="search" />

      {showMenu && (
        <nav className="nav-bar">
          <button>
            <i className="fas fa-home"></i>
          </button>
          <button>
            <i className="fas fa-comment"></i>
          </button>
          <button>
            <i className="fas fa-compass"></i>
          </button>
          <button>
            <i className="fas fa-heart"></i>
          </button>
        </nav>
      )}

      {showHamburger && (
        <button className="menu" onClick={toggleMenu}>
          <MenuIcon />
        </button>
      )}
    </div>
  );
};

export default Nav;
