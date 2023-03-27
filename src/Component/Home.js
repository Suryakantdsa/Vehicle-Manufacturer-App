import React, { useContext,useEffect,useState} from 'react'
import { dataContext } from '../Mycontext'


function Home() {
    
    let dataparent = useContext(dataContext)
    const [dataFpapa,setPa]=useState([])
    console.log("data from app" , dataparent)
    console.log("data from app" , dataFpapa)
   
  useEffect(() => {
    if(dataparent){
        setPa([...dataparent])
    }
  }, [dataparent])

    const [onedata,setOne]=useState([])
    const [show,setShow]=useState(false)
    const [key,setKey]=useState("")

    const searchKey = (e) => {
        const newKey = e.target.value;
        setKey(newKey);
        const filteredData = dataparent.filter((value) => {
          return newKey === value.Mfr_CommonName;
        });
        setPa([...filteredData]);
      };
   
    const handleDetails=(id)=>{
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${id}?format=json`)
        .then(resp=>resp.json())
        .then((data)=>{
            setShow(true)
            setOne(data.Results)

        })

    }
    console.log(onedata)



    return (
        <div className='main'>
            <h1>VEHICLE MANUFACTURERS</h1>
            <div className='search-filter'>
                <label>
                    Search:<input type="text" placeholder='search...' onChange={searchKey} value={key} />
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

           {show? <div  className='popup'>
                    <h1>{onedata[0].Mfr_Name}</h1>
                    <p>{onedata[0].PrincipalFirstName}</p>
                    <p>{onedata[0].Address}</p>
                    <p>{onedata[0].StateProvince}</p>
                    <button onClick={()=>{setShow(!show)}}>X</button>

            </div>:
            null
            } 

        </div>
    )
}

export default Home