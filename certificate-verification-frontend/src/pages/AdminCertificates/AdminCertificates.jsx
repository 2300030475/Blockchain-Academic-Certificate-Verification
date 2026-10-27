import "./AdminCertificates.css";
import { useEffect, useState } from "react";

function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    certificateNumber: "",
    studentId: "",
    studentName: "",
    certificateFile: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load certificates from Spring Boot
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/certificates"
        );

        if (!response.ok) {
          throw new Error("Failed to load certificate records.");
        }

        const data = await response.json();

        setCertificates(data);
      } catch (error) {
        console.error("Error loading certificates:", error);
        setError("Unable to load certificate records.");
      }
    };

    loadCertificates();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle PDF selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setError("");
    setMessage("");

    if (!file) {
      setFormData({
        ...formData,
        certificateFile: null
      });
      return;
    }

    // Only PDF files are allowed
    if (file.type !== "application/pdf") {
      setError("Please select a PDF certificate file.");
      e.target.value = "";

      setFormData({
        ...formData,
        certificateFile: null
      });

      return;
    }

    // Limit file size to 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setError("Certificate PDF must be smaller than 10 MB.");
      e.target.value = "";

      setFormData({
        ...formData,
        certificateFile: null
      });

      return;
    }

    setFormData({
      ...formData,
      certificateFile: file
    });
  };

  // Register certificate
  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.certificateFile) {
      setError("Please select the certificate PDF.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append(
        "certificateNumber",
        formData.certificateNumber.trim()
      );

      data.append(
        "studentId",
        formData.studentId.trim()
      );

      data.append(
        "studentName",
        formData.studentName.trim()
      );

      data.append(
        "certificateFile",
        formData.certificateFile
      );

      const response = await fetch(
        "http://localhost:8081/api/certificates",
        {
          method: "POST",
          body: data
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Failed to register certificate."
        );
      }

      const newCertificate = await response.json();

      // Add newly registered certificate to the table
      setCertificates((previous) => [
        ...previous,
        newCertificate
      ]);

      setMessage(
        "Certificate record registered successfully."
      );

      // Clear form
      setFormData({
        certificateNumber: "",
        studentId: "",
        studentName: "",
        certificateFile: null
      });

      // Reset file input
      const fileInput =
        document.getElementById("certificateFile");

      if (fileInput) {
        fileInput.value = "";
      }

      // Close form
      setShowForm(false);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
        "Unable to register certificate."
      );

    } finally {
      setLoading(false);
    }
  };

  // Filter certificates
  const filteredCertificates =
    certificates.filter((certificate) => {

      const searchText = search.toLowerCase();

      return (
        certificate.certificateNumber
          ?.toLowerCase()
          .includes(searchText) ||

        certificate.studentId
          ?.toLowerCase()
          .includes(searchText) ||

        certificate.studentName
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <div className="admin-certificates">

      {/* Header */}
      <div className="certificates-header">

        <div>
          <h1>
            Certificate Records
          </h1>

          <p>
            View and manage academic certificate records.
          </p>
        </div>

        <button
          className="add-certificate-btn"
          onClick={() => {
            setShowForm(true);
            setMessage("");
            setError("");
          }}
        >
          + Register Certificate Record
        </button>

      </div>

      {/* Success Message */}
      {message && (
        <div className="certificate-success">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="certificate-error">
          {error}
        </div>
      )}

      {/* Registration Form */}
      {showForm && (
        <div className="certificate-form-card">

          {/* Form Header */}
          <div className="certificate-form-header">

            <div>
              <h2>
                Register Certificate Record
              </h2>

              <p>
                Enter the certificate details and upload
                the original certificate PDF.
              </p>
            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

          </div>

          {/* Form */}
          <form onSubmit={handleRegister}>

            <div className="certificate-form-grid">

              {/* Certificate Number */}
              <div className="certificate-form-group">

                <label>
                  Certificate Number
                </label>

                <input
                  type="text"
                  name="certificateNumber"
                  placeholder="Example: 23CSE001"
                  value={formData.certificateNumber}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Student ID */}
              <div className="certificate-form-group">

                <label>
                  Student ID
                </label>

                <input
                  type="text"
                  name="studentId"
                  placeholder="Example: 2300030002"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Student Name */}
              <div className="certificate-form-group">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PDF Upload */}
              <div className="certificate-form-group">

                <label>
                  Certificate PDF
                </label>

                <input
                  id="certificateFile"
                  type="file"
                  accept="application/pdf"
                  className="certificate-file-input"
                  onChange={handleFileChange}
                  required
                />

                <p className="file-help-text">
                  PDF only • Maximum size: 10 MB
                </p>

              </div>

              {/* Automatic Generation Information */}
              <div className="auto-generated-box">

                <h4>
                  🔐 Automatic Certificate Processing
                </h4>

                <p>
                  After registration, the system will
                  automatically generate the SHA-256
                  certificate hash, store the PDF on IPFS,
                  obtain the IPFS CID, and use these trusted
                  values for blockchain-based verification.
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="certificate-form-actions">

              <button
                type="button"
                className="cancel-certificate-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-certificate-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Register Certificate"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Search */}
      <div className="certificate-search">

        <input
          type="text"
          placeholder="Search by certificate number or student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Certificate Table */}
      <div className="certificate-table-container">

        <table className="certificate-table">

          <thead>
            <tr>

              <th>
                Certificate Number
              </th>

              <th>
                Student ID
              </th>

              <th>
                Student Name
              </th>

              <th>
                Certificate Hash
              </th>

              <th>
                IPFS CID
              </th>

              <th>
                Created Date
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredCertificates.length === 0 ? (

              <tr>

                <td colSpan="6">

                  <div className="no-certificates">

                    <h3>
                      No certificate records
                    </h3>

                    <p>
                      Certificate records will appear
                      here after they are registered
                      in the system.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              filteredCertificates.map(
                (certificate) => (

                  <tr
                    key={certificate.certificateId}
                  >

                    <td>
                      {certificate.certificateNumber}
                    </td>

                    <td>
                      {certificate.studentId}
                    </td>

                    <td>
                      {certificate.studentName}
                    </td>

                    <td className="hash-cell">
                      {certificate.certificateHash}
                    </td>

                    <td className="cid-cell">
                      {certificate.ipfsCid}
                    </td>

                    <td>
                      {certificate.createdAt
                        ? new Date(
                            certificate.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminCertificates;