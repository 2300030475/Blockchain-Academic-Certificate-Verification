import "./Navbar.css";
import logo from "../../assets/images/logo.png";

import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            alt="Blockchain Logo"
            className="logo-image"
          />

          <div className="logo-text">
            <h3>Blockchain</h3>
            <span>Certificate Verification System</span>
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <HiOutlineMenuAlt3 />
      </div>

      {/* Navigation */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <ScrollLink
            to="hero"
            smooth={true}
            duration={600}
            offset={-90}
          >
            Home
          </ScrollLink>
        </li>

        <li>
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            offset={-90}
          >
            About
          </ScrollLink>
        </li>

        <li>
          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={600}
            offset={-90}
          >
            How It Works
          </ScrollLink>
        </li>

        <li>
          <ScrollLink
            to="verify"
            smooth={true}
            duration={600}
            offset={-90}
          >
            Verify Certificate
          </ScrollLink>
        </li>

        <li>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-90}
          >
            Contact
          </ScrollLink>
        </li>

      </ul>

      {/* Buttons */}
      <div className="buttons">

        <Link
          to="/select-role"
          className="login-btn"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="register-btn"
        >
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;