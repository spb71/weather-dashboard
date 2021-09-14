var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");

var APIKey = config.SECRET_API_KEY;

function weatherData (cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(weatherURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}

searchButtonEl.addEventListener("click", function() {
    var searchValue = searchInputEl.value;
    weatherData(searchValue);
    
})