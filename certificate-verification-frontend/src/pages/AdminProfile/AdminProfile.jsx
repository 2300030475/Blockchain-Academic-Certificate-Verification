import "./AdminProfile.css";

function AdminProfile() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const name = user.name || "Administrator";
  const email = user.email || "Not available";
  const role = user.role || "ADMIN";

  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div className="admin-profile">

      <div className="profile-header">
        <h1>Admin Profile</h1>
        <p>View your administrator account information.</p>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {avatarLetter}
        </div>

        <div className="profile-details">

          <div className="profile-field">
            <label>Name</label>
            <p>{name}</p>
          </div>

          <div className="profile-field">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="profile-field">
            <label>Role</label>
            <p>{role}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;