/*IMPORTS*/
import React, { useState, useEffect } from "react";
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import Cookies from 'universal-cookie';
import Home from "./pages/Home.jsx";
import Play from "./pages/Play.jsx";
import Nickname from "./pages/Nickname.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
	const cookies = new Cookies();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const verifyUser = () => {
			const verifiedUser = (cookies.get('user'));
			console.log('DONE', verifiedUser);
			if (verifiedUser !== null && verifiedUser !== undefined) {
				setUser(verifiedUser);
			}
		}
		verifyUser();
	}, [])

	return (
		<Router>
			<div className="bg-gray-800 h-screen w-screen overflow-y-auto overflow-x-hidden">
				<UserContext.Provider value={{ user, setUser }}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Nickname" component={Nickname} />
						<Route exact path="/Play/:room_id" component={Play} />
						<Redirect from="*" to="/" />
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
