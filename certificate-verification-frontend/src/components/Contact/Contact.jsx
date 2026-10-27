import "./Contact.css";
import { Element } from "react-scroll";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <Element name="contact">
      <section className="contact-section" id="contact">

        <div className="contact-title">
          <span>CONTACT US</span>
          <h2>Let's Connect</h2>
          <p>
            Have questions about Blockchain Certificate Verification?
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-container">

          <div className="contact-info">

            <div className="info-box">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>support@blockcertify.com</p>
              </div>
            </div>

            <div className="info-box">
              <FaPhoneAlt />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-box">
              <FaMapMarkerAlt />
              <div>
                <h4>Address</h4>
                <p>KL University, Andhra Pradesh, India</p>
              </div>
            </div>

          </div>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>
    </Element>
  );
}

export default Contact;