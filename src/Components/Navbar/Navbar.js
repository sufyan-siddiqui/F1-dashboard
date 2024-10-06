import React from 'react'
import List from './List'
import ListMobile from './ListMobile'
import './navbar.css'

export default function Navbar({
	isNotCollapsed,
	setIsNotCollapsed,
	isMobile
}) {
	// const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches)
	const Links = [
		{
			name: 'Schedule',
			route: '/'
		},
		{
			name: 'Standings',
			route: '/Standings'
		},
		{
			name: 'Drivers',
			route: '/Drivers'
		},
	]

	
	// useEffect(() => {
	// 	window.addEventListener("resize", ()=>
	// 		setIsMobile(window.matchMedia("(max-width: 768px)").matches)
	// 	);
	// });

	return (
			<div className="navbar"
				// style={{
				// 	position: 'fixed',
				// }}
			>
				{isMobile?<ListMobile Links={Links} 
							isNotCollapsed={isNotCollapsed} 
							setIsNotCollapsed={setIsNotCollapsed}/> :
							<List Links={Links} />}
			</div>
	)
}
