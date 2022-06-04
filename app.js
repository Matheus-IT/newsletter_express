const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

const port = 3000;
app.listen(port, () => {
	console.log("Listening on port " + port);
});
