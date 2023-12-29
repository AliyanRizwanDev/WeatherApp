import './App.css';
import {useState,useEffect} from "react"
import Weather from './Components/Weather';
import NavBar from './Components/NavBar';

function App() {
  const [Style,setStyle] = useState({
    background: ``,
    backgroundSize: "cover",
    color:"black"
  });
  const [time, setTime] = useState(new Date());
  const [search,setSearch] = useState("Lahore");

    setInterval(() => {
      setTime(new Date());
      let currentHour = time.getHours();
      if(currentHour >= 17 || currentHour <= 5){
        setStyle({
          ...Style
          ,background: "linear-gradient(to bottom, #000428, #004e92)"
          ,color:"white"
        })
      }
      else{
        setStyle({
          ...Style
          ,background: "linear-gradient(to bottom, #78bfff, #fff5c3)"

      

        })
      }
      
    }, 1);
  
  
  
  let a = time.toLocaleTimeString()

  return (
    
    <div className="App" style={Style}>
      <NavBar city = {search} citySearch = {setSearch} />
      <Weather city = {search} citySearch = {setSearch} time = {time} setTime = {setTime}/>
    </div>
  );
}

export default App;
