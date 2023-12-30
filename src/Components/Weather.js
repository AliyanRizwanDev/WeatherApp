import React from "react";
import { useState, useEffect } from "react";
import cloudy from "../Images/Cloudy.png";
import drizzle from "../Images/Drizzle.png";
import fogmist from "../Images/FogMist.png";
import hail from "../Images/Hail.png";
import night from "../Images/night.png";
import partlyday from "../Images/Partly cloudy day.png";
import partlynight from "../Images/Partly cloudy night.png";
import rain from "../Images/Rain.png";
import snow from "../Images/Snow.png";
import sunny from "../Images/Sunny.png";
import thunderstorms from "../Images/Thunderstorms.png";

export default function Weather(props) {
  const [tempdatac, setTempdatac] = useState(0);
  const [tempdataf, setTempdataf] = useState(0);
  const [name, setName] = useState(0);
  const [region, setRegion] = useState(0);
  const [country, setCountry] = useState(0);
  const [condition, setCondition] = useState(0);
  const [wind, setWind] = useState(0);
  const [humid, setHumid] = useState(0);
  const [feelc, setFeelc] = useState(0);
  const [feelf, setFeelf] = useState(0);
  const [rain, setRain] = useState(0);
  const [image, setImage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  
  
  const API_KEY = "52725d338ad644fa804163640232712";

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${props.city}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error.message);
          } else {
            setTempdatac(data.current.temp_c);
            setTempdataf(data.current.temp_f);
            setName(data.location.name);
            setRegion(data.location.region);
            setCountry(data.location.country);
            setCondition(data.current.condition.text);
            setWind(data.current.wind_kph);
            setHumid(data.current.humidity);
            setFeelc(data.current.feelslike_c);
            setFeelf(data.current.feelslike_f);
            setRain(data.current.precip_mm);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 3600000);
  
    return () => {
      clearInterval(fetchDataInterval);
    };

  }, [props.city, API_KEY]);
  

  const [toggle, setToggle] = useState(true);

  function changeCtoF() {
    setToggle(!toggle);
    
  }

  const ShowImage = () => {
    props.setTime(new Date());
    if (condition == "Sunny") {
      setImage(sunny);
    } else if (condition == "Partly cloudy") {
      let currentHour = props.time.getHours();

      if (currentHour >= 17 || currentHour <= 5) {
        setImage(partlyday);
      } else {
        setImage(partlynight);
      }
    } else if (condition == "Cloudy" || condition == "Overcast") {
      setImage(cloudy);
    } else if (condition == "Rain") {
      setImage(rain);
    } else if (condition == "Drizzle") {
      setImage(drizzle);
    } else if (condition == "Snow") {
      setImage(snow);
    } else if (condition == "Fog" || condition == "Mist") {
      setImage(fogmist);
    } else if (condition == "Thunderstorms") {
      setImage(thunderstorms);
    } else if (condition == "Hail") {
      setImage(hail);
    } else if (condition == "Clear") {
      let currentHour = props.time.getHours();
      if (currentHour >= 17 || currentHour <= 5) {
        setImage(sunny);
      } else {
        setImage(night);
      }
     
    } else{
      setImage(cloudy);
    }
  };

  useEffect(() => {
    ShowImage();
  }, [condition]);

  function refresher(){
    setRefresh(refresh==0?1:0);
  }
  
  

  return (
    <div className="weathercomp  container mt-4">
      <div className="row">
        <div className="col-6">
          <h1>
            {country}, {region}, {name} <br/>
            {props.time.getDate()}-{props.time.getMonth()+1}-{props.time.getFullYear()} {/* {props.time.toLocaleTimeString()}   */}
          </h1>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
        
          <label className="switch" style={{marginTop:"-50px"}}>
            <input type="checkbox" onClick={changeCtoF} />
            <span className="slider round"></span>
          <p className="my-3">°C to °F</p>
          </label>
        </div>
      </div>


      <div className="row justify-content-center text-center ">
          <img src={image} alt="image" style={{ width: "200px", marginTop:"40px"}} />

        <h1 style={{fontSize: "120px"}} className={toggle== false?"fade":""} >
        {toggle ? `${tempdatac}°C` : `${tempdataf}°F`}
      </h1>
      </div>
      <div className="row text-center" style={{marginTop:"100px"}} >

      <div className="col my-4">
      <h4 style={{fontWeight:"bold"}}>Condition</h4>
      <h4 >{condition}</h4>
      </div>

      <div className="col my-4">
      <h4 style={{fontWeight:"bold"}}>Wind Speed</h4>
      <h4 className="">{wind} KPH</h4>
      </div>

      <div className="col my-4">
      <h4 style={{fontWeight:"bold"}} >Humidity</h4>
      <h4 className="">{humid}%</h4>
      </div>
      
      <div className="col my-4">
      <h4 style={{fontWeight:"bold"}} >Feels Like</h4>
      <h4 className={toggle== false?"fade":""}>{toggle == true ? `${feelc}°C` : `${feelf}°F`}</h4>
      </div>
      <div className="col my-4">
      <h4 style={{fontWeight:"bold"}} >Rain Chances</h4>
      <h4 className="col">{rain>=100?rain * 100:rain * 100+5}%</h4>
      </div>

      </div>
    </div>
  );
}
