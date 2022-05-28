const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");

const hbs = require("hbs");
const { query } = require("express");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicPath));

hbs.registerPartials(partialsPath);

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.search,
      });
    });
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sarthak",
  });
});

app.set("views", viewsPath);

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About this site",
    name: "Sarthak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sarthak",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
    errorMessage: "Article not Found",
    name: "Sarthak",
  });
});

app.get("/secret", (req, res) => {
  res.send([
    {
      name: "homeie",
      code: 54,
    },
  ]);
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
    errorMessage: "Page not Found",
    name: "Sarthak",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port + ". ");
});
