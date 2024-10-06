/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import moment from 'moment';
import country from './../Drivers/country'


const NextRace = ({race}) => {
    return (
        <div className="container-next-race"
                    style={{
                        backgroundColor: 'white',
                        padding: '1.0em',
                    }}
                >
                    <div
                    style={{
                        padding: '0.5em',
                        backgroundColor: '#15151e',
                        color: 'white',
                    }}
                >

                    <fieldset
                        style={{
                            
                            
                            fontFamily: 'Formula1-black',
                            fontSize: '1.5rem',
                            
                            border: '5px solid red',
                            borderTopRightRadius: "10px",
                            borderLeft: '0',
                            borderBottom: '0',
                            flexDirection: 'row',
                            
                        }}
                    >
                        <legend
                            style={{
                                textAlign: 'left',
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                padding: '0.5em',
                                color: 'red'
                            }}
                        >Round {race.round} - up Next</legend>
                        <div
                            css={css`
                                display:flex;
                                justify-content: space-between;
                                flex-direction:row;
                                flex-wrap: wrap;
                                align-items: center;
                                @media (max-width: 768px) {
                                    flex-direction: column;
                                }
                                `
                            }
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: '0.3em'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    {new Date(race.date).getDate()}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Formula1-wide',
                                        backgroundColor: 'white',
                                        color:'black',
                                        fontSize: '0.8rem'

                                    }}
                                >
                                    {moment(new Date(race.date).getMonth()+1, 'MM').format("MMM")}
                                    
                                    
                                </span>
                            </div>
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    textAlign: 'center',
                                    margin: '0.3em'
                                }}
                            >
                                <div
                                    style={{
                                        display:'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span>

                                        {race.Circuit.Location.country}
                                    </span>
                                    <span>
                                        <img 
                                            style={{
                                                width: "2.5rem"
                                            }}
                                            src={`https://flagsapi.com/${country[`${race.Circuit.Location.country}`]}/flat/64.png`} alt="flag"></img>
                                    </span>
                                </div>
                                <span
                                    style={{
                                        fontSize: '1rem'
                                    }}
                                >
                                    {race.raceName}
                                </span>
                            </div>
                            <div
                                style={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    margin: '0.3em'
                                }}
                            >
                                {race.Circuit.circuitName}
                            </div>
                        </div>
                    </fieldset>
                </div>
        </div>
        );
}

export default NextRace