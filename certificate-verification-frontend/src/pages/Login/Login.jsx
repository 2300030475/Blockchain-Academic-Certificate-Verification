import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";



function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <section className="login">


      <div className="login-right">

        <span className="login-tag">
          STUDENT PORTAL
        </span>

        <h2>Welcome Back</h2>

        <p>
          Login to securely access your blockchain certificates.
        </p>

        <form>

          <div className="input-box">

            <FaEnvelope />

            <input
              type="email"
              placeholder="Student Email"
            />

          </div>

          <div className="input-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {
                showPassword
                ? <FaEyeSlash />
                : <FaEye />
              }
            </span>

          </div>

          <div className="login-options">

            <label>

              <input type="checkbox" />

              Remember Me

            </label>

            <Link to="/forgot-password">

              Forgot Password?

            </Link>

          </div>

          <button className="login-btn">

            Login →

          </button>

        </form>

        <div className="divider">

          <span>OR</span>

        </div>

        <Link
          className="back-role"
          to="/select-role"
        >

          ← Back to Role Selection

        </Link>

        <p className="register">

          New Student?

          <Link to="/register">

            Register

          </Link>

        </p>

      </div>

    </section>

  );

}

export default Login;