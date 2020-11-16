import React, {useState, useEffect} from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Standings from "./Components/Standings/Standings"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Drivers from './Components/Drivers/Drivers'
import Schedule from './Components/Schedule/Schedule'

function App() {

	// const run = async () => {
	// 	var result = await fetch("http://ergast.com/api/f1/2020/driverStandings.json");
	// 	var data = await result.json();
	// 	console.log("my data",data)
	// 	console.log("MR", data.MRData)
	// }
	// run();
	const [isNotCollapsed, setIsNotCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches)

	useEffect(() => {
		window.addEventListener("resize", ()=>
			setIsMobile(window.matchMedia("(max-width: 768px)").matches)
		);
	});

	return (
		<div className='App'>
			<Router>

				<Navbar isNotCollapsed={isNotCollapsed} 
						setIsNotCollapsed={setIsNotCollapsed}
						isMobile={isMobile}
						/>
				<Switch>
					<Route path="/" exact>
						<Schedule isNotCollapsed={isNotCollapsed} 
								  setIsNotCollapsed={setIsNotCollapsed}
								  isMobile={isMobile}/>
					</Route>
					<Route path='/Standings'>
						<Standings isNotCollapsed={isNotCollapsed} 
								   setIsNotCollapsed={setIsNotCollapsed}
								   isMobile={isMobile}/>
					</Route>
					<Route>
						<Drivers isNotCollapsed={isNotCollapsed} 
								 setIsNotCollapsed={setIsNotCollapsed}
								 isMobile={isMobile}/>
					</Route>
				</Switch>
			</Router>

		</div>
	)
}

export default App
