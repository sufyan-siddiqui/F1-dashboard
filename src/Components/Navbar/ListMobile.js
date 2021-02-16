/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';


export default function ListMobile({Links, isNotCollapsed, setIsNotCollapsed}){
    // const [active, setActive] = useState(false);
    return(
        <div>
            <div 
            css={ css`
                background-color: red;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width:100%;
                position: absolute;
                top: ${isNotCollapsed ? '50px' : '-100px'};
                transition-property: top;
                transition-duration: 1s;
                z-index: 500;
                `
            }
        >
            {
                Links.map(
                    (link, index)=>
                     {
                        return <Link key={index}
                                     to={link.route}
                                     onClick={()=> setIsNotCollapsed(!isNotCollapsed)}
                                     style={{
                                         margin: '0.5em 0'
                                     }}
                                     >
                                         {link.name.toString()}
                                     </Link>
                     }
                )
            }
            

        </div> 
        <nav 
            style={{
                backgroundColor: "red",
                textAlign: "center",
                verticalAlign: 'middle',
                padding: "0.8em 0",
                width: '100%',
                height: '25px',
                position: 'fixed',
                top: '0',
                zIndex: '900'
            }}
        >
            <button 
                style={{
                    float: "left",
                    backgroundColor: "transparent",
                    border: "none"
                    // transform: "translateY(20%)"
                }}
                onClick={() => setIsNotCollapsed(!isNotCollapsed)}
            >
                <img src='./hamburger.png'
                    style={{
                        width: '25px'
                    }}
                    alt='hamburger'
                />
            </button>
            <img 
                src= 'https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg'
                alt='logo'
                style = {{
                    width: '75px'
                }}
            />
            
        </nav>
        
        
    
        </div>
        // <div style={{
        //     width: "100%",
        //     backgroundColor: "red",
        //     position: "relative",
        //     padding:"0.8em",
        //     textAlign: "center"
        // }}>
        //     <button
        //         onClick= {()=> setActive(!active)}
        //         style ={{
        //             float: "left"
        //         }}
        //     >
        //         burger
        //     </button>
        //     <img
		// 			src='https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg'
        //             alt='logo'
        //             style={{
        //                 position: "absolute",
        //                 left: "20%",
        //                 width: "80px",
        //                 display: "inline-block",
        //                 fontSize: "0",
        //                 top: "0",
        //                 transform: "translateX(-50%)",
        //             }}
		// 	/>
        // </div>
    )
}