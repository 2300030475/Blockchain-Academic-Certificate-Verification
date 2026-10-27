
import { useEffect, useState } from "react";
import "./EmployerHistory.css";
import { FaHistory, FaArrowLeft } from "react-icons/fa";

const API_URL = "http://localhost:8081";

function EmployerHistory() {
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
          throw new Error("Please log in again to view verification history.");
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
            "Your session is expired or you are not authorized. Please log in again."
          );
        }

        if (!response.ok) {
          throw new Error(
            `Failed to fetch verification history (${response.status}).`
          );
        }

        const data = await response.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching verification history:", err);
        setError(err.message || "Could not load verification history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const goTo = (path) => {
    window.location.href = path;
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleString();
  };

  return (
    <div className="employer-history">
      <div className="employer-history-header">
        <div>
          <h1>Verification History</h1>
          <p>View your previous certificate verification activity.</p>
        </div>

        <button
          className="history-back-btn"
          onClick={() => goTo("/employer-dashboard")}
        >
          <FaArrowLeft /> Dashboard
        </button>
      </div>

      <div className="history-card">
        <div className="history-icon">
          <FaHistory />
        </div>

        <h2>Certificate Verification History</h2>

        <p>
          Your certificate verification activities will appear here
          after you verify certificates.
        </p>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Verified Hash</th>
              <th>Result</th>
              <th>Verified By</th>
              <th>Verified At</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading verification history...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5">
                  <div className="no-history">
                    <h3>Unable to Load History</h3>
                    <p>{error}</p>
                    <button onClick={() => goTo("/employer-login")}>
                      Back to Login
                    </button>
                  </div>
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="no-history">
                    <FaHistory />
                    <h3>No Verification History</h3>
                    <p>
                      No verification attempts have been recorded for
                      this account yet.
                    </p>

                    <button onClick={() => goTo("/employer-verify")}>
                      Verify Certificate
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr key={item.logId ?? item.id ?? index}>
                  <td>
                    {item.certificateNumber ??
                      item.certificateId ??
                      "-"}
                  </td>

                  <td className="hash-cell">
                    {item.verifiedHash ??
                      item.certificateHash ??
                      "-"}
                  </td>

                  <td>{item.result ?? "-"}</td>
                  <td>{item.verifiedBy ?? "-"}</td>

                  <td>
                    {formatDate(item.verifiedAt ?? item.createdAt)}
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

export default EmployerHistory;
