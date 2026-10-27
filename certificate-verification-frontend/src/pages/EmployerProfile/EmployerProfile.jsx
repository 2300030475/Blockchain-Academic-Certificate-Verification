import "./EmployerProfile.css";

function EmployerProfile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const name = user.name || "Employer";
  const email = user.email || "Not available";
  const role = user.role || "VERIFIER";
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div className="employer-profile">

      <div className="employer-profile-header">
        <h1>Employer Profile</h1>
        <p>View your Employer / Verifier account information.</p>
      </div>

      <div className="employer-profile-card">

        <div className="employer-profile-avatar">
          {avatarLetter}
        </div>

        <div className="employer-profile-details">

          <div className="employer-profile-field">
            <label>Name</label>
            <p>{name}</p>
          </div>

          <div className="employer-profile-field">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="employer-profile-field">
            <label>Role</label>
            <p>{role}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployerProfile;