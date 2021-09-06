const express = require("express");
const https = require("https");

//open waether API key : e1f7c8102224cf51062b874b79e6ed96
const app = express();
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
      console.log("received");

      const query = req.body.cityName;
      const unit = req.body.temperatureUnit;
      const apiKey = "e1f7c8102224cf51062b874b79e6ed96";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ unit;
      https.get(url, function(responce) {
          console.log(responce.statusCode);

          responce.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const weatherDescription = weatherData.weather[0].description;

            // console.log(temp);
            // console.log(weatherDescription);
            // console.log(icon);

            res.write('<head><meta charset="utf-8"></head>');
            res.write("The temperature in " + query + " is " + temp + " " + "kelvin" + "<br>");
            res.write("The weather is currently " + weatherDescription + "<br>");
            res.write("<img src=" + imageURL + ">");
            res.send();
          });
        });
      });

      app.listen(3000, function() {
        console.log("Server is live on port 3000");
      });
