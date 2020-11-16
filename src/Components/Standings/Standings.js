/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from "react"
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings'

export default function Standings({
	isNotCollapsed,
    setIsNotCollapsed,
    isMobile
}) {
   const [isDriver, setIsDriver] = useState(true)
   
   const [fontSize, setFontSize] = useState(isMobile ? '10px' : '20px')


   
    


useEffect(() => {
    isMobile ? setFontSize('10px') : setFontSize('20px')
}, [isMobile])


   return (
        <div className="body-standings"
            style={{
                backgroundColor: '#15151e',//#f4f4f4',
                height: isMobile?'100vh':'100%',
                padding: '1.5em 0.5em',
                fontSize: fontSize,
                textAlign: 'center',
                marginTop: isMobile ? '4em' : '0',
            }}
            onClick={()=> setIsNotCollapsed(false)}
        >
            <div className='selector'
                css={
                    css`
                        display: flex;
                        justify-content: space-evenly;
                        background-color: white;
                        padding: 1em;
                        
                    `
                }
            >
                <span className='driver-switch'
                    css={
                        css`
                            text-align: center;
                            border-bottom: ${isDriver?'2px solid black':'0 none'};
                            border-right: '2px solid black';
                            text-transform: capitalize;
                            cursor: pointer;
                        `
                    }
                    onClick={()=>setIsDriver(true)}
                >
                    drivers
                </span>
                <span className='constructor-switch'
                    css={
                        css`
                            text-align: center;
                            border-bottom: ${isDriver?'0 none':'2px solid black'};
                            border-left: '1px solid black';
                            text-transform: capitalize;
                            cursor: pointer;
                        `
                    }
                    onClick={()=>setIsDriver(false)}               
                >
                    constructors
                </span>
            </div>
            {
                isDriver?
                    <DriverStandings />:
                    <ConstructorStandings />
            }
        </div>

   )
} 