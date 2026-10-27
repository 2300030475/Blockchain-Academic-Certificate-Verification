import "./HowItWorks.css";
import { Element } from "react-scroll";

import {
  FaQrcode,
  FaDatabase,
  FaFingerprint,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  return (
    <Element name="how-it-works">
      <section className="how-section" id="how-it-works">

        <div className="section-title">

          <h2>How It Works</h2>

          <p>
            Secure academic certificate verification using QR codes,
            SHA-256 hashing and blockchain technology.
          </p>

        </div>

        <div className="steps">

          {/* Step 1 */}
          <div className="step-card">

            <FaQrcode className="step-icon" />

            <h3>Scan Certificate QR</h3>

            <p>
              The certificate QR code is scanned to identify the
              certificate record securely.
            </p>

          </div>


          {/* Step 2 */}
          <div className="step-card">

            <FaDatabase className="step-icon" />

            <h3>Retrieve Certificate Record</h3>

            <p>
              The system retrieves the trusted certificate record
              using the certificate ID.
            </p>

          </div>


          {/* Step 3 */}
          <div className="step-card">

            <FaFingerprint className="step-icon" />

            <h3>Compare SHA-256 Hash</h3>

            <p>
              The certificate hash is compared with the trusted
              hash stored on the blockchain.
            </p>

          </div>


          {/* Step 4 */}
          <div className="step-card">

            <FaCheckCircle className="step-icon" />

            <h3>Verification Result</h3>

            <p>
              The system displays VERIFIED, NOT VERIFIED / TAMPERED,
              or CERTIFICATE NOT FOUND.
            </p>

          </div>

        </div>

      </section>
    </Element>
  );
}

export default HowItWorks;