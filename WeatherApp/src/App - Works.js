import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


function WeatherDisplay(prop) {

  return(

    <div className = "weatherDisplay" >

      <img  className = "weathericon" src= {prop.icon} />

      <div className="weatherDetails">
             <h1> City: {prop.city}</h1>
             <p>Descripiton: {prop.description}</p>
             <p>Temperature: {prop.temp}</p>
      </div>

    </div>

  );
}

function WeatherForm({fetchData}) {

  const [value, setValue] = useState("");

  const onClick = e =>  {
    e.preventDefault();
   console.log("fetching python localhost");

   //"London" Loc
   if (!value) return;
   fetchData(value);

   setValue("");
   //initData.push(dummytemps);
 //  setinitData(dummytemps)

 }


  return(
    <div className="search">
      <form onSubmit={onClick}>
      <input type="text"
      className="SearchBar" placeholder= "Locations ..."
      value = {value}
      onChange={e => setValue(e.target.value)}
      />
      <div className="SubmitBTN">
          <button onClick={onClick} >
              SUBMIT
          </button>
      </div>
      </form>

    </div>

  );
}



function App() {

  const dummytemps= [
  // city 1
/*
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
*/

  ];

  const [initData,setinitData] = useState(dummytemps) //{[]}
  const [countData,setcountData] = useState(0) //{[]}
/*
  useEffect(() => {
    fetch('/WeatherCheck/London').then(
      response => response.json()
    ).then(data=> setinitData(data))

  },[]); // console.log(data)


  const InitWeather = ({  LocWeather }) => <div className="InitWeather">{LocWeather.city}</div>;
  <InitWeather
  key={i}
  LocWeather = {dummytemp}
  />

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
    setValue("")


  }

  onclick {() => fetchWeather(value,dummytemps)}



*/



  //onChange={e => setValue(e.target.value)}

  const fetchData = value => {
    const newTodos = initData;

    fetch('/WeatherCheck/'+value).then(
      response => response.json()
    ).then(data=>   setinitData([...initData,data]))
    .catch(err => console.log(err))


    setinitData(newTodos);
    console.log(initData);
    setcountData(prev => prev+1);

  };



  return (
    <div className="App">

        <main>
          <div className="WDisplay">

            <WeatherForm fetchData={fetchData} />
            {console.log("here")}
            {console.log(initData)}
            {console.log(countData)}
            {initData.map((CityData, i) => (

              <WeatherDisplay
                key={i}
                index={i}
                city={CityData.city}
                description={CityData.description}
                temp={CityData.temp}
                icon={"http://openweathermap.org/img/w/" + CityData.icon +".png"}
                count={countData}

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

export default App;
