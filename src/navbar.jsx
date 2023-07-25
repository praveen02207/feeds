import React, { useState } from "react";
import {CgProfile} from "react-icons/cg"

const fontStyle = { color: "gray", fontSize: "37px" };

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow fixed-top mb-5">
      <div className="container-fluid">
      <CgProfile style={fontStyle} />
        <h2 className="navbar-brand fw-bolder fs-3 ms-2">My Feed</h2>
        
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">Home</li>
            <li className="nav-item">Link</li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
