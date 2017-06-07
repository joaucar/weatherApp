// JavaScript File
$(document).ready(function(){

var timezone = '';
var locate = '';
var clas ="";

var getWeather = function ( coordinates){
    // Using Dark Sky and JSONP
    $.ajax({
        url: `https://api.darksky.net/forecast/1c8c47a1ece4b45f8bf4ff662e61ff2b/${coordinates.lat},${coordinates.lng}`,
     
        // The name of the callback parameter, as specified by the Dark Sky service
        jsonp: "callback",
     
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
     
        // Work with the response
        success: function( response ) {
            console.log( 'Weather data', response ); // server response
            appendDays(response.daily.data);
        // Things called from Dark Sky  
            timezone = response.timezone;
            var currentTemp = Math.round(response.currently.temperature);
                changeTemp(currentTemp);
            var currentTime = moment.tz(timezone).format('LT');
                changeTime(currentTime);
            var currentHumid = response.currently.humidity*100;
                changeHumid(currentHumid);
        // Add Month        
                var d = new Date().getDate();
                var Month = new Date().getMonth();
    switch (Month){
        case 0 :
            Month= "January";
            break;
        case 1 :
            Month = "February";
            break;
        case 2 :
            Month = "March";
            break;
        case 3 :
            Month = "April";
            break;
        case 4 :
            Month = "May";
            break;
        case 5 :
            Month = "June";
            break;
        case 6 :
            Month = "July";
            break;
        case 7 :
            Month = "August";
            break;
        case 8 :
            Month = "September";
            break;
        case 9 :
            Month = "October";
            break;
        case 10 :
            Month = "November";
            break;
        default :
            Month = "December";
    }
            var currentDate = Month +" " + d;
                changeDate(currentDate);
                
        // Add Day of the Week            
            var daysOfWeek = ["Sunday", "Monday","Tuesday","Wednesday", "Thursday", "Friday","Saturday"];
                var today = new Date().getDay();
                var dOW = daysOfWeek[today];
                var currentDay = dOW;
                changeDay(currentDay);
            
            var currentType = response.currently.icon;
                changeType(currentType);

        //Change Icons
            var currentIcon = response.currently.icon;
                changeIcon(currentIcon);
    
        }
    });
};

var getLocation = function(location) {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyA9Wk5x27OSlLFGquAkDz3Owu004VO2h-0`,    
       
        success: function( response ){
            console.log( 'Location data', response );
            getWeather(response.results[0].geometry.location);
    }
});
};
    $('.btn').click(function(){
        locate = $('input[id=bar]').val();
        getLocation(locate);
        $('.city').empty();
        $('.city').append("Weather for:<br>"+locate);

    });



// Place info into HTML

function changeTemp(temperature) {
    var tempActual = $('#temp');
    tempActual.text(temperature + " F");
}
function changeTime(currentTime){
    var timeActual = $('.time');
    timeActual.text(currentTime);
}
function changeHumid(currentHumid){
    var humidActual = $('.humidity');
    humidActual.text(currentHumid+ "%");
}
function changeDate(currentDate){
    var dateActual = $('#date');
    dateActual.text(currentDate);
}
function changeDay(currentDay){
    var dayActual = $('#day');
    dayActual.text(currentDay);
}
function changeType(currentType){
    var typeActual = $('.type');
    typeActual.text(currentType);
}
function changeIcon(currentIcon){
    var pic1 = "currentPic";
    if (currentIcon == "sunny"){
            pic1 = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
            clas = "sun1";
        } else if ( currentIcon =="partly-cloudy-day" || currentIcon == "partly-cloudy-night"){
            pic1 = '<i class="fa fa-cloud" aria-hidden="true"></i>';
            clas = "cloud1";
        } else if (currentIcon == "rain"){
            pic1 = '<i class="fa fa-umbrella" aria-hidden="true"></i>';
            clas = "rain1";
        } else if (currentIcon == "snow"){
            pic1 = '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';
            clas = "snow1";
        } else {
            pic1 = '<i class="fa fa-lastfm" aria-hidden="true"></i>';
            clas = "wind1";
        }

    var iconActual = $('.pic1');
    iconActual.empty();
    iconActual.append(pic1);
    iconActual.removeClass('pic1');
    iconActual.addClass(clas);
}



function appendDays(days) {
    var i = 0;
    days.forEach(function(day) {
        console.log('day', day);
   
   // Days of the week
    var daysOfWeek = ["Sunday", "Monday","Tuesday","Wednesday", "Thursday", "Friday","Saturday"];
    var today = new Date().getDay()+i;
    switch (today % 7){
        case 0 % 7:
            today = daysOfWeek[0];
            break;
        case 1 % 7:
            today = daysOfWeek[1];
            break;
        case 2 % 7:
            today = daysOfWeek[2];
            break;
        case 3 % 7:
            today = daysOfWeek[3];
            break;
        case 4 % 7:
            today = daysOfWeek[4];
            break;
        case 5 % 7:
            today = daysOfWeek[5];
            break;
        case 6 % 7:
            today = daysOfWeek[6];
            break;
        default :
            today = daysOfWeek[0];
    }
    // Months of year
     var Month = "";
    switch (new Date().getMonth()){
        case 0 :
            Month= "January";
            break;
        case 1 :
            Month = "February";
            break;
        case 2 :
            Month = "March";
            break;
        case 3 :
            Month = "April";
            break;
        case 4 :
            Month = "May";
            break;
        case 5 :
            Month = "June";
            break;
        case 6 :
            Month = "July";
            break;
        case 7 :
            Month = "August";
            break;
        case 8 :
            Month = "September";
            break;
        case 9 :
            Month = "October";
            break;
        case 10 :
            Month = "November";
            break;
        default :
            Month = "December";
    }
    // Date d
    var d = new Date().getDate() + 1 + i;
    
    //Icons
    var pic = "";
    var type = "";
    var icon = day.icon;

if (icon == "sunny"){
    pic = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    type = "Sunny";
    clas = "sun"
} else if ( icon == "partly-cloudy-day" || icon == "partly-cloudy-night"){
    pic = '<i class="fa fa-cloud" aria-hidden="true"></i>';
    type = "Cloudy";
    clas = "cloud";
} else if (icon == "rain"){
    pic = '<i class="fa fa-umbrella" aria-hidden="true"></i>';
    type = "Rain";
    clas = "rain";
} else if (icon == "snow"){
    pic = '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';
    type = "Snow";
    clas = "snow";
} else {
    pic = '<i class="fa fa-lastfm" aria-hidden="true"></i>';
    type = "Windy";
    clas = "wind";
}
    
    
    // Append days
        $('.nextDays').append(`<div class="Day1">
        <div class="info">
            <div class="date">
                <h2>${Month +" "+ d} </h2>
                <h4>${today}</h4>
            </div>
            <div class="icon">
                <div class=${clas}>
                    ${pic}
                </div>
                <h4>${type}</h4>
            </div>
            <div class="weather">
                <p id="temp">${Math.round(day.temperatureMax)}&deg; F</p>
                <p id="temp-feel">${Math.round(day.temperatureMin)}&deg; F</p>
            </div>
            <div class="other">
                <p class="sun-set">Dew Point:</p>
                <p>${day.dewPoint}</p>
                <p class="sun-set">Wind Speed:</p>
                <p>${day.windSpeed}</p>
                <p class="perciptate">Chance of rain:</p>
                <p>${day.precipProbability*100}%</p>
            </div>
        </div>
        </div>`);
        i ++
    });
}


    
    
});
