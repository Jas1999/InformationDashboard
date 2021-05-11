import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

function App() {

  const dummytemps= [
  // city 1
    {
      city: 'Brampton',
      description: 'Cloudy',
      icon: "03d",//"http://openweathermap.org/img/w/03d.png"
      temp: 25

    },
    // city 2
    {
      city: 'Caledon',
      description: 'Cloudy',

      icon: "02d",//"http://openweathermap.org/img/w/02d.png"
      temp: 25

    }


  ];

  const [initData,setinitData] = useState(dummytemps) //{[]}
/*
  useEffect(() => {
    fetch('/WeatherCheck/London').then(
      response => response.json()
    ).then(data=> setinitData(data))

  },[]); // console.log(data)
*/



  function fetchWeather(Loc,dummytemps) {
    console.log("fetching python localhost");

    //"London" Loc

    fetch('/WeatherCheck/'+Loc).then(
      response => response.json()
    ).then(data=> dummytemps.push(data),   setinitData(dummytemps))
    .catch(err => console.log(err))

    //initData.push(dummytemps);
  //  setinitData(dummytemps)
    console.log(initData);
    console.log(dummytemps);


  }





  return (
    <div className="App">

        <main>
          <div className="WDisplay">
            <div className="search">
              <input type="text" className="SearchBar" placeholder= "Locations ..." />
              <div className="SubmitBTN">
                  <button onClick={() => fetchWeather("Toronto",dummytemps)} >
                      SUBMIT
                  </button>
  	          </div>

            </div>
            {console.log(initData)}
            {initData.map((dummytemp, i) => (

              <WeatherDisplay
                key={i}
                city={dummytemp.city}
                description={dummytemp.description}
                temp={dummytemp.temp}
                icon={"http://openweathermap.org/img/w/" + dummytemp.icon +".png"}
              />
            ))}
          </div>
        </main>

    </div>
  );


}

/*

<WeatherDisplay
  city={initData.city}
  description={initData.description}
  temp={initData.temp}
  icon={"http://openweathermap.org/img/w/" + initData.icon +".png"}
/>

{dummytemps.map((dummytemp, i) => (
  <WeatherDisplay
    key={i}
    city={dummytemp.city}
    description={dummytemp.description}
    temp={dummytemp.temp}
    icon={dummytemp.icon}
  />
))}
*/

function WeatherDisplay(props) {


  return(
    <div className = "weatherDisplay" >

      <img  className = "weathericon" src= {props.icon} />

      <div className="weatherDetails">
             <h1>City: {props.city}</h1>
             <p>Descripiton: {props.description}</p>
             <p>Temperature: {props.temp}</p>
      </div>

    </div>

  );
}



export default App;
