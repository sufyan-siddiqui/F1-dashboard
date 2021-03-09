import React, { useState, useEffect } from 'react'
import DriverCard from './DriverCard'
import colors from '../../Utilities/colors'

export default function Drivers({
	isNotCollapsed,
    setIsNotCollapsed,
    isMobile
}){
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [year] = useState(new Date().getFullYear())


    useEffect(()=>{
        const run = async ()=>{
            try{
                var result = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
                var res = await result.json();
                setData(res.MRData.StandingsTable.StandingsLists[0].DriverStandings)
            }
            catch(e){
                setError('Error fetching data')
                
            }
            
            // console.log("my data",data);
            // console.log("MR", data.MRData);
            
            
        }
        setData([])
        run();
    }, [year])


    return(
        <div className="body-drivers"
            onClick={()=> setIsNotCollapsed(false)}
            style={{
                marginTop: isMobile ? '4em' : '0',
            }}
        >
            <div className="page-header"
                style={{
                    margin: 'auto',
                    marginTop: '20px',
                    width: '30%',
                    letterSpacing: '1.5px',
                    fontFamily: 'Formula1-black',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    border: '5px solid black',
                    borderTopRightRadius: "10px",
                    borderLeft: '0',
                    borderBottom: '0',
                    padding: '0.5em',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                F1 DRIVERS {year}
            </div>
            <div 
                className="drivers"
                style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}

            >
                {
                    data.length>0 ?
                        data.map(
                            (driver, index) => {
                                const {Driver: {givenName, familyName, nationality, permanentNumber}, points, Constructors} = driver;
                                var constructor
                                Constructors.length === 0 ? constructor = "-" : {name: constructor} = Constructors[0]
                                return <DriverCard 
                                            givenName={givenName}
                                            familyName={familyName}
                                            constructor = {constructor}
                                            points = {points}
                                            number = {permanentNumber}
                                            nationality = {nationality}
                                            color = {colors[`${constructor}`]}
                                            key = {index}
                                        />
                            }
                        )
                    :
                        error.length>0 ?
                            <h3>{error}</h3> :
                            <h3>Loading</h3>    

                }
                
            </div>
            
        </div>
    )
}