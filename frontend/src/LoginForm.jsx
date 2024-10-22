import { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuth }) => {
   const usernameInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const navigate = useNavigate();	
   const [msg, setMsg] = useState("");
   const [isAuthorized, setIsAuthorized] = useState(false);

   const userAuthorization = async () => {
      try {
         const username = usernameInputRef.current.value.trim();
         const password = passwordInputRef.current.value.trim();

         if (username === '' || password === '') {
            setMsg("Please enter your details");
            return;
         }

         const response = await axios.get('http://localhost:8080/users');
         const users = response.data;
         let userFound = false;

         for (let user of users) {
            if (user.userName === username && user.password === password) {
               setIsAuthorized(true);
               setIsAuth(true);
               localStorage.setItem("isAuth", "true");
               localStorage.setItem("username", username);
               userFound = true;
               break;
            }
         }

         if (!userFound) {
            setMsg("User not found, redirecting you to signup page");
            signupHandler();
         }
      } catch (error) {
         console.log("Error:", error);
      }
   };

   useEffect(() => {
      if (isAuthorized) {
         navigate("/dashboard");
      }
   }, [isAuthorized]);

   const signupHandler = () => {
      setTimeout(() => {
         navigate("/signup");
      }, 2000);
   };

   const handleSubmit = () => {
      userAuthorization();
   };

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.key === 'Enter') {
            event.preventDefault();
            userAuthorization();	
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

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
         <span>{msg}</span>
      </div>
   );
};

export default LoginForm;
