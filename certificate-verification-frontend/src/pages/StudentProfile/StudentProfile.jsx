import "./StudentProfile.css";

function StudentProfile() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const name = user.name || "Student";
  const email = user.email || "Not available";
  const role = user.role || "STUDENT";

  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div className="student-profile">

      <div className="student-profile-header">
        <h1>Student Profile</h1>
        <p>View your account information.</p>
      </div>

      <div className="student-profile-card">

        <div className="student-profile-avatar">
          {avatarLetter}
        </div>

        <div className="student-profile-details">

          <div className="student-profile-field">
            <label>Name</label>
            <p>{name}</p>
          </div>

          <div className="student-profile-field">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="student-profile-field">
            <label>Role</label>
            <p>{role}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;