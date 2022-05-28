const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = searchTerm.value;
  m1.textContent = "Loading...";
  m2.textContent = "";
  fetch("/weather?search=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        m1.textContent = data.error;
      } else {
        m1.textContent = "Location: " + data.location;
        m2.textContent = "Forecast: " + data.forecast;
      }
    });
  });
});
