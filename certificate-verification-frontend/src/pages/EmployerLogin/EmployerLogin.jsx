import "./EmployerLogin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaBriefcase,
  FaCheckCircle,
  FaSearch,
  FaFileAlt,
} from "react-icons/fa";

function EmployerLogin() {

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

      // Make sure this account is a Verifier account
      if (data.role !== "VERIFIER") {
        throw new Error(
          "This account is not registered as an Employer / Verifier."
        );
      }

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Store logged-in employer information
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      // Open Employer Dashboard
      navigate("/employer-dashboard");

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

          <div className="login-icon employer-icon">
            <FaBriefcase />
          </div>

          <span className="login-badge employer-badge">
            EMPLOYER PORTAL
          </span>

          <h2>Welcome Employer</h2>

          <p className="login-subtitle">
            Sign in to verify candidate certificates securely using
            blockchain technology.
          </p>

        </div>

        {/* Features */}

        <div className="feature-box">

          <div className="feature-item">
            <FaSearch />
            <span>Verify Certificates</span>
          </div>

          <div className="feature-item">
            <FaCheckCircle />
            <span>Check Certificate Records</span>
          </div>

          <div className="feature-item">
            <FaFileAlt />
            <span>View Verification History</span>
          </div>

        </div>

        {/* Login Form */}

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Company Email</label>

            <div className="input-box">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Enter company email"
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
            className="login-btn employer-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Employer Login"}
          </button>

        </form>

        <div className="divider">

          <span>OR</span>

        </div>

        <Link
          to="/select-role"
          className="back-link employer-link"
        >

          <FaArrowLeft />

          Back to Role Selection

        </Link>

        <p className="bottom-text">

          Employer verification powered by
          <strong> Blockchain Technology</strong>

        </p>

      </div>

    </section>
  );
}

export default EmployerLogin;