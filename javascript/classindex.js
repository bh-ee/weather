class Weather {
    constructor(cityName, description, temperature, icon) {
        this.cityName = cityName;
        this.temperature =  temperature;    //Temperature in  celcius.
        this.description =  description;    //Weather description.
        this.icon = icon;                   //Source url of icon.
    }

    fetchData(key) {
        console.log(this.cityName);
        var x = 0;
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + this.cityName + ",tr&APPID=" + key)
        .then(function (resp) { return resp.json(); }) // Convert data to json
            .then(function (data) {
               this.description = data.weather[0].description;
               this.temperature = kelvintoCelcius(data.main["temp"]);
            });

    }

    // fetchWeatherWithCoords(latitude, longitude) {
    //     //Get weather data from  API with user coordinates.
    
    //     t1.innerHTML = "Latitude: " + latitude.toFixed(2) + 
    //             "<br>Longitude: " + longitude.toFixed(2);
    
    //     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&APPID=" + key)
    //         .then(function (resp) { return resp.json(); }) // Convert data to json
    //             .then(function (data) {
    //                 this._cityName = data.city.name;
    //                 this._description = data.weather[0].description;
    //                 this._temperature = kelvintoCelcius(data.main["temp"]) + "°C";
    //                 this._icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    //             });
    
    // }

    static kelvintoCelcius(){
        return (temprature - 272.15).toFixed(2);
    }

    getWeatherWithCoords(){

    }

    set cityName(Name){
        this._cityName  = Name;
    }

    set description(desc){
        this._description  = desc;
    }

    set icon(ic){
        this._icon  = ic;
    }

    set temperature(temp){
        this._temperature  = temp + "°C";
    }

    get cityName(){
        return this._cityName;
    }

    get description(){
        return this._description;
    }

    get icon(){
        return this._icon;
    }

    get temperature(){
        return this._temperature;
    }

}

class City extends Weather {

    constructor(cityName, description, temperature, icon, latitude, longitude) {
        super(cityName, description, temperature, icon);
        this._latitude = latitude;
        this._longitude = longitude;
    }

    set latitude(lat){
        this._latitude  = lat;
    }

    set longitude(lon){
        this._longitude  = lon;
    }

    get latitude(){
        return this._latitude;
    }

    get longitude(){
        return this._longitude;
    }

    display() {
        t1.innerHTML = "Latitude: " + this.latitude + 
        "<br>Longitude: " + this.longitude;

        setLocalStorage("time" + this.cityName, getCurrentTime());

        document.getElementById("display").innerHTML = this.description + " " + this.temperature;

        setLocalStorage("display" + this.cityName, this.description + " " + this.temperature);

        document.getElementById("icon").src = this.icon;
        
        setLocalStorage("icon" + this.cityName, this.icon);
    }

    static getLocalStorage(name) {
        return localStorage.getItem(name);
    }

    static setLocalStorage(){
        localStorage.setItem(name, value);
    }

}

function getCurrentTime() {
    var seconds = new Date().getTime() / 1000;
    return seconds;
}

const cityArray = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
"Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars",
"Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya",
"Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde",
"Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
"Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray",
"Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır",
"Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];

const key = "7d1e15416e0cacf9517c725658032d9b";

var selectOption = document.getElementById("citySelect");
var t1 = document.getElementById("test");
var flag = 0, opt;
var position;
var pos;

//Display current date
document.getElementById("date").innerHTML = new Date().toDateString();

printSelectArray(cityArray);


function selectWeather(cityname){

    var  currentCity = new City(cityname);

        var seconds = new Date().getTime() / 1000;
    
    if (currentCity.cityName) {
        if(timeDiffGreater(seconds,getTime(currentCity.cityName), 1)) {
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity.cityName + ",tr&APPID=" + key)
            .then(function (resp) { return resp.json();}) // Convert data to json
                .then(function (data) {
                    //console.log(this.latitude); //returns an error
                    currentCity.latitude = data.city.coord.lat.toFixed(2);
                    currentCity.longitude = data.city.coord.lon.toFixed(2);
                    data = data.list[0];
                    currentCity.description = data.weather[0].description;
                    console.log(currentCity.description);
                    currentCity.temperature = kelvintoCelcius(data.main["temp"]);
                    currentCity.icon =  "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                    currentCity.display();
                });
            var time = new Date().getTime() / 1000;
            setLocalStorage(currentCity.cityName, time);
            console.log("hello1");
        }else{
            document.getElementById("display").innerHTML = getLocalStorage("display" + currentCity.cityName);
            document.getElementById("icon").src = getLocalStorage("icon" + currentCity.cityName);
            console.log("hello0");
        }
    }


}

function timeDiffGreater(time1,time2,target){

    time1 /= 60;
    time2 /= 60;

    if(Math.abs(time1 -  time2) > target){
        return 1;
    }else{
        return 0;
    }
}

function getLocalStorage(name) {
    return localStorage.getItem(name);
}

function setLocalStorage(name, value){
    localStorage.setItem(name, value);
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

function fetchWeatherWithName(cityName,callback) {
    //Get weather data from API with city name.
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",tr&APPID=" + key)
        .then(function (resp) { return resp.json(); }) // Convert data to json
            .then(function (data) {
               callback && callback(data);
            });
}

function getTime(cityName) {
    if (getLocalStorage("time" + cityName) == undefined) {
        return 0;
    } else {
        return parseInt(getLocalStorage("time" + cityName));
    }
}

function getWeatherWithCoords() {
    //Display weather based on user's coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showPosition(position) {
            fetchWeatherWithCoords(position.coords.latitude, position.coords.longitude, displayWeather) ;
        });
    }
}