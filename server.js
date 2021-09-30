const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const projectData = {};

app.use("/", express.static("website"));

//GET route that returns the projectData object

app.post("/weatherinfo", (request, response) => {
  console.log(request.body, request.body);
  projectData.temp = request.body.temp;
  projectData.date = request.body.date;
  projectData.content = request.body.content;
  response.end();
  console.log(projectData);
});
app.get("/data", (request, response) => {
  response.send(projectData);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
