$(document).ready(function(){
  var long;
  var lat;
  var tempUnit = 'C';
  var cel;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    long = position.coords.longitude;
    lat = position.coords.latitude;
    $("#data").html("longitude " + long + " latitude "+ lat);
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat+"&lon="+long , function(a){
      cel = Math.round(a.main.temp * 10) / 10;
      $('#location').html(a.name+", "+ a.sys.country);
      $("#weather").html("<img src=" + a.weather[0].icon + ">" + a.weather[0].description);
      $("#temp").html(cel+ " " + String.fromCharCode(176));
      $("#tempUnit").html(tempUnit);
      $('#humidity').html(a.main.humidity+"%");
    });
    });
  }else{
    console.log("Geolocation is not supported by this browser.");
  }
  $("#tempUnit").click(function () {
    var currentTempUnit = $("#tempUnit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempUnit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(cel + " " + String.fromCharCode(176));
    }
  });
  var current = $.now();
  var time = new Date(current);
  var currentDate = time.toString();
  var hour = time.getHours();
  var minute = time.getMinutes();
  $('#date').html(currentDate);
  if(hour < 10){
    $('#time').html(minute < 10 ? '0'+hour+' : '+'0'+minute : '0'+hour+' : '+ minute);
  }else{
    $('#time').html(minute < 10 ? hour+' : '+'0'+minute : hour+' : '+ minute);
  }
});