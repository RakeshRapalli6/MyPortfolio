import { useNavigate, Outlet } from "react-router-dom";
import InfiniteScrollComponent from './InfiniteScroll'
import profile from './Profile.png'

export const Dashboard = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");
	// console.log(username);

	const handleProfile = () => {
		navigate("/profile");
	}
	const handleSkills = () => {
		navigate("/skills")
	};

	return(
		<div className="Dash-board-container"> 
			<div className="navbar">
				<span className="welcome-msg"> Welcome to My Profile </span>
				{/* <span className="profile" onClick={handleProfile}>
					{username} 
				</span> */}

	
				{/* <div className="profile">
					<a className='linkedin' href="https://www.linkedin.com/in/rakesh-r-0b2b27253/"> Linkedin</a>
				</div> */}
				{/* <InfiniteScrollComponent/> */}
				
				<div className="about-me">

					<img src={profile} alt="Profile Image" class="profile-img"/>
					<span className="summary-1">
						My name is Rakesh. I am an experienced Full Stack Java Developer with over 8 years of expertise in designing, developing, and maintaining 													enterprise-level applications. Proficient in Java/J2EE technologies with hands-on experience in both front-end and back-end development using frameworks such as 							Angular, ReactJS, and Spring Boot. Adept at working across all phases of the Software Development Life Cycle 
						(SDLC), including analysis, design, development, testing, and deployment using Agile methodologies.
					</span>

					<span className="summary-2"> Committed to delivering high-quality software through the use of modern development tools, CI/CD pipelines, 														and best coding practices. Strong problem-solving abilities, attention to detail, and the ability to work collaboratively in fast-paced, 						 
					    agile environments. Experienced across various domains, including banking, finance, healthcare, retail, and EdTech, consistently delivering robust and scalable								solutions tailored to business needs!
					</span>

					

					{/* <span className="summary-3"> Skilled in creating RESTful microservices, implementing API integrations, and developing dynamic and responsive user interfaces. Demonstrated proficiency in cloud technologies, especially with AWS services (EC2, S3, Lambda), Docker, Kubernetes, and container orchestration, ensuring scalable and secure solutions. Expertise in database management using PostgreSQL, MySQL, Oracle, and NoSQL databases like MongoDB.</span> */}
										
				</div>

				<div className="footer">
					<span className="my-skills" onClick={handleSkills}> My Skills </span>

						<a className='linkedin' href="https://www.linkedin.com/in/rakesh-r-0b2b27253/"> Linkedin</a>

					<span className="download">  
						<a className="text" href="/Res.docx" download="RakeshJavaFullStack.docx">
							<span type="button" className="resume"> Resume</span>
						</a>
					</span>

				</div>		
			</div>
		</div>
	);
};

