const cityArray = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara",
"Antalya","Artvin","Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu",
"Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne",
"Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane",
"Hakkari","Hatay","Isparta","İçel (Mersin)","İstanbul","İzmir","Kars",
"Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya",
"Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde",
"Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat",
"Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray",
"Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır",
"Yalova","Karabük","Kilis","Osmaniye","Düzce"];

const key = "7d1e15416e0cacf9517c725658032d9b"; //Key for weather API
var selectOption = document.getElementById("citySelect");
var flag = 0;
//Display current date
document.getElementById("date").innerHTML = new Date().toDateString();

function weather(cityName) {
    //Get weather data and display
    if(flag  ==  0) return;
    fetch( "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +  ",tr&APPID=" + key )
    .then( function(resp) { return resp.json(); } ) // Convert data to json
    .then( function(data) {
        var src;
        data = data.list[0];
        document.getElementById("display").innerHTML = data.weather[0].description + " " + KtoC(data.main["temp"]) + "°C";
        document.getElementById("icon").src = "https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png";
    })
}

function KtoC(t1){
    return (t1-272.15).toFixed(2);
}

for(var i = 0; i < cityArray.length; i++){
    var opt = document.createElement("option");
    opt.textContent = cityArray[i];
    opt.value = cityArray[i];
    selectOption.options.add(opt);
}

window.onload  =  flag => {
    flag = 1;
    console.log(flag);
}
