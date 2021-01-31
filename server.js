const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

//parse request of content-type app/json
app.use(bodyParser.json());

//parse request of content type- app/x-www-form-urlencoded
app.use(bodyParser.json());

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to TitoYb app"});
});

//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}.');
});