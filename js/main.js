// days
// carunt date with new date
// city
// temp in c max and min
// icon
// art the weather -> sunny
// icons with
//wind speed
//run

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const directions = {
  N: "North",
  NbE: "North by East",
  NNE: "North-Northeast",
  NEbN: "Northeast by North",
  NE: "Northeast",
  NEbE: "Northeast by East",
  ENE: "East-Northeast",
  EbN: "East by North",
  E: "East",
  EbS: "East by South",
  ESE: "East-Southeast",
  SEbE: "Southeast by East",
  SE: "Southeast",
  SEbS: "Southeast by South",
  SSE: "South-Southeast",
  SbE: "South by East",
  S: "South",
  SbW: "South by West",
  SSW: "South-Southwest",
  SWbS: "Southwest by South",
  SW: "Southwest",
  SWbW: "Southwest by West",
  WSW: "West-Southwest",
  WbS: "West by South",
  W: "West",
  WbN: "West by North",
  WNW: "West-Northwest",
  NWbW: "Northwest by West",
  NW: "Northwest",
  NWbN: "Northwest by North",
  NNW: "North-Northwest",
  NbW: "North by West",
};

let finde = document.querySelector(".btn");
let date1Spans = document.querySelectorAll(".date1 span");
let date2Span = document.querySelector(".date2 span");
let date3Span = document.querySelector(".date3 span");
let search = document.querySelector(".search");
let cardInfos1 = document.querySelectorAll(".card-infos1 span");
let cardInfos2 = document.querySelectorAll(".card-infos2 span");
let cardInfos3 = document.querySelectorAll(".card-infos3 span");
let cardInfo1Img = document.querySelector(".card-infos1 img");
let cardInfo2Img = document.querySelector(".card-infos2 img");
let cardInfo3Img = document.querySelector(".card-infos3 img");
let cardIcons = document.querySelectorAll(".card-icons span");
let clockItems=document.querySelectorAll(".clockCont h2");
let currentDate = new Date();

const api =
  "http://api.weatherapi.com/v1/forecast.json?key=c85f8ccd51044faeba9131623233112";

  
  getCurrentTime();
  function getCurrentTime(locationTime){
      let getHours=currentDate.getHours()>=10? currentDate.getHours():`0${currentDate.getHours()}`;
      let getMinutes=currentDate.getMinutes()>=10? currentDate.getMinutes():`0${currentDate.getMinutes()}`;
      
      
      clockItems[1].innerHTML=`Current Time: ${getHours}:${getMinutes}`;
      setTimeout(()=>{
          getCurrentTime();
        },1000);
    }

   

  function currentVollDate() {
      
      date1Spans[0].innerHTML = days[currentDate.getDay()];
      date1Spans[1].innerHTML = currentDate.getDay() +
      " " +
      months[currentDate.getMonth()] +
      " " +
      currentDate.getFullYear();
      date2Span.innerHTML=days[currentDate.getDay()+1];
      date3Span.innerHTML=days[currentDate.getDay()+2];
}


function getWindDirection(info){
  return directions[info];
   
}




async function getInfos(info) {
   
  let res = await fetch(`${api}&q=${info}&days=3`, { method: "Get" });
  let locatTime;
  if (res.status == 200) {
    const { location, current,forecast } = await res.json();
    clockItems[0].innerHTML = location.name;
    locatTime=location.localtime.split(" ");
    clockItems[2].innerHTML=`Location Time: ${locatTime[1]}`;
    cardInfos1[0].innerHTML = `${Math.round(current.temp_c)}<sup>°</sup> C`;

    cardInfos2[0].innerHTML = `${Math.round(forecast.forecastday[1].day.maxtemp_c)}<sup>°</sup> C`;
    cardInfos2[1].innerHTML = `${Math.round(forecast.forecastday[1].day.mintemp_c)}<sup>°</sup> C`;
    cardInfos2[2].innerHTML = `${forecast.forecastday[1].day.condition.text}`;
    cardInfos2[1].innerHTML = `${Math.round(forecast.forecastday[1].day.mintemp_c)}<sup>°</sup> C`;

    cardInfos3[2].innerHTML = `${forecast.forecastday[2].day.condition.text}`;
    cardInfos3[0].innerHTML = `${Math.round(forecast.forecastday[2].day.maxtemp_c)}<sup>°</sup> C`;
    cardInfos3[1].innerHTML = `${Math.round(forecast.forecastday[2].day.mintemp_c)}<sup>°</sup> C`;
    

    cardInfos1[1].innerHTML = current.condition.text;
    cardIcons[0].innerHTML = `<i class="fa-solid fas fa-umbrella"></i> ${Math.round(
      current.pressure_in
    )}%`;
    cardIcons[1].innerHTML = `<i class="fa-solid fas fa-wind"></i> ${Math.round(
      current.wind_kph
    )} km/h`;
    cardIcons[2].innerHTML = `<i class="fa-solid fas fa-compass"></i> ${getWindDirection(current.wind_dir)}`;

    cardInfo1Img.setAttribute("src", `${current.condition.icon}`);
    cardInfo2Img.setAttribute("src",`${forecast.forecastday[1].day.condition.icon}`);
    cardInfo3Img.setAttribute("src",`${forecast.forecastday[2].day.condition.icon}`);

    
  }
}
currentVollDate();
getInfos("dortmund");

finde.addEventListener("click", function () {
  getInfos(search.value);
});

search.addEventListener("change", function (e) { 
        getInfos(search.value);
});
search.addEventListener("keypress", function (e) { 
    if(e.key==="Enter"){

        getInfos(search.value);
    }
});
