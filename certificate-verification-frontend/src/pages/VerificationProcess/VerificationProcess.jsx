import "./VerificationProcess.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  FaQrcode,
  FaCamera,
  FaServer,
  FaFingerprint,
  FaLink,
  FaCheckCircle,
  FaQuestionCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function VerificationProcess() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="verification-process-page">

        {/* Header */}

        <section className="process-page-header">

          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft />
            Back to Home
          </button>

          <span className="process-page-badge">
            COMPLETE VERIFICATION PROCESS
          </span>

          <h1>
            How Certificate Verification Takes Place
          </h1>

          <p>
            Learn how our blockchain-based academic certificate
            verification system checks a certificate from QR scanning
            to the final verification result.
          </p>

        </section>


        {/* Process */}

        <section className="process-page-section">

          <div className="process-page-title">

            <h2>
              Certificate Verification Process
            </h2>

            <p>
              The system follows these steps to verify an academic
              certificate securely.
            </p>

          </div>


          <div className="process-page-flow">

            {/* Step 1 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaQrcode />
              </div>

              <span>01</span>

              <h3>
                Scan Certificate QR
              </h3>

              <p>
                The QR code printed on the academic certificate
                is scanned to identify the certificate.
              </p>

            </div>


            {/* Step 2 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaCamera />
              </div>

              <span>02</span>

              <h3>
                Capture Certificate ID
              </h3>

              <p>
                The ESP32-CAM with OV2640 captures the QR code
                and obtains the certificate ID.
              </p>

            </div>


            {/* Step 3 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaServer />
              </div>

              <span>03</span>

              <h3>
                Retrieve Certificate Record
              </h3>

              <p>
                The certificate ID is sent to the Spring Boot
                backend to retrieve the certificate record.
              </p>

            </div>


            {/* Step 4 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaFingerprint />
              </div>

              <span>04</span>

              <h3>
                Compare SHA-256 Hash
              </h3>

              <p>
                The certificate hash is compared with the
                trusted hash associated with the certificate record.
              </p>

            </div>


            {/* Step 5 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaLink />
              </div>

              <span>05</span>

              <h3>
                Check Blockchain Record
              </h3>

              <p>
                The trusted certificate hash is checked against
                the blockchain record.
              </p>

            </div>


            {/* Step 6 */}

            <div className="process-page-card">

              <div className="process-page-icon">
                <FaCheckCircle />
              </div>

              <span>06</span>

              <h3>
                Display Verification Result
              </h3>

              <p>
                The system displays the appropriate certificate
                verification result.
              </p>

            </div>

          </div>

        </section>


        {/* Verification Results */}

        <section className="results-section">

          <div className="process-page-title">

            <h2>
              Verification Results
            </h2>

            <p>
              The system provides one of the following results.
            </p>

          </div>


          <div className="results-grid">

            <div className="result-card verified">

              <FaCheckCircle />

              <h3>
                VERIFIED
              </h3>

              <p>
                The certificate record and trusted hash match.
              </p>

            </div>


            <div className="result-card tampered">

              <FaFingerprint />

              <h3>
                NOT VERIFIED / TAMPERED
              </h3>

              <p>
                Certificate information does not match the
                trusted certificate record.
              </p>

            </div>


            <div className="result-card not-found">

              <FaQuestionCircle />

              <h3>
                CERTIFICATE NOT FOUND
              </h3>

              <p>
                No certificate record was found for the
                entered certificate ID.
              </p>

            </div>

          </div>

        </section>


        {/* FAQ */}

        <section className="faq-section">

          <div className="process-page-title">

            <FaQuestionCircle className="faq-main-icon" />

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Common questions about certificate verification.
            </p>

          </div>


          <div className="faq-grid">

            <div className="faq-card">

              <h3>
                What is blockchain used for?
              </h3>

              <p>
                Blockchain stores the trusted certificate hash
                used during certificate verification.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                What is SHA-256?
              </h3>

              <p>
                SHA-256 is a cryptographic hashing algorithm used
                to generate a unique hash for certificate data.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                How does QR verification work?
              </h3>

              <p>
                The QR code contains the certificate ID used to
                retrieve the corresponding certificate record.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                What happens if the certificate is not found?
              </h3>

              <p>
                The system displays CERTIFICATE NOT FOUND when
                no matching certificate record exists.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                What does NOT VERIFIED / TAMPERED mean?
              </h3>

              <p>
                It means the certificate information does not
                match the trusted certificate record.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                Who can verify certificates?
              </h3>

              <p>
                Students and employers can use the system to
                verify academic certificates.
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default VerificationProcess;