import "./HeroSection.css";
import heroImage from "../../assets/images/hero.png";

import {
  FiShield,
  FiLock,
  FiDatabase,
  FiCamera,
} from "react-icons/fi";

import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero" id="hero">

      {/* Left Section */}
      <div className="hero-left">

        <span className="hero-badge">
          🔐 Blockchain Powered Verification
        </span>

        <h1>
          Secure.
          <br />
          <span>Transparent.</span>
          <br />
          Trustworthy.
        </h1>

        <p>
          A blockchain-powered platform to securely verify academic
          certificates using cryptographic hashing, smart contracts,
          decentralized storage and QR-based verification.
        </p>

        <div className="hero-buttons">

          <Link to="/select-role" className="verify-btn">
            <FiShield />
            Verify Certificate
          </Link>

          <a href="#how-it-works" className="work-btn">
            How It Works
            <HiArrowRight />
          </a>

        </div>

        {/* Security & Technology */}
        <div className="hero-features">

          <div className="hero-feature">

            <div className="hero-feature-icon">
              <FiLock />
            </div>

            <div>
              <h3>SHA-256</h3>
              <span>Cryptographic Hashing</span>
            </div>

          </div>


          <div className="hero-feature">

            <div className="hero-feature-icon">
              <FiShield />
            </div>

            <div>
              <h3>Blockchain</h3>
              <span>Trusted Certificate Record</span>
            </div>

          </div>


          <div className="hero-feature">

            <div className="hero-feature-icon">
              <FiDatabase />
            </div>

            <div>
              <h3>IPFS</h3>
              <span>Decentralized PDF Storage</span>
            </div>

          </div>


          <div className="hero-feature">

            <div className="hero-feature-icon">
              <FiCamera />
            </div>

            <div>
              <h3>QR Scan</h3>
              <span>Certificate Identification</span>
            </div>

          </div>

        </div>

      </div>


      {/* Right Section */}
      <div className="hero-right">

        <img
          src={heroImage}
          alt="Blockchain Certificate Verification"
        />

      </div>

    </section>
  );
}

export default HeroSection;