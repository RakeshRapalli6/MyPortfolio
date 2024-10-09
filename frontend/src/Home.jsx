import { Link } from "react-router-dom";
import './App.css';

const Home = () => {
	return(
		<div className="Home">
			<span className="Home-header">Welcome to Home page</span>

			<span className="Sub-header"> Please Click on login button below to navigate to login page</span>

			<div className="Login-container">
				<button className="Login-button"> 
					<Link to ="login" style={{ textDecoration: 'none' }}> Login </Link>
				</button>
			</div>
		</div>
	);
};

export default Home;