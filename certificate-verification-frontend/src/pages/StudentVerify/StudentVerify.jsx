
import "./StudentVerify.css";
import { useState } from "react";

function StudentVerify() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setResult(null);

    if (!certificateId.trim() || !certificateFile) {
      setResult({
        type: "error",
        title: "Missing Information",
        message: "Enter a certificate ID and select a PDF file.",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("certificateNumber", certificateId.trim());
      formData.append("certificateFile", certificateFile);

      const response = await fetch(
        "http://localhost:8081/api/verification/verify",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || `Request failed: ${response.status}`
        );
      }

      if (data.result === "VERIFIED") {
        setResult({
          type: "verified",
          title: "VERIFIED",
          message: "The uploaded PDF matches the trusted certificate hash.",
          certificate: data,
        });
      } else if (data.result === "NOT VERIFIED / TAMPERED") {
        setResult({
          type: "tampered",
          title: "NOT VERIFIED / TAMPERED",
          message: "The uploaded PDF does not match the trusted certificate hash.",
          certificate: data,
        });
      } else if (data.result === "CERTIFICATE NOT FOUND") {
        setResult({
          type: "not-found",
          title: "CERTIFICATE NOT FOUND",
          message: "No certificate record was found for this certificate ID.",
        });
      } else {
        throw new Error(data.message || "Unexpected server response.");
      }
    } catch (error) {
      setResult({
        type: "error",
        title: "Verification Error",
        message: error.message || "Could not connect to the backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-verify">
      <div className="student-verify-header">
        <h1>Verify Certificate</h1>
        <p>Enter your certificate ID and upload the certificate PDF.</p>
      </div>

      <div className="verify-card">
        <div className="verify-icon">🔍</div>
        <h2>Certificate Verification</h2>

        <p className="verify-description">
          Verify an academic certificate using SHA-256 hash comparison.
        </p>

        <form onSubmit={handleVerify}>
          <label htmlFor="certificateId">Certificate ID</label>
          <input
            id="certificateId"
            type="text"
            placeholder="e.g. 23CSE001"
            value={certificateId}
            onChange={(e) => {
              setCertificateId(e.target.value);
              setResult(null);
            }}
            required
          />

          <label htmlFor="certificateFile">Certificate PDF</label>
          <input
            id="certificateFile"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              setCertificateFile(e.target.files?.[0] || null);
              setResult(null);
            }}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>

        {result && (
          <div
            className={`verification-response ${result.type}`}
            role="status"
          >
            <h3>{result.title}</h3>
            <p>{result.message}</p>

            {result.certificate && (
              <div className="verification-details">
                <p>
                  <strong>Certificate ID:</strong>{" "}
                  {result.certificate.certificateNumber}
                </p>
                <p>
                  <strong>Student Name:</strong>{" "}
                  {result.certificate.studentName}
                </p>
                <p>
                  <strong>Student ID:</strong>{" "}
                  {result.certificate.studentId}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="verification-info">
        <h3>Verification Results</h3>

        <div className="result-item verified">
          <strong>VERIFIED</strong>
          <span>The uploaded PDF hash matches the trusted record.</span>
        </div>

        <div className="result-item tampered">
          <strong>NOT VERIFIED / TAMPERED</strong>
          <span>The uploaded PDF hash does not match the trusted record.</span>
        </div>

        <div className="result-item not-found">
          <strong>CERTIFICATE NOT FOUND</strong>
          <span>No certificate record was found for the entered ID.</span>
        </div>
      </div>
    </div>
  );
}

export default StudentVerify;
