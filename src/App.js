import { useEffect, useState } from 'react';
import './App.css';
import Home from './Component/Home';
import { dataContext } from "./Mycontext"

function App() {
const [dataFromApi,setApi]=useState([])
useEffect(()=>{
fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2")
.then(resp=>resp.json())
.then((data)=>{
  // console.log(data)
  const farray=data.Results.filter((data,id)=>data.Mfr_CommonName && data.Country && data.VehicleTypes[0])
  // console.log(farray)
  setApi(farray)

})
},[])
  return (
    <div className="App">
      <dataContext.Provider value={dataFromApi}>
        <Home />
      </dataContext.Provider>

    </div>
  );
}

export default App;
