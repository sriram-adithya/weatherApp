const apiKey = "2547ae49475ce3da808c8da84d0f295f";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form");


formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue= cityInputEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if (!response.ok){
            throw new Error("Network response was not okay")
        }
        const data= await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.feels_like}%`,
            `Wind Speed: ${data.wind.speed}m/s`,     
        ]

        weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openWeathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`
        weatherDataEl.querySelector(".description").textContent=description; 

        weatherDataEl.querySelector(".details").innerHTML=details.map(
        (detail)=> `<div>${detail}</div>`)
        .join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML="";
        weatherDataEl.querySelector(".temperature").textContent="";
        weatherDataEl.querySelector(".description").textContent="Please try again later";
        weatherDataEl.querySelector(".details").innerHTML="";
    }
}