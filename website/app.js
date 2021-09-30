const form = document.querySelector(".appForm");
const icons = document.querySelectorAll(".entryIcon");

const B_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=e81988de9e925868736ee6efb62f9e2f";

let date = new Date();
let newDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();

document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  const Zip = document.getElementById("zip").value;
  const content = document.getElementById("sense").value;

  Weather(B_URL, Zip, apiKey)
    .then(function (userinfo) {
      postreq("/weatherinfo", {
        date: newDate,
        temp: userinfo.main.temp,
        content,
      });
    })
    .then(function (newData) {
      renderUI();
    });
});

const Weather = async (B_URL, Zip, apiKey) => {
  const res = await fetch(B_URL + Zip + apiKey);
  try {
    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

const postreq = async (url = "/weatherinfo", data) => {
  console.log(data);
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const renderUI = async () => {
  const request = await fetch("/data");
  try {
    const allData = await request.json();
    console.log(allData);
    icons.forEach((icon) => (icon.style.opacity = "1"));
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
