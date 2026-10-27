
import "./StudentLogin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserGraduate,
} from "react-icons/fa";

function StudentLogin() {
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
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Invalid email or password."
        );
      }

      if (data.role?.toUpperCase() !== "STUDENT") {
        throw new Error(
          "This account is not registered as a Student."
        );
      }

      if (!data.token) {
        throw new Error(
          "The authentication token was not returned by the server."
        );
      }

      // Save authentication token
      localStorage.setItem("token", data.token);

      // Save the user information returned by Spring Boot
      const loggedInUser = {
        userId: data.userId ?? data.id ?? null,
        studentId:
          data.studentId ?? data.student_id ?? null,
        name: data.name || "",
        email: data.email || email.trim(),
        role: data.role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      // Navigate after successful login
      navigate("/student-dashboard", { replace: true });

    } catch (err) {
      setError(
        err.message || "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="student-login-page">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <FaUserGraduate />
          </div>

          <span className="login-badge">
            STUDENT PORTAL
          </span>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to continue to your Blockchain Certificate Dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="student-email">
              Email Address
            </label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                id="student-email"
                type="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="student-password">
              Password
            </label>

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                id="student-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="eye"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
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
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Student Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <Link to="/select-role" className="back-link">
          <FaArrowLeft />
          Back to Role Selection
        </Link>

        <p className="bottom-text">
          Secure authentication powered by
          <strong> Blockchain Technology</strong>
        </p>
      </div>
    </section>
  );
}

export default StudentLogin;
