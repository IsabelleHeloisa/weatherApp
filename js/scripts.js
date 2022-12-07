const apiKey = "";
const apiCoutryURL = "https://countryflagsapi.com/png/";
const apiImageCityURL = "https://source.unsplash.com/1600x900/?"


const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

// Funções

const getWeatherData = async(city) => {

  const apiWetherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`


  const res = await fetch(apiWetherURL)
  const data = await res.json()

  if(data) loading.classList.add("hide")

 return data
} 


const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
  countryElement.setAttribute("src", apiCoutryURL + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/h`

  bodyBg.style.backgroundImage = `url(${apiImageCityURL}${encodeURI(city)})`

  weatherContainer.classList.remove("hide")
}


// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
    const city = cityInput.value;
    loading.classList.remove("hide")
    weatherContainer.classList.add("hide")

    showWeatherData(city);
  
})

cityInput.addEventListener("keyup", (e)=>{
  if(e.code === "Enter"){
    const city = e.target.value
    loading.classList.remove("hide")
    weatherContainer.classList.add("hide")
    showWeatherData(city)
  }
})

