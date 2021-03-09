/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {useEffect, useState} from 'react';
import Cell from '../Standings/Cell'
import moment from 'moment'
import country from '../Drivers/country'

export default function Schedule({
	isNotCollapsed,
    setIsNotCollapsed,
    isMobile
}){
    const [data, setData] = useState([])
    const [season, setSeason] = useState('')
    const [error, setError] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [nextRace, setNextRace] = useState()

    const headers = ['round', 'name', 'circuit', 'country', 'date']

    const filter = (data) => {
        console.log(data)
        var months = data.filter(race => new Date(race.date.toString()).getMonth() == new Date().getMonth())
        var days = months.filter(race => new moment(race.date.toString()).date() >=  moment().date())
        console.log(days)
        return days[0]
    }

    useEffect(() => {
        const nextRace = data.length > 0 ?
            (
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
                            >Round {filter(data).round} - up Next</legend>
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
                                        {new Date(filter(data).date).getDate()}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Formula1-wide',
                                            backgroundColor: 'white',
                                            color:'black',
                                            fontSize: '0.8rem'

                                        }}
                                    >
                                        {moment(new Date(filter(data).date).getMonth()+1, 'MM').format("MMM")}
                                        
                                        
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

                                            {filter(data).Circuit.Location.country}
                                        </span>
                                        <span>
                                            <img src={`https://www.countryflags.io/${country[`${filter(data).Circuit.Location.country}`]}/flat/32.png`} alt="flag"></img>
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {filter(data).raceName}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        margin: '0.3em'
                                    }}
                                >
                                    {filter(data).Circuit.circuitName}
                                </div>
                            </div>
                        </fieldset>
                    </div>
            </div>
            ) : (<div></div>);
            setNextRace(nextRace)
    }, [data])
    

    useEffect(()=>{
        const run = async ()=>{
            try{
                var result = await fetch(`https://ergast.com/api/f1/${year}.json`);
                var res = await result.json();
                setData(res.MRData.RaceTable.Races)
                
            } catch(e){
                setError('An Error occured')
            }
            
            
           
            
            
        }
        run();
        
    
    }, [])

    

 

    return (
        
        <div className="body-schedule"
            css={css `
                    background-color: #15151e;
                    padding: 1.5em 0.5em;
                    height: 100%;
                    margin-top: ${isMobile ? '4em' : '0'};
                    font-size: 20px;
                    text-align: center;
                    color: 'white';
                    height: 100%;
                    
                @media (max-width: 768px){
                    font-size: 10px;
                    height: 100vh;
                    padding-bottom: 10em;
                }
                // fontSize: fontSize,
                `
            }
            
            onClick={()=> setIsNotCollapsed(false)}
        >
            
            {
                data.length>0? 
            <div>
                <div>
                    {
                        nextRace
                    }
                </div>
                
                <div className="container-schedule"
                    style={{
                        backgroundColor: 'white',
                        padding: '1.5em',
                        margin: '1.5em 0'
                    }}
                >
                    <div className="table"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            
                        }}
                    >
                        <table 
                            style={{
                                borderCollapse: 'collapse',
                                textAlign: 'left',
                                width: '100%'
                            }}
                        >
                            <thead>
                                <tr 
                                    style ={{
                                        fontSize: '0.8em'
                                    }}
                                >

                                    {headers.map(
                                        (header, index) => 
                                            {
                                                return <Cell  key={index} element={header.toUpperCase()} />
                                            }
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                data.map( (race, index) => {
                                    const {round, raceName, date, Circuit: {circuitName, Location: {country}} } = race;
                                    // const {name: constructorId} = Constructors[0]
                                    const bgColor = index%2!==0 ? 'white' : '#f4f4f4'
                                    
                                    const border = filter(data).date === date ? '2px solid red' : '0 none'
                                    
                                    return (
                                    <tr key={index}
                                        style={{
                                            backgroundColor: bgColor,
                                            fontSize: '0.5em',
                                            border: border
                                        }}>

                                        <Cell
                                            element = {round}
                                            key={index+round}
                                        />
                                        <Cell
                                            element = {raceName}
                                            key={index+raceName}
                                        />
                                        <Cell
                                            element = {circuitName}
                                            key={index+circuitName}
                                        />
                                        <Cell
                                            element = {country}
                                            key={index+country}
                                        />
                                        <Cell
                                            element = {date}
                                            key={index+data}
                                        />
                        
                                    </tr>
                                    
                                    );
                                }) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            : error.length>0?
                <div>{error}</div> :
                season !== new Date().getFullYear ? 
                    <div style={{color: 'white'}}>Coming Soon..</div> :
                        <div style={{color: 'white'}}>Loading..</div>
            
            }
            
                
                

            
        </div>       
        
    )
}