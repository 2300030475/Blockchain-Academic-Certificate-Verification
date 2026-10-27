
import "./StudentCertificates.css";
import { useEffect, useState } from "react";

function StudentCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  const studentName = user.name || "Student";

  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8081/api/certificates",
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load certificates (HTTP ${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The server returned an unexpected certificate list.");
        }

        // Match the logged-in student's ID with the certificate's studentId.
        // If no student ID is available, use the email only if the backend
        // includes a matching studentEmail field in the certificate response.
        const studentId =
          user.studentId ??
          user.student_id ??
          user.studentID ??
          "";

        const userEmail = (user.email || "").trim().toLowerCase();

        const ownCertificates = data.filter((certificate) => {
          if (studentId) {
            return (
              String(certificate.studentId ?? "").trim() ===
              String(studentId).trim()
            );
          }

          if (userEmail && certificate.studentEmail) {
            return (
              certificate.studentEmail.trim().toLowerCase() === userEmail
            );
          }

          return false;
        });

        setCertificates(ownCertificates);
      } catch (err) {
        setError(err.message || "Unable to load certificates.");
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "—"
      : parsedDate.toLocaleDateString();
  };

  return (
    <div className="student-certificates">
      <div className="student-certificates-header">
        <div>
          <h1>My Certificates</h1>
          <p>View your academic certificate records.</p>
        </div>
      </div>

      <div className="student-info-card">
        <div className="student-info-avatar">
          {studentName.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{studentName}</h3>
          <p>{user.email || "Student email"}</p>
        </div>
      </div>

      <div className="student-certificate-table-container">
        <table className="student-certificate-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Certificate Name</th>
              <th>Certificate Hash</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">
                  <div className="student-no-certificates">
                    <h3>Loading certificates...</h3>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5">
                  <div className="student-no-certificates">
                    <h3>Unable to load certificates</h3>
                    <p>{error}</p>
                  </div>
                </td>
              </tr>
            ) : certificates.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="student-no-certificates">
                    <h3>No certificates found</h3>
                    <p>
                      No certificate records are currently linked to your
                      student account.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              certificates.map((certificate) => (
                <tr key={certificate.certificateId}>
                  <td>{certificate.certificateNumber || "—"}</td>
                  <td>
                    {certificate.certificateName ||
                      certificate.certificateNumber ||
                      "Academic Certificate"}
                  </td>
                  <td className="certificate-hash-cell">
                    {certificate.certificateHash || "—"}
                  </td>
                  <td>{formatDate(certificate.createdAt)}</td>
                  <td>
                    {certificate.ipfsCid ? (
                      <a
                        href={`https://beige-rare-gibbon-882.mypinata.cloud/ipfs/${encodeURIComponent(
                          certificate.ipfsCid
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View PDF
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentCertificates;