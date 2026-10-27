
import { useEffect, useState } from "react";
import "./EmployerDashboard.css";

const API_URL = "http://localhost:8081";

function EmployerDashboard() {
  const [user] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
});

  const name = user.name || "Verifier";
  const avatarLetter = name.charAt(0).toUpperCase();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Your session has expired. Please log in again.");
        }

        const response = await fetch(
          `${API_URL}/api/verification/logs`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "You are not authorized to view verification history. Please log in again."
          );
        }

        if (!response.ok) {
          throw new Error(
            `Could not load verification records (${response.status}).`
          );
        }

        const data = await response.json();

        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Dashboard history error:", err);
        setError(err.message || "Unable to load verification history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const isVerified = (item) =>
    String(item.result || "").trim().toUpperCase() === "VERIFIED";

  const verifiedCount = history.filter(isVerified).length;
  const attemptsCount = history.length;

  const recentHistory = [...history]
    .sort((a, b) => {
      const dateA = new Date(
        a.verifiedAt || a.createdAt || 0
      ).getTime();

      const dateB = new Date(
        b.verifiedAt || b.createdAt || 0
      ).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  const goTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    goTo("/employer-login");
  };

  return (
    <div className="employer-dashboard">
      <aside className="employer-sidebar">
        <div className="employer-logo">
          Certificate Verification
        </div>

        <nav>
          <button
            className="active"
            onClick={() => goTo("/employer-dashboard")}
          >
            Dashboard
          </button>

          <button onClick={() => goTo("/employer-verify")}>
            Verify Certificate
          </button>

          <button onClick={() => goTo("/employer-history")}>
            Verification History
          </button>

          <button onClick={() => goTo("/employer-profile")}>
            Profile
          </button>
        </nav>

        <button
          className="employer-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="employer-main">
        <div className="employer-header">
          <div>
            <h1>Welcome, {name}</h1>
            <p>
              Verify academic certificates securely and view verification activity.
            </p>
          </div>

          <div className="employer-avatar">
            {avatarLetter}
          </div>
        </div>

        <section className="employer-stats">
          <div className="employer-stat-card">
            <h3>Certificates Verified</h3>
            <p>{loading ? "..." : error ? "—" : verifiedCount}</p>
          </div>

          <div className="employer-stat-card">
            <h3>Verification Attempts</h3>
            <p>{loading ? "..." : error ? "—" : attemptsCount}</p>
          </div>

          <div className="employer-stat-card">
            <h3>Verified Results</h3>
            <p>{loading ? "..." : error ? "—" : verifiedCount}</p>
          </div>
        </section>

        <section className="employer-section">
          <div className="employer-section-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="employer-actions">
            <button onClick={() => goTo("/employer-verify")}>
              <span>🔍</span>
              <div>
                <h3>Verify Certificate</h3>
                <p>
                  Check an academic certificate using its certificate ID.
                </p>
              </div>
            </button>

            <button onClick={() => goTo("/employer-history")}>
              <span>📋</span>
              <div>
                <h3>Verification History</h3>
                <p>
                  View your previous certificate verification activity.
                </p>
              </div>
            </button>
          </div>
        </section>

        <section className="employer-section">
          <div className="employer-section-header">
            <h2>Recent Verification Activity</h2>
          </div>

          {loading ? (
            <div className="employer-empty-state">
              <p>Loading verification activity...</p>
            </div>
          ) : error ? (
            <div className="employer-empty-state">
              <p>{error}</p>
            </div>
          ) : recentHistory.length === 0 ? (
            <div className="employer-empty-state">
              <h3>No verification activity yet</h3>
              <p>
                Your certificate verification activity will appear here.
              </p>
            </div>
          ) : (
            <div className="employer-recent-list">
              {recentHistory.map((item, index) => (
                <div
                  className="employer-recent-item"
                  key={item.logId ?? item.id ?? index}
                >
                  <div>
                    <strong>
                      {item.certificateNumber ??
                        item.certificateId ??
                        "Unknown certificate"}
                    </strong>

                    <p>
                      {item.verifiedAt || item.createdAt
                        ? new Date(
                            item.verifiedAt || item.createdAt
                          ).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span
                    className={
                      isVerified(item) ? "verified" : "not-verified"
                    }
                  >
                    {item.result || "Unknown"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default EmployerDashboard;
