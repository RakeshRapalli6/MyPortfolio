import { useNavigate, Outlet } from "react-router-dom";
import profile from './Profile.png'


export const Dashboard = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");
	// console.log(username);

	const handleProfile = () => {
		navigate("/profile");
	};


	return(
		<div className="Dash-board-container"> 
			<div className="navbar">
				<span className="welcome-msg"> Welcome to your dashboard </span>
				<span className="profile" onClick={handleProfile}>
					{username} 
				</span>
				<div className="urls">
					<span className="profile-header"> Link to my profiles</span>
					<a className='linkedin' href="https://www.linkedin.com/in/rakesh-r-0b2b27253/"> Linkedin</a>
					<img src={profile} alt="profile" />
			   </div>
			</div>
		</div>
	);
};

