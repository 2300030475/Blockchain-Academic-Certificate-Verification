
import "./StudentDashboard.css";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8081";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || "Student";
  const avatarLetter = name.charAt(0).toUpperCase();

  const [certificates, setCertificates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [certResponse, logsResponse] = await Promise.all([
          fetch(`${API_URL}/api/certificates`, { headers }),
          fetch(`${API_URL}/api/verification/logs`, { headers }),
        ]);

        if (!certResponse.ok) {
          throw new Error("Unable to load certificate records.");
        }

        const allCertificates = await certResponse.json();

        // Prefer the logged-in user's student ID.
        // If unavailable, use the user's email only if certificate data
        // actually contains a matching student email field.
        const studentId = user.studentId || user.student_id;

        const ownCertificates = Array.isArray(allCertificates)
          ? allCertificates.filter((certificate) => {
              if (studentId) {
                return String(certificate.studentId) === String(studentId);
              }

              if (user.email && certificate.studentEmail) {
                return (
                  certificate.studentEmail.toLowerCase() ===
                  user.email.toLowerCase()
                );
              }

              return false;
            })
          : [];

        setCertificates(ownCertificates);

        if (logsResponse.ok) {
          const allLogs = await logsResponse.json();

          // VerificationLog currently has no student ID field, so we
          // cannot safely attribute global logs to this student.
          setLogs([]);
        }
      } catch (err) {
        setError(err.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const verifiedCertificateCount = 0;

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <div className="student-logo">
          Certificate Verification
        </div>

        <nav>
          <button
            className="active"
            onClick={() => (window.location.href = "/student-dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => (window.location.href = "/student-certificates")}
          >
            My Certificates
          </button>

          <button
            onClick={() => (window.location.href = "/student-verify")}
          >
            Verify Certificate
          </button>

          <button
            onClick={() => (window.location.href = "/student-profile")}
          >
            Profile
          </button>
        </nav>

        <button
          className="student-logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/student-login";
          }}
        >
          Logout
        </button>
      </aside>

      <main className="student-main">
        <div className="student-header">
          <div>
            <h1>Welcome, {name}</h1>
            <p>
              View your academic certificate records and verification activity.
            </p>
          </div>

          <div className="student-avatar">{avatarLetter}</div>
        </div>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <section className="student-stats">
          <div className="student-stat-card">
            <h3>Total Certificates</h3>
            <p>{loading ? "..." : certificates.length}</p>
          </div>

          <div className="student-stat-card">
            <h3>Verified Certificates</h3>
            <p>{loading ? "..." : verifiedCertificateCount}</p>
          </div>

          <div className="student-stat-card">
            <h3>Verification Attempts</h3>
            <p>{loading ? "..." : logs.length}</p>
          </div>
        </section>

        <section className="student-section">
          <div className="student-section-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="student-actions">
            <button
              onClick={() => (window.location.href = "/student-certificates")}
            >
              <span>📜</span>
              <div>
                <h3>My Certificates</h3>
                <p>View your academic certificate records.</p>
              </div>
            </button>

            <button
              onClick={() => (window.location.href = "/student-verify")}
            >
              <span>🔍</span>
              <div>
                <h3>Verify Certificate</h3>
                <p>Check the authenticity of a certificate.</p>
              </div>
            </button>
          </div>
        </section>

        <section className="student-section">
          <div className="student-section-header">
            <h2>Recent Verification Activity</h2>
          </div>

          <div className="student-empty-state">
            <h3>No student-specific activity available</h3>
            <p>
              Your backend currently stores verification logs globally without
              linking them to a student account.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
