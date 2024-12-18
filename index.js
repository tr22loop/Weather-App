const emptyInput = document.getElementById("empty-input");
const srchBtn = document.getElementById("search-btn");
const srchCity = document.getElementById("search-city");

srchCity.addEventListener("keypress",(event)=>{
    if(event.key === "Enter")
    {
        srchBtn.click();
    }
    
});

const SearchButton = () =>{
    const searchInput = document.getElementById("search-city");
    const cityName = searchInput.value;
    emptyInput.textContent = "";

    if (cityName === "") {
        emptyInput.innerHTML = `
            <h4 class="text-center text-white mt-2">Please enter a city name to search...</h4>
        `;
    }
    searchInput.value= "";
   loadSearch(cityName);
};

//load weather API

const loadSearch = async(city) =>{
    const api = "d907990ed636c3af386309c5ec3f7534";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
    console.log(data);
};

// Display Weather

const displayWeather = (cityDetail) => {
    if(cityDetail.message === "city not found"){
        emptyInput.innerHTML = `
            <h4 class="text-center text-white mt-3">No weather data found !</h4>
        `;
    }

    const container = document.getElementById("container");
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(cityDetail.dt);
    const sunriseTime = convertUnixTimeToLocal(cityDetail.sys.sunrise);
    const sunsetTime = convertUnixTimeToLocal(cityDetail.sys.sunset);
    const div = document.createElement("div");

    div.innerHTML = `
        <h4 class="fs-2">${cityDetail.name}, ${cityDetail.sys.country}</h4>
        <h6>${localDate.fullDate}</h6>
        <img src="http://openweathermap.org/img/wn/${cityDetail.weather[0].icon}@2x.png" alt="">
        <h5 class="fs-1">${cityDetail.main.temp} &deg;C</h5>
        <h5>${cityDetail.weather[0].main}</h5>
        <h5><span class="me-3">Sunrise: ${sunriseTime.time12h}</span> & <span class="ms-3">Sunset: ${sunsetTime.time12h}</span></h5>
        <h5>Wind Speed: ${cityDetail.wind.speed}m/s & Degree: ${cityDetail.wind.deg}&deg;C</h5>
          
    `;
    container.appendChild(div);
};

loadSearch("Dhaka");

// convert unix time to local format
const convertUnixTimeToLocal = (unixTime) => {
    const milliSeconds = unixTime * 1000;
    const humanDateFormat = new Date(milliSeconds);
    const convertedTimeObject = {
        fullDate: humanDateFormat.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
        time12h: humanDateFormat.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }),
    };
    return convertedTimeObject;
};
