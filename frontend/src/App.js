import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([{}])

  useEffect(()=>{
    axios.get("http://localhost:5000/members")
    .then((res)=>{
      setData(res.data);
      console.log(res.data)
    }).catch((e)=>{
      console.log(e);
    })
  }, [])

  return (
   <div>
      
   </div>
  );
}

export default App;
