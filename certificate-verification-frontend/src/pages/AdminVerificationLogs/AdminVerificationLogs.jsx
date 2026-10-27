
import "./AdminVerificationLogs.css";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:8081";

function AdminVerificationLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const response = await fetch(
          `${API_URL}/api/verification/logs`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load verification logs (HTTP ${response.status}).`
          );
        }

        const data = await response.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load verification logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...logs]
      .filter((log) => {
        return (
          !query ||
          (log.certificateNumber || "").toLowerCase().includes(query) ||
          (log.verifiedBy || "").toLowerCase().includes(query) ||
          (log.result || "").toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.verifiedAt || 0) -
          new Date(a.verifiedAt || 0)
      );
  }, [logs, search]);

  return (
    <div className="admin-verification-logs">
      <div className="logs-header">
        <div>
          <h1>Verification Logs</h1>
          <p>View the history of certificate verification activities.</p>
        </div>
      </div>

      <div className="logs-search">
        <input
          type="text"
          placeholder="Search by certificate ID or verifier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <p role="alert" style={{ color: "red", padding: "12px" }}>
          {error}
        </p>
      )}

      <div className="logs-table-container">
        <table className="logs-table">
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
                <td colSpan="5">
                  <div className="no-logs">
                    <h3>Loading verification logs...</h3>
                  </div>
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="no-logs">
                    <h3>
                      {logs.length === 0
                        ? "No verification logs"
                        : "No matching logs"}
                    </h3>
                    <p>
                      {logs.length === 0
                        ? "Verification activity will appear here after certificates are checked."
                        : "Try another certificate ID or verifier."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.logId}>
                  <td>{log.certificateNumber || "—"}</td>
                  <td className="verified-hash">
                    {log.verifiedHash || "—"}
                  </td>
                  <td>
                    <span
                      className={`log-result ${
                        log.result === "VERIFIED"
                          ? "verified"
                          : log.result === "CERTIFICATE NOT FOUND"
                          ? "not-found"
                          : "tampered"
                      }`}
                    >
                      {log.result || "—"}
                    </span>
                  </td>
                  <td>{log.verifiedBy || "—"}</td>
                  <td>
                    {log.verifiedAt
                      ? new Date(log.verifiedAt).toLocaleString()
                      : "—"}
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

export default AdminVerificationLogs;
