import React, {useEffect, useState} from 'react'
import Cell from "./Cell";

export default function DriverStandings(){
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [year, setYear] = useState(new Date().getFullYear() - 1)

    const headers = ['pos', 'driver', 'nationality', 'car', 'points']
    
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
            
        
            
            
        }
        setData([])
        run();
        
    
    }, [year])


    return (
        
        
            <div className="container-standings"
                style={{
                    backgroundColor: 'white',
                    padding: '1.5em',
                    margin: '0.5em 0'
                }}
            >
                <div className="filter">
                    <label htmlFor="year">Season: </label>
                    <select 
                        name="year"
                        
                        value = {year}
                        onChange={
                            (e) => {
                                setYear(e.target.value)
                            }
                        }
                    >
                        {
                            Array.from({length: (new Date().getFullYear()+1) - 1950}, (v, k) => k + 1950).reverse().map(
                                (item, index) => {
                                    return (
                                        <option
                                            key={index} 
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                        )
                                }
                            ) 
                                
                            
                        }
                    </select>
                </div>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        fontSize: '1.5em',
                    }}
                >
                    {year} Driver Standings
                </div>
                <div className="table"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        
                    }}
                >
                    {
                        data.length > 0 ?
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
                                                return <Cell element={header.toUpperCase()} key={index} />
                                            }
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                data.map( (driver, index) => {
                                    const {position, points, Driver: {givenName, familyName, nationality}, Constructors} = driver;
                                    const {name: constructorId} = Constructors[0]
                                    const bgColor = index%2!==0 ? 'white' : '#f4f4f4'
                                    return (
                                    <tr key={index}
                                        style={{
                                            backgroundColor: bgColor,
                                            fontSize: '0.5em',
                                        }}>

                                        <Cell
                                            element = {position}
                                        />
                                        <Cell
                                            element = {`${givenName} ${familyName}`}
                                        />
                                        <Cell
                                            element = {nationality}
                                        />
                                        <Cell
                                            element = {constructorId}
                                        />
                                        <Cell
                                            element = {points}
                                        />
                        
                                    </tr>
                                    
                                    );
                                }) 
                            }
                            </tbody>
                        </table>
                        :
                        error.length>0?
                            <h3>{error}</h3>:
                            <h3>Loading...</h3>
                    }
                    
                </div>
            </div>        
    
    )
}