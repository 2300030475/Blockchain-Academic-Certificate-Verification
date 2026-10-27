import "./EmployerVerify.css";
import { useState } from "react";
import {
  FaSearch,
  FaArrowLeft,
  FaShieldAlt,
  FaFilePdf,
} from "react-icons/fa";

function EmployerVerify() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    // Check Certificate ID
    if (!certificateId.trim()) {
      setResult({
        type: "error",
        title: "Certificate ID Required",
        message: "Please enter a certificate ID.",
      });
      return;
    }

    // Check Certificate PDF
    if (!certificateFile) {
      setResult({
        type: "error",
        title: "Certificate PDF Required",
        message: "Please upload the certificate PDF.",
      });
      return;
    }

    // Check PDF file
    if (certificateFile.type !== "application/pdf") {
      setResult({
        type: "error",
        title: "Invalid File",
        message: "Only PDF certificate files are allowed.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append(
        "certificateNumber",
        certificateId.trim()
      );

      formData.append(
        "certificateFile",
        certificateFile
      );

    const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:8081/api/verification/verify",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }
);

      const data = await response.json();

      // Certificate not found
      if (data.result === "CERTIFICATE NOT FOUND") {
        setResult({
          type: "not-found",
          title: "CERTIFICATE NOT FOUND",
          message:
            "No certificate record was found for the entered certificate ID.",
        });

        return;
      }

      // Certificate verified
      if (data.result === "VERIFIED") {
        setResult({
          type: "verified",
          title: "VERIFIED",
          message:
            "The uploaded certificate matches the trusted certificate record.",
          certificate: data,
        });

        return;
      }

      // Certificate tampered / hash mismatch
      if (data.result === "NOT VERIFIED / TAMPERED") {
        setResult({
          type: "tampered",
          title: "NOT VERIFIED / TAMPERED",
          message:
            "The uploaded certificate does not match the trusted certificate hash.",
          certificate: data,
        });

        return;
      }

      // Backend error
      if (!response.ok) {
        throw new Error(
          data.message || "Unable to verify certificate."
        );
      }

      throw new Error("Unexpected verification result.");

    } catch (error) {
      console.error("Verification error:", error);

      setResult({
        type: "error",
        title: "Verification Error",
        message:
          "Unable to connect to the certificate verification server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employer-verify">

      {/* Header */}
      <div className="employer-verify-header">

        <div>
          <h1>Verify Certificate</h1>

          <p>
            Check an academic certificate using its certificate ID.
          </p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => {
            window.location.href = "/employer-dashboard";
          }}
        >
          <FaArrowLeft />
          Dashboard
        </button>

      </div>

      {/* Verification Card */}
      <div className="employer-verify-card">

        <div className="verify-main-icon">
          <FaShieldAlt />
        </div>

        <h2>Certificate Verification</h2>

        <p className="verify-description">
          Enter the certificate ID and upload the certificate PDF
          to verify its authenticity using SHA-256 hash comparison.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleVerify}>

          {/* Certificate ID */}
          <div className="verify-input-group">

            <label htmlFor="certificateId">
              Certificate ID
            </label>

            <div className="verify-input-box">

              <FaSearch className="verify-input-icon" />

              <input
                id="certificateId"
                type="text"
                placeholder="Enter certificate ID"
                value={certificateId}
                onChange={(e) => {
                  setCertificateId(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* Certificate PDF */}
          <div className="verify-input-group">

            <label htmlFor="certificateFile">
              Certificate PDF
            </label>

            <div className="certificate-file-box">

              <FaFilePdf className="certificate-file-icon" />

              <input
                id="certificateFile"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  setCertificateFile(
                    e.target.files[0] || null
                  );
                  setResult(null);
                }}
              />

            </div>

            {certificateFile && (
              <p className="selected-file">
                Selected file: {certificateFile.name}
              </p>
            )}

          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="verify-button"
            disabled={loading}
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <FaSearch />
                Verify Certificate
              </>
            )}
          </button>

        </form>

        {/* Verification Result */}
        {result && (
          <div
            className={`verification-result ${result.type}`}
          >

            <div className="result-title">
              {result.title}
            </div>

            <p>
              {result.message}
            </p>

            {/* Certificate Details */}
            {result.certificate && (
              <div className="certificate-details">

                <div>
                  <span>Certificate ID</span>
                  <strong>
                    {result.certificate.certificateNumber}
                  </strong>
                </div>

                <div>
                  <span>Student ID</span>
                  <strong>
                    {result.certificate.studentId}
                  </strong>
                </div>

                <div>
                  <span>Student Name</span>
                  <strong>
                    {result.certificate.studentName}
                  </strong>
                </div>

                <div>
                  <span>Stored Certificate Hash</span>
                  <strong className="hash-value">
                    {result.certificate.certificateHash}
                  </strong>
                </div>

                <div>
                  <span>Uploaded Certificate Hash</span>
                  <strong className="hash-value">
                    {result.certificate.verifiedHash}
                  </strong>
                </div>

                <div>
                  <span>IPFS CID</span>
                  <strong className="hash-value">
                    {result.certificate.ipfsCid}
                  </strong>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Verification Information */}
      <div className="verification-info">

        <h2>Verification Results</h2>

        <div className="result-info-grid">

          <div className="result-info verified-info">

            <strong>VERIFIED</strong>

            <p>
              The uploaded certificate hash matches the trusted
              certificate record.
            </p>

          </div>

          <div className="result-info tampered-info">

            <strong>NOT VERIFIED / TAMPERED</strong>

            <p>
              The uploaded certificate hash does not match the
              trusted certificate record.
            </p>

          </div>

          <div className="result-info not-found-info">

            <strong>CERTIFICATE NOT FOUND</strong>

            <p>
              No certificate record was found for the entered
              certificate ID.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployerVerify;