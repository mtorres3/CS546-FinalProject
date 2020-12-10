const express = require("express");
const path = require("path");

const app = express();
app.use("/public", express.static(__dirname + "/public"));
app.set('views', express.static(__dirname + "/views"));

app.get('/', function (request, response) {
    response.sendFile(path.resolve("index.html"));
});

app.use("*", (req, res) => {
    res.status(404).json({error: "URL not found"});
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });