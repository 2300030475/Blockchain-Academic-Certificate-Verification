import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import VerificationProcess from "../pages/VerificationProcess/VerificationProcess";

import StudentLogin from "../pages/StudentLogin/StudentLogin";
import UniversityLogin from "../pages/UniversityLogin/UniversityLogin";
import EmployerLogin from "../pages/EmployerLogin/EmployerLogin";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminCertificates from "../pages/AdminCertificates/AdminCertificates";
import AdminVerificationLogs from "../pages/AdminVerificationLogs/AdminVerificationLogs";
import AdminProfile from "../pages/AdminProfile/AdminProfile";

import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import StudentCertificates from "../pages/StudentCertificates/StudentCertificates";
import StudentProfile from "../pages/StudentProfile/StudentProfile";
import StudentVerify from "../pages/StudentVerify/StudentVerify";

import EmployerDashboard from "../pages/EmployerDashboard/EmployerDashboard";
import EmployerVerify from "../pages/EmployerVerify/EmployerVerify";
import EmployerHistory from "../pages/EmployerHistory/EmployerHistory";
import EmployerProfile from "../pages/EmployerProfile/EmployerProfile";
function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Role Selection */}
      <Route
        path="/select-role"
        element={<RoleSelection />}
      />

      {/* Common Login */}
      <Route
        path="/login/:role"
        element={<Login />}
      />

      {/* Registration */}
      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/verification-process"
        element={<VerificationProcess />}
      />

      {/* ============================= */}
      {/* Role-based Login Pages */}
      {/* ============================= */}

      <Route
        path="/student-login"
        element={<StudentLogin />}
      />

      <Route
        path="/employer-profile"
        element={<EmployerProfile />}
      />

      <Route
        path="/admin-login"
        element={<UniversityLogin />}
      />

      <Route
        path="/employer-login"
        element={<EmployerLogin />}
      />


      {/* ============================= */}
      {/* Admin Module */}
      {/* ============================= */}

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin-certificates"
        element={<AdminCertificates />}
      />

      <Route
        path="/admin-verification-logs"
        element={<AdminVerificationLogs />}
      />

      <Route
        path="/admin-profile"
        element={<AdminProfile />}
      />


      {/* ============================= */}
      {/* Student Module */}
      {/* ============================= */}

      <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/student-certificates"
        element={<StudentCertificates />}
      />

      <Route
        path="/student-profile"
        element={<StudentProfile />}
      />

      <Route
        path="/student-verify"
        element={<StudentVerify />}
      />


      {/* ============================= */}
      {/* Employer / Verifier Module */}
      {/* ============================= */}

      <Route
        path="/employer-dashboard"
        element={<EmployerDashboard />}
      />

      <Route
        path="/employer-verify"
        element={<EmployerVerify />}
      />
      <Route
       path="/employer-history"
       element={<EmployerHistory />}
      />


      {/* ============================= */}
      {/* Not Found */}
      {/* ============================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;