const cityArray = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara",
    "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu",
    "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne",
    "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
    "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars",
    "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya",
    "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde",
    "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray",
    "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır",
    "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];

const key = "7d1e15416e0cacf9517c725658032d9b"; //Key for weather API


var selectOption = document.getElementById("citySelect");
var t1 = document.getElementById("test");
var flag = 0, opt;
var position;
var pos;
//Display current date
document.getElementById("date").innerHTML = new Date().toDateString();

printSelectArray(cityArray);
weatherWithCoords();

function weatherWithName(cityName) {
    //Get weather data and display
    if (cityName) {
        fetchWeatherWithName(cityName,displayWeather);
    }
}

function weatherWithCoords() {
    //Display weather based on user's coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showPosition(position) {
            fetchWeatherWithCoords(position.coords.latitude, position.coords.longitude,displayWeather) ;
        });
    }
}

function displayWeather(data) {
    t1.innerHTML = "Latitude: " + data.city.coord.lat.toFixed(2) + 
    "<br>Longitude: " + data.city.coord.lon.toFixed(2);
    data = data.list[0];
    document.getElementById("display").innerHTML = data.weather[0].description + " " + kelvintoCelcius(data.main["temp"]) + "°C";
    document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

function fetchWeatherWithName(cityName,callback) {
    //Get weather data from API with city name.
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",tr&APPID=" + key)
            .then(function (resp) { return resp.json(); }) // Convert data to json
                .then(function (data) {
                    callback &&callback(data);
            });
}

function fetchWeatherWithCoords(latitude, longitude, callback) {
    //Get weather data from  API with user coordinates.

    t1.innerHTML = "Latitude: " + latitude.toFixed(2) + 
            "<br>Longitude: " + longitude.toFixed(2);

    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&APPID=" + key)
        .then(function (resp) { return resp.json(); }) // Convert data to json
            .then(function (data) {
                callback && callback(data); 
            });

}

function kelvintoCelcius(temprature) {
    return (temprature - 272.15).toFixed(2);
}

function printSelectArray(cityArray) {

    for (var i = 0; i < cityArray.length; i++) {
    opt = document.createElement("option");
    opt.textContent = cityArray[i];
    opt.value = cityArray[i];
    selectOption.options.add(opt);
    }
}
