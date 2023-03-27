import React, { useContext ,useState} from 'react'
import { dataContext } from '../Mycontext'


function Home() {
    const dataFpapa = useContext(dataContext)
    console.log("data from app" , dataFpapa)
    const [onedata,setOne]=useState([])


    const handleDetails=(id)=>{
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${id}?format=json`)
        .then(resp=>resp.json())
        .then((data)=>{
            setOne(data.Results)
            
        })

    }
    console.log(onedata)



    return (
        <div className='main'>
            <h1>VEHICLE MANUFACTURERS</h1>
            <div className='search-filter'>
                <label>
                    Search:<input type="text" placeholder='search...' />
                </label>

            </div>
            <table>
                <thead>

                    <td>Name</td>
                    <td>Manufacturer name </td>
                    <td>Manufacturer type</td>
                </thead>
                <tbody>

                    {
                        dataFpapa.map((data, id) => {
                            // console.log("data map id",data.Mfr_ID)
                            return (
                                <tr onClick={()=>handleDetails(data.Mfr_ID)} key={id}>
                                    <td>{data.Mfr_CommonName}</td>
                                    <td>{data.Country}</td>
                                    <td>{data.VehicleTypes[0]?data.VehicleTypes[0].Name:"no there"}</td>
                                </tr>

                            )
                        })
                    }


                </tbody>
            </table>

            <div className='popup'>
                    <h1>{onedata[0].Mfr_Name}</h1>
                    <p>{onedata[0].PrincipalFirstName}</p>
                    <p>{onedata[0].Address}</p>
                    <p>{onedata[0].StateProvince}</p>
                    <button>X</button>

            </div>

        </div>
    )
}

export default Home