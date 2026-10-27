
import "./AdminDashboard.css";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8081";

function AdminDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
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

        if (!logsResponse.ok) {
          throw new Error("Unable to load verification logs.");
        }

        const certData = await certResponse.json();
        const logData = await logsResponse.json();

        setCertificates(Array.isArray(certData) ? certData : []);
        setLogs(Array.isArray(logData) ? logData : []);
      } catch (err) {
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const studentCount = new Set(
    certificates.map((c) => c.studentId).filter(Boolean)
  ).size;

  const verifiedCount = new Set(
    logs
      .filter((log) => log.result === "VERIFIED")
      .map((log) => log.certificateNumber)
      .filter(Boolean)
  ).size;

  const recentLogs = [...logs].sort(
    (a, b) =>
      new Date(b.verifiedAt || 0) - new Date(a.verifiedAt || 0)
  ).slice(0, 5);

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">Certificate Verification</div>

        <nav>
          <button
            className="active"
            onClick={() => (window.location.href = "/admin-dashboard")}
          >
            Dashboard
          </button>
          <button onClick={() => (window.location.href = "/admin-certificates")}>
            Certificates
          </button>
          <button onClick={() => (window.location.href = "/admin-verification-logs")}>
            Verification Logs
          </button>
          <button onClick={() => (window.location.href = "/admin-profile")}>
            Profile
          </button>
        </nav>

        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage academic certificate records and verification activity.</p>
          </div>
        </div>

        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        <section className="admin-stats">
          <div className="stat-card">
            <h3>Total Certificates</h3>
            <p>{loading ? "..." : certificates.length}</p>
          </div>
          <div className="stat-card">
            <h3>Verified Certificates</h3>
            <p>{loading ? "..." : verifiedCount}</p>
          </div>
          <div className="stat-card">
            <h3>Verification Attempts</h3>
            <p>{loading ? "..." : logs.length}</p>
          </div>
          <div className="stat-card">
            <h3>Students</h3>
            <p>{loading ? "..." : studentCount}</p>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-header">
            <h2>Recent Verification Activity</h2>
          </div>

          {loading ? (
            <div className="empty-state"><h3>Loading activity...</h3></div>
          ) : recentLogs.length === 0 ? (
            <div className="empty-state">
              <h3>No verification activity yet</h3>
              <p>Activity will appear after a certificate is checked.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: 12 }}>Certificate ID</th>
                    <th style={{ textAlign: "left", padding: 12 }}>Result</th>
                    <th style={{ textAlign: "left", padding: 12 }}>Verified By</th>
                    <th style={{ textAlign: "left", padding: 12 }}>Verified At</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.map((log) => (
                    <tr key={log.logId}>
                      <td style={{ padding: 12 }}>{log.certificateNumber}</td>
                      <td style={{ padding: 12 }}>{log.result}</td>
                      <td style={{ padding: 12 }}>{log.verifiedBy}</td>
                      <td style={{ padding: 12 }}>
                        {log.verifiedAt
                          ? new Date(log.verifiedAt).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
