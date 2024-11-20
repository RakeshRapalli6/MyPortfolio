import LoginForm from './LoginForm';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import { Dashboard} from './Dashboard';
import Signup from './Signup';
import { Profile } from './Profile';
import { useEffect, useState } from 'react';
import { NoAccess } from './NoAccess';
import { PassReset } from './PassReset';
import { Skills } from './Skills';

function App() {

	const[isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const storedAuth = localStorage.getItem("isAuth");

		if(storedAuth === "true") {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	});

	// console.log("IsAuth",isAuth);

	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Dashboard />} />
			{/* <Route path="/dashboard" element={ <Dashboard  /> } /> */}
			<Route path="/skills" element={<Skills/>} />

			{/* <Route path="/login" element={<LoginForm setIsAuth={setIsAuth}/>} /> */}
			{/* <Route path="/signup" element={<Signup />} /> */}
			{/* <Route path="/profile" element={ isAuth ? <Profile setIsAuth={setIsAuth}/> : <NoAccess/>} />	 */}
			{/* <Route path="/passwordreset" element={ isAuth ? <PassReset /> : <NoAccess/>} /> */}
		</Routes>
		</BrowserRouter>
	);
}

export default App;
