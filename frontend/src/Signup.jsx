import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

	const [isClicked, setIsClicked] = useState(false);	
	const [isPressed, setIsPressed] = useState(false);
	const usernameInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const [displayMsg, setDisplayMsg] = useState("");
	const navigate = useNavigate();

	const saveToDb = async () => {
		const username = usernameInputRef.current.value.trim();
		const password = passwordInputRef.current.value.trim();
		let FormData = null;
		let role = "";

			
	
		if (username !== "" && password !== "") {
			FormData = {
				userName: username,
				password: password,
				roles: role
			};
		}

		console.log(FormData);
	
		if (FormData !== null) {
			try {
				// Check if username is taken
				const dataResponse = await axios.get('http://localhost:8080/users');
				const userdata = dataResponse.data;
				let userExists = false;
	
				for (let key in userdata) {
					const data = userdata[key];
	
					if (data.userName === FormData.userName) {
						setDisplayMsg("Username is taken..!");
						userExists = true;
						break;
					}
				}
	
				if (!userExists) {
					// Post the data if username is available
					const response = await axios.post('http://localhost:8080/users', FormData, {
						headers: {
							'Content-Type': 'application/json'
						}
					});
					console.log('Data sent to the database:', response.data);
					setDisplayMsg("Details saved. Redirecting you to login page");
					handleDisplayMsg();
				}
			} catch (error) {
				console.error('Error saving to database:', error);
				setDisplayMsg("An error occurred while saving your details. Please try again.");
			}
		} else {
			setDisplayMsg("Please enter your details");
		}
	};

	const handleSubmit = () => {
		setIsClicked(true);
		saveToDb();
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
		   if (event.key === 'Enter') {
			  event.preventDefault();
			  setIsClicked(true);
			  saveToDb();
		   }
		};
  
		window.addEventListener('keydown', handleKeyDown);
  
		return () => {
		   window.removeEventListener('keydown', handleKeyDown);
		};
	 }, [isClicked]);

	const handleDisplayMsg = () => {
		setTimeout(() => {
			navigate("/login");
		}, 1500)
	};

	useEffect(() => {
		let clickedTimer;
	
		if (isClicked && displayMsg !== "") {
			clickedTimer = setTimeout(() => {
				setIsClicked(false);
				setDisplayMsg("");
			}, 2000);
		}

		return () => {
			clearTimeout(clickedTimer);
		};
	}, [isClicked, displayMsg]);


	return (
		<div className="SignUpForm">

			<span> Please register your details to login </span>
			<div>
				<input
					className="username"
					ref={usernameInputRef}
					placeholder="Enter your username"
				/>
			</div>

			<div>
				<input
					type="password"
					className='password'
					ref={passwordInputRef}
					placeholder='Enter your password'
				/>
			</div>

			<div>
				<button className='Submit' onClick={handleSubmit} type="button">
					Submit
				</button>
			</div>
			<span>
				{displayMsg}
			</span>
		</div>
	);
};

export default Signup;