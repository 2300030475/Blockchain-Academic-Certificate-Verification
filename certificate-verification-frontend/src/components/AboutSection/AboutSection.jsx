import "./AboutSection.css";
import aboutImage from "../../assets/images/about.png";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaLink,
  FaFingerprint,
  FaQrcode,
} from "react-icons/fa";

function AboutSection() {
  return (
    <Element name="about">

      <section className="about" id="about">

        {/* Left Side */}
        <div className="about-left">

          <img
            src={aboutImage}
            alt="Blockchain Certificate Verification"
          />

        </div>


        {/* Right Content */}
        <div className="about-right">

          <span className="about-tag">
            ABOUT OUR PLATFORM
          </span>


          <h2>
            Secure Academic Certificate Verification using Blockchain
          </h2>


          <p>
            Our platform enables students, universities, and employers
            to securely verify academic certificates using blockchain
            technology. Certificate records are protected using
            SHA-256 cryptographic hashing, while QR-based identification
            makes certificate verification simple and reliable.
          </p>


          {/* Project Features */}
          <div className="about-features">

            <div className="feature-item">

              <FaShieldAlt />

              <span>
                Secure Certificate Verification
              </span>

            </div>


            <div className="feature-item">

              <FaLink />

              <span>
                Blockchain-Based Records
              </span>

            </div>


            <div className="feature-item">

              <FaFingerprint />

              <span>
                SHA-256 Tamper Detection
              </span>

            </div>


            <div className="feature-item">

              <FaQrcode />

              <span>
                QR-Based Identification
              </span>

            </div>

          </div>


         <Link
  to="/verification-process"
  className="learn-btn"
>
  Learn More
</Link>

        </div>

      </section>

    </Element>
  );
}

export default AboutSection;