var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var clearButtonEl = document.getElementById("clear-button");
var cityEl = document.getElementById("city");
var picEl = document.getElementById("pic");
var tempEl = document.getElementById("temperature");
var windEl = document.getElementById("wind");
var humidEl = document.getElementById("humidity");
var UVEl = document.getElementById("uv-index");
var forecastEls = document.querySelectorAll(".forecast");
var buttonsEl = document.getElementById("history");

var APIKey = config.SECRET_API_KEY;

function weatherData (cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(weatherURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var today = moment().format("MM/DD/YYYY");
        cityEl.innerText = data.name + " (" + today + ")";
        var pic = data.weather[0].icon;
        picEl.setAttribute("src", "https://openweathermap.org/img/wn/" + pic + "@2x.png");
        picEl.setAttribute("title", data.weather[0].description);
        picEl.setAttribute("alt", data.weather[0].description);
        var temp = Math.floor(data.main.temp * 1.8 - 459.67);
        tempEl.innerText = "Temp: " + temp + "ºF";
        windEl.innerText = "Wind Speed: " + data.wind.speed + "MPH";
        humidEl.innerText = "Humidity: " + data.main.humidity + "%";
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerText = data.current.uvi;
            UVEl.innerText = "UV Index: ";
            UVEl.append(UVIndex);
            for (var i = 0; i < forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
                var forecastIndex = data.daily[i];
                var forecastDate = document.createElement("h3");
                var forecastIcon = document.createElement("img");
                var forecastTemp = document.createElement("p");
                var forecastWind = document.createElement("p");
                var forecastHumid = document.createElement("p");
                forecastDate.innerText = moment(forecastIndex.dt*1000).format("MM/DD/YYYY");
                forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastIndex.weather[0].icon + "@2x.png");
                forecastIcon.setAttribute("title", forecastIndex.weather[0].description);
                var temp2 = Math.floor(forecastIndex.temp.day * 1.8 - 459.67);
                forecastTemp.innerText = "Temp: " + temp2 + "ºF";
                forecastWind.innerText = "Wind: " + forecastIndex.wind_speed + " MPH";
                forecastHumid.innerText = "Humidity: " + forecastIndex.humidity + "%";
                forecastEls[i].append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumid);
            }
        })
    })
}

searchButtonEl.addEventListener("click", function(e) {
    e.preventDefault();

    var searchValue = searchInputEl.value;
    weatherData(searchValue);
    renderSearchButtons(searchValue);
})

function renderSearchButtons(cityValue) {
    var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
    if (cityArray.includes(cityValue)) {
        return;
    }
    buttonsEl.innerHTML = "";
    if(cityValue) { 
        cityArray.push(cityValue);
    }
    for (var i = 0; i < cityArray.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "btn btn-info my-2");
        cityButton.textContent = cityArray[i];
        buttonsEl.append(cityButton);
    }
    localStorage.setItem("cities", JSON.stringify(cityArray));
}

clearButtonEl.addEventListener("click", function() {
    localStorage.clear();
    renderSearchButtons(false);
})

buttonsEl.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(e);
    weatherData(e.target.innerText);
})

renderSearchButtons(false);