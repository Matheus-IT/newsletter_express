const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets/"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const { firstName, lastName, email } = req.body;
	res.send(`${firstName} ${lastName} ${email}`);
});

const port = 3000;
app.listen(port, () => {
	console.log("Listening on port " + port);
});
