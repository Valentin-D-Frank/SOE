const express = require("express");
const api = express.Router();
const dbConnection = require("../connect");
const connection = dbConnection();

api.get("/curso", (req, res) => {
    connection.query("describe curso", (err, result) => {
        res.json(result);
    });
});

api.get("/usuariotarea", (req, res) => {
    connection.query("describe usuario_tarea", (err, result) => {
        res.json(result);
    });
});
api.get("/tarea", (req, res) => {
    connection.query("describe tarea", (err, result) => {
        res.json(result);
    });
});
api.get("/usuario", (req, res) => {
    connection.query("describe usuario", (err, result) => {
        res.json(result);
    });
});
api.get("/usuariocurso", (req, res) => {
    connection.query("describe usuario_curso", (err, result) => {
        res.json(result);
    });
});

module.exports = api;