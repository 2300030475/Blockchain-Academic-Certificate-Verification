import "./Footer.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>Blockchain Verify</h2>

          <p>
            A blockchain-powered platform for issuing,
            storing and verifying academic certificates
            securely and instantly.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>support@blockcertify.com</p>

          <p>+91 98765 43210</p>

          <p>KL University, Andhra Pradesh</p>

        </div>

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a
    href="https://www.linkedin.com/in/karthivani"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <FaLinkedinIn />
  </a>

           <a
               href="https://github.com/KLU2300030475"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="GitHub"
          >
          <FaGithub />
           </a>

            <a href="#">
              <FaEnvelope />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Blockchain Certificate Verification System.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;