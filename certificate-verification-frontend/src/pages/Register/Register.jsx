
import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserTag,
  FaIdCard,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (role === "Student" && !studentId.trim()) {
      setError("Please enter your official student ID.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    const backendRole =
      role === "Student"
        ? "STUDENT"
        : role === "University"
          ? "ADMIN"
          : "VERIFIER";

    const requestBody = {
      name: name.trim(),
      email: email.trim(),
      password,
      role: backendRole,
    };

    // Send the official student ID for student accounts only.
    if (role === "Student") {
      requestBody.studentId = studentId.trim();
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseText = await response.text();

      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            (typeof data === "string" ? data : "") ||
            (response.status === 409
              ? "Email or student ID is already registered."
              : "Registration failed. Please check the backend.")
        );
      }

      console.log("Registered user:", data);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        if (role === "Student") {
          navigate("/student-login");
        } else if (role === "University") {
          navigate("/admin-login");
        } else {
          navigate("/employer-login");
        }
      }, 1000);
    } catch (err) {
      setError(
        err.message || "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="register-card">
        <div className="register-header">
          <span className="register-badge">CREATE ACCOUNT</span>

          <h2>Join Blockchain Network</h2>

          <p>
            Create your account to securely access the
            certificate verification system.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <label htmlFor="register-name">Full Name</label>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              id="register-name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          {role === "Student" && (
            <>
              <label htmlFor="register-student-id">
                Official Student ID
              </label>

              <div className="input-box">
                <FaIdCard className="input-icon" />
                <input
                  id="register-student-id"
                  type="text"
                  placeholder="Enter your college registration ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </>
          )}

          <label htmlFor="register-email">Email Address</label>

          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              id="register-email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="register-password">Password</label>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="eye"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((previous) => !previous)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="register-confirm-password">
            Confirm Password
          </label>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              id="register-confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="eye"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              onClick={() => setShowConfirm((previous) => !previous)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="register-role">Select Role</label>

          <div className="input-box">
            <FaUserTag className="input-icon" />
            <select
              id="register-role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
              }}
            >
              <option value="Student">Student</option>
              <option value="University">University</option>
              <option value="Employer">Employer</option>
            </select>
          </div>

          <div className="remember">
            <input
              id="register-terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="register-terms">
              I agree to the Terms &amp; Conditions
            </label>
          </div>

          {error && (
            <p role="alert" style={{ color: "#dc2626", fontSize: 14 }}>
              {error}
            </p>
          )}

          {success && (
            <p role="status" style={{ color: "#16a34a", fontSize: 14 }}>
              {success}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="login-text">
          Already have an account? <Link to="/select-role">Login</Link>
        </p>

        <Link to="/" className="back-link">
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default Register;
