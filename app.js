const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
	apiKey: process.env.MY_KEY,
	server: process.env.SERVER_PREFIX,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets/"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const { firstName, lastName, email } = req.body;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);
	const url = `https://${process.env.SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.AUDIENCE_ID}`;
	const options = {
		method: "POST",
		auth: `matheus1:${process.env.MY_KEY}`,
	};

	const request = https.request(url, options, (response) => {
		response.on("data", (data) => {
			// console.log(JSON.parse(data));
		});
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
	});
	request.write(jsonData);
	request.end();
});

app.get("/failure", (req, res) => {
	res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Listening on port " + port);
});
