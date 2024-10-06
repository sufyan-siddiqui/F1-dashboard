/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import {useEffect, useState} from 'react';
import Cell from '../Standings/Cell'
import moment from 'moment'
import country from '../Drivers/country'
import { getSchedule } from '../../actions/scheduleActions';
import NextRace from './NextRace';
import {API} from '../../constants/baseUrl'
import { useQuery } from "react-query";
import axios from 'axios';

export default function Schedule({
	isNotCollapsed,
    setIsNotCollapsed,
    isMobile
}){
    // const [data, setData] = useSelector(state => state)
    // const [data, setData] = useState([])
    const [season, setSeason] = useState('')
    // const [error, setError] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [nextRaceWidget, setnextRaceWidget] = useState()

    const getRaces = async ()=>{
        try{
            var result = await axios.get(`${API}/${year}`);
            return result.data.MRData.RaceTable.Races;
            setData(res.MRData.RaceTable.Races)
        } catch(e){
            setError('An Error occured')
        }      
    }

    const {data, error, isLoading} = useQuery(["schedule", year], getRaces);
    

    const headers = ['round', 'name', 'circuit', 'country', 'date']

    const filter = (data) => {
        // console.log(data)
        // var months = data.filter(race => new Date(race.date.toString()).getMonth() == new Date().getMonth())
        // var days = months.filter(race => new moment(race.date.toString()).date() >=  moment().date())
        var currDate = new Date();
        for(let i = 0; i<data.length; i++){
            var race = data[i];
            if(moment(race.date.toString()).isSameOrAfter(currDate, 'day')){
                return race;
            }
        }
        
        return null
        // console.log(days)
        // if(days.length > 0){
        //     return days[0]
        // } else {
        //     var months = data.filter(race => new Date(race.date.toString()).getMonth() == new Date().getMonth() +  1)
        //     return months[0];
        // }
    }

    useEffect(() => {
        if(data?.length > 0){
            var nextRace = filter(data)

            if(nextRace === null){
                setnextRaceWidget((<div></div>))
            } else{
                setnextRaceWidget(<NextRace race={nextRace}/>)
            }
        } else{
            setnextRaceWidget((<div></div>))
        }
    }, [data])
    

    // useEffect(()=>{
    //     const run = async ()=>{
    //         try{
    //             var result = await fetch(`${API}/${year}`);
    //             var res = await result.json();
    //             setData(res.MRData.RaceTable.Races)
                
    //         } catch(e){
    //             setError('An Error occured')
    //         }      
    //     }
    //     run();
    //     // dispatch(getSchedule(year))
    // }, [])

    

 

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
                data?.length>0? 
            <div>
                <div>
                    {
                        nextRaceWidget
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
            : error?.length>0?
                <div>{error}</div> :
                season !== new Date().getFullYear ? 
                    <div style={{color: 'white'}}>Coming Soon..</div> :
                        <div style={{color: 'white'}}>Loading..</div>
            
            }
            
                
                

            
        </div>       
        
    )
}