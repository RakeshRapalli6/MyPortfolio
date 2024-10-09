import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const PassReset = () => {

	const [msg, setMsg] = useState("");
	const navigate = useNavigate();
	const oldPassword = useRef(null);
	const newPassword = useRef(null);
	const newPasswordAgain = useRef(null);
	const newpass = "";
	let changedPassword = "";
	let username = "";

	const handlePasswordChange = async () => {

		const oldPasswordFromPage = oldPassword.current.value.trim();
		const newPasswordFromPage = newPassword.current.value.trim();
		const newPasswordFromPage2 = newPasswordAgain.current.value.trim();
		// console.log("here",newPasswordFromPage2);
	
		if(newPasswordFromPage !== "" && oldPasswordFromPage !== "" && newPasswordFromPage === oldPasswordFromPage) {
			setMsg("New password and old password cannot be same");
		} else if(oldPasswordFromPage === "" || newPasswordFromPage === "" || newPasswordFromPage2 === "") {
			setMsg("Please enter your details! ");
		} else if(newPasswordFromPage !== newPasswordFromPage2) {
			setMsg("Passwords didn't match! ");
		} else {
			localStorage.setItem("password", newPasswordFromPage2);	
			submitHandler();
		}
	};
	
	const updatePassword = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/users`);
			const data = response.data;
			username = localStorage.getItem("username");
			changedPassword = localStorage.getItem("password");
			newpass = changedPassword;

			for (let key in data) {	
				let userdetails = data[key];
				if (userdetails.userName === username) {
					try {
						const updateResponse = await axios.patch(`http://localhost:8080/users/${userdetails.id}`, {
							// "edited_field": "password",
							"password": newpass 
						}, {
							headers: {
								'Content-Type': 'application/json'
							}
						});
						console.log('Data sent to the database:', updateResponse.data);
					} catch (error) {
						console.error('Error saving to the database:', error.response ? error.response.data : error.message);
					}
				}
			}
		} catch (error) {
			console.log('Error fetching users:', error);
		}
	};
	

	const handleSubmit = () => {
		setMsg("You successfully reset your password...");
		handlePasswordChange();
		updatePassword();
	};

	const handleBackToDash = () => {
		navigate("/dashboard")
	};

	const submitHandler = () => {
		let clickedTimer;

		clickedTimer = setTimeout(() => {
			navigate("/");
		}, 1500)	

		return () => {
			clearTimeout(clickedTimer);
		};
	};

	useEffect(() => {
		let timer;

		timer = setTimeout(() => {
			setMsg("");
		}, 1500)

		return () => {
			clearTimeout(timer);
		};
	});
	
	return(
		<div className="reset-container">
			<span className="back-to-dash" onClick={handleBackToDash}> Dash </span>
			<span className="old-pass"> Enter old password: 
				<input
					className="old-pass-box"
					placeholder="Enter your old password!"
					type="text"
					ref={oldPassword}
				/>
			</span>
			<span className="new-pass"> Enter new password: 
				<input
					className="new-pass-box"
					placeholder="Enter your new password!"
					type="text"
					ref={newPassword}
				/>
			</span>
			<span className="new-pass-2"> Re-enter new password: 
				<input
					className="new-pass-box-2"
					placeholder="Re-enter your new password!"
					type="text"
					ref={newPasswordAgain}
				/>
			</span>
			<button type="button" className="submit-pass" onClick={handleSubmit}> Submit </button>
			<span className="reset-msg">{msg}</span>
		</div>
	);
};