var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");

var APIKey = "1fdb6e8ffa8955ed716b68c2022423d7";

function weatherData (cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(weatherURL)
    .then(function(response){
        return response.json();
    })
}

searchButtonEl.addEventListener("click", function() {
    var searchValue = searchInputEl.value;
    weatherData(searchValue);
    
})