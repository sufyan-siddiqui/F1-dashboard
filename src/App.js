import React, {useState, useEffect} from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Standings from "./Components/Standings/Standings"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Drivers from './Components/Drivers/Drivers'
import Schedule from './Components/Schedule/Schedule'
import Login from './Components/Login/Login'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 20,
		},
	},
})

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
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Router>

					<Navbar isNotCollapsed={isNotCollapsed} 
							setIsNotCollapsed={setIsNotCollapsed}
							isMobile={isMobile}
							/>
					<Routes>
						<Route path="/" element={<Schedule isNotCollapsed={isNotCollapsed} 
									setIsNotCollapsed={setIsNotCollapsed}
									isMobile={isMobile}/>}>
						</Route>
						<Route path='/Standings' element={<Standings isNotCollapsed={isNotCollapsed} 
									setIsNotCollapsed={setIsNotCollapsed}
									isMobile={isMobile}/>}>
						</Route>
						<Route path="/Drivers" element={<Drivers isNotCollapsed={isNotCollapsed} 
									setIsNotCollapsed={setIsNotCollapsed}
									isMobile={isMobile}/>}>						
						</Route>
						<Route path="/Login" element={<Login isNotCollapsed={isNotCollapsed} 
									setIsNotCollapsed={setIsNotCollapsed}
									isMobile={isMobile}/>}>
						</Route>
					</Routes>
				</Router>

			</div>
		</QueryClientProvider>
	)
}

export default App
