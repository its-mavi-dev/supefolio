var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
require("dotenv").config();

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
var inputName = "Spider man";

app.get("/", function (req, res) {
    const options = {
        method: 'GET',
        url: process.env.API_URL_ENDPOINT,
        params: {
            hero: inputName
        },
        headers: {
            'X-RapidAPI-Host': process.env.API_HOST,
            'X-RapidAPI-Key': process.env.API_KEY
        }
    };

    axios(options)
        .then(function (response) {
            var d = response.data;
            var variables = {
                supeName: d.name,
                intelligence: d.powerstats.intelligence,
                strength: d.powerstats.strength,
                speed: d.powerstats.speed,
                durability: d.powerstats.durability,
                power: d.powerstats.power,
                combat: d.powerstats.combat,
                supeImage: d.images.lg,
                fullName: d.biography.fullName,
                placeOfBirth: d.biography.placeOfBirth,
                alignment: d.biography.alignment,
                publisher: d.biography.publisher,
                gender: d.appearance.gender,
                race: d.appearance.race,
                eyeColor: d.appearance.eyeColor,
                hairColor: d.appearance.hairColor,
                aliasArray: d.biography.aliases
            };
            res.render("index", variables);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/", function (req, res) {
    inputName = req.body.inputSupeName;
    res.redirect("/");
});

app.listen(process.env.PORT, function () {
    console.log("Server is live.");
});