import { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuth }) => {
	const [isButtonClicked, setIsButtonClicked] = useState(false);	
	const usernameInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const navigate = useNavigate();	
	const [msg, setMsg] = useState("");
	const [isAuthorized, setIsAuthorized] = useState(false);

	const userAuthorization = async () => {
		let dataFromDb = {};
		let userFound = false;
		const usernameInputFromForm = usernameInputRef.current.value.trim();
		const passwordInputFromForm = passwordInputRef.current.value.trim();
		try {
			const response = await axios.get('http://localhost:8080/users');
			dataFromDb = response.data;
			if (isButtonClicked && usernameInputFromForm === '' || passwordInputFromForm === '') {
				setMsg("Please enter your details");
				return;
			} else if(!isButtonClicked) {
				setIsAuthorized(false);
			} else {
				for (let key in dataFromDb) {
					const userData = dataFromDb[key];
					if (userData.userName === usernameInputFromForm 
					&& userData.password === passwordInputFromForm) {
						console.log("User found in the datebase");
						setIsAuthorized(true);
						setIsAuth(true);
						localStorage.setItem("isAuth", "true");
						localStorage.setItem("username", usernameInputFromForm);
						// localStorage.setItem("password", passwordInputFromForm);
						userFound = true;
						break;
					} 
				}

				if(!userFound) {
					setMsg("user not found, redirecting you to signup page");
					signupHandler();
				}
			}

		} catch (error) {
			console.log("Error", error);
		}
	};

	useEffect(() => {
		if(isAuthorized) {	
			navigate("/dashboard");
		} 
	}, [isAuthorized]);

	const signupHandler = () => {
		setTimeout(() => {
			navigate("/signup");
		}, 2000);
	};

	const handleSubmit = () => {
		setIsButtonClicked(true);
		userAuthorization();
	};	

	useEffect(() => {
		let clickedTimer;
	
		if (isButtonClicked) {
			clickedTimer = setTimeout(() => {
				setIsButtonClicked(false);
				setMsg("");
			}, 2000);
		}

		return () => {
			clearTimeout(clickedTimer);
		};
	}, [isButtonClicked, msg]);

	return (
		<div className="LoginForm">
			<span className='login-h'> Please enter your details to login </span>
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
			<span> {msg} </span>
		</div>
	);
};

export default LoginForm;
