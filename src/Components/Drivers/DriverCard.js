/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import {useEffect, useState} from 'react'
import country from './country'


export default function DriverCard({givenName, familyName, constructor, number, points, nationality, color}){
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches)
    const [containerWidth, setContainerWidth] = useState(isMobile ? '50%' : '30%')
    useEffect(() => {
        window.addEventListener("resize", ()=>
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        );
        
    })

    useEffect(() => {
        isMobile ? setContainerWidth('60%') : setContainerWidth('30%')
    }, [isMobile])

    return(
    
            <fieldset className="driver-card-container"

                css={css`
                padding: 0.8em;
                text-align: center;
                width: ${containerWidth};
                border-top-right-radius: 10px;
                border-width: 2px;
                border-color: black;
                border-left: 0;
                border-bottom: 0;
                margin-top: 15px;
                margin-left: 10px;
                &:hover{
                    border:2px solid ${color};
                    border-left: 0;
                    border-bottom: 0;
                    margin-top: 10px;
                    
                }
                    `
                }
                
            >
                <div className="driver-card-rank-number"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid grey',
                        paddingBottom: '10px'
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Formula1-black',
                            fontSize: '2.6rem'
                        }}
                    >
                        {number}
                    </span>
                    <span
                        style={{
                            
                            // fontSize: '2.6rem',
                            fontFamily: 'Formula1-wide'
                        }}
                    >
                            <div>
                                {points}
                            </div>
                            <div
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    padding: '1px',
                                    borderRadius: '3px',
                                    fontSize: 'small'
                                }}
                            >
                                PTS
                            </div>
                        </span>
                </div>
                <div className="container"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems:'center',
                        padding: '10px 0',
                        borderBottom: '1px solid grey'
                    }}
                >
                    <div className="name-row"
                        css={
                            css`
                                display: flex;
                                justify-content: 'left';
                            `
                        }
                    >

                        <div
                            className="color-strip"
                                css={
                                    css`
                                        width: 5px;
                                        height: 5vh;
                                        background-color: ${color};
                                        margin-right: 5px;
                                        
                                    `
                                }
                            >
                                
                        </div>
                        <div className="name-container"
                            style={{
                                display: 'flex',
                                flexDirection:'column',
                                justifyContent: 'left',
                                textAlign: 'left'
                            }}
                        >
                            
                            <span
                                style={{
                                    fontSize: '0.8em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {givenName}
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Formula1-bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {familyName}
                            </span>
                        </div>
                    </div>
                    <div className="flag-container"
                        
                    >
                        <img 
                        style={{
                            width: "3rem"
                        }}
                        src={`https://flagsapi.com/${country[`${nationality}`]}/flat/64.png`}
                            alt="flag"
                        ></img>
                    </div>
                </div>
                <div style={{
                    textAlign: 'left',
                    padding: '15px 0',
                    fontSize: '0.8em'
                }}>
                    {constructor}
                </div>
            </fieldset>
        
    )
}