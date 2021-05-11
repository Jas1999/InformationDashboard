import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

function App() {

  const dummytemps= [
    // city 1
    {
      city: 'Brampton',
      description: 'Cloudy',
      temp: 25,
      icon: "http://openweathermap.org/img/w/03d.png"

    },
    // city 2
    {
      city: 'Caledon',
      description: 'Cloudy',
      temp: 25,
      icon: "http://openweathermap.org/img/w/02d.png"

    },

  ];


  return (
    <div className="App">
      <div className="App">

        <main>
          <div className="search">
            <input type="text" className="SearchBar" placeholder= "Locations ..." />
            <div className="SubmitBTN">
                <button>
                    SUBMIT
                </button>
	          </div>

          </div>

          {dummytemps.map((dummytemp, i) => (
            <WeatherDisplay
              key={i}
              city={dummytemp.city}
              description={dummytemp.description}
              temp={dummytemp.temp}
              icon={dummytemp.icon}
            />
          ))}


        </main>

      </div>
    </div>
  );


}

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
