import "./RoleSelection.css";

import { useNavigate } from "react-router-dom";

import studentIcon from "../../assets/icons/education.png";
import universityIcon from "../../assets/icons/university-building.png";
import employerIcon from "../../assets/icons/work.png";

function RoleSelection() {

    const navigate = useNavigate();

    const roles = [

        {
            title: "Student",
            description: "Verify & Download Certificates",
            image: studentIcon,
            route: "/student-login"
        },

        {
            title: "University",
            description: "Manage Certificate Records",
            image: universityIcon,
            route: "/admin-login"
        },

        {
            title: "Employer",
            description: "Verify Certificates",
            image: employerIcon,
            route: "/employer-login"
        }

    ];

    return (

        <section className="role-page">

            <div className="role-header">

                <span>LOGIN</span>

                <h1>Select Your Role</h1>

                <p>
                    Choose your account type to securely access
                    the Blockchain Certificate Verification System.
                </p>

            </div>

            <div className="role-grid">

                {roles.map((role) => (

                    <div
                        className="role-card"
                        key={role.title}
                    >

                        <img
                            src={role.image}
                            alt={role.title}
                        />

                        <h3>{role.title}</h3>

                        <p>{role.description}</p>

                        <button
                            onClick={() => navigate(role.route)}
                        >
                            Continue →
                        </button>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default RoleSelection;