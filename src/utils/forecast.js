const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=cfb7f3cd6107c7772ad189ffa794d97c&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions +
          "." +
          " It is currently " +
          response.body.current.temperature +
          " degress outside. There is a " +
          response.body.current.precip * 100 +
          "% chance of rain. " +
          "UV Index: " +
          response.body.current.uv_index
      );
    }
  });
};

module.exports = forecast;
