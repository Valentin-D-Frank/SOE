"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const route = require("./routes");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(methodOverride());
app.use(cors());
app.use(route);
app.use("/static", express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    res.status(404).send("Pagina 404");
});

module.exports = app;