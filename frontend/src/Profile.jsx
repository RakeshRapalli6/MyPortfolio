import { useNavigate } from "react-router-dom"

export const Profile = ({ setIsAuth }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/");
		setIsAuth(false);
		// localStorage.removeItem("isAuth");
		localStorage.setItem("isAuth", "false");
	};

	const handleDash = () => {
		navigate("/dashboard");
	};

	const handlePassReset = () => {
		navigate("/passwordreset");
	};

	return(
		<div className="profile-container">
			<span> Profile </span>
			<div className="profile-body">
				<span className="db" onClick={handleDash}>Dashboard</span>
				<span> Name: Rakesh Rapalli </span>
				<span> DOB: 06/06/1999 </span>
				<span className="reset" onClick={handlePassReset}> Reset Password </span>
				<span className="logout" onClick={handleLogout}>
					Logout
				</span>
			</div>
		</div>
	);
};