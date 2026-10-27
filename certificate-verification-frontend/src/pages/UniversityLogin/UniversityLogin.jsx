import "./UniversityLogin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUniversity,
  FaCertificate,
  FaClipboardCheck,
  FaShieldAlt,
} from "react-icons/fa";

function UniversityLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8081/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // Store login information
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      // Go to Admin Dashboard
      navigate("/admin-dashboard");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="student-login-page">

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="login-card">

        {/* Header */}
        <div className="login-header">

          <div className="login-icon university-icon">
            <FaUniversity />
          </div>

          <span className="login-badge university-badge">
            UNIVERSITY PORTAL
          </span>

          <h2>Welcome Administrator</h2>

          <p className="login-subtitle">
            Sign in to securely manage academic certificate records
            and verification activity.
          </p>

        </div>

        {/* Features */}
        <div className="feature-box">

          <div className="feature-item">
            <FaCertificate />
            <span>Certificate Records</span>
          </div>

          <div className="feature-item">
            <FaClipboardCheck />
            <span>Verification Logs</span>
          </div>

          <div className="feature-item">
            <FaShieldAlt />
            <span>Secure Certificate Verification</span>
          </div>

        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>University Email</label>

            <div className="input-box">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Enter university email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label>Password</label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {error}
            </p>
          )}

          <div className="options">

            <label className="remember">

              <input type="checkbox" />

              Remember Me

            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            className="login-btn university-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "University Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Back */}
        <Link
          to="/select-role"
          className="back-link university-link"
        >
          <FaArrowLeft />
          Back to Role Selection
        </Link>

        {/* Footer */}
        <p className="bottom-text">

          Academic certificate verification secured using
          <strong> Blockchain Technology</strong>

        </p>

      </div>

    </section>
  );
}

export default UniversityLogin;