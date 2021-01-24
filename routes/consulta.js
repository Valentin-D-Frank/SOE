const express = require("express");
const api = express.Router();
const dbConnection = require("../connect");
const connection = dbConnection();

api.get("/", (req, res) => {
    connection.query("show tables", (err, result) => {
        res.json(result);
    });
});

api.get("/usuario", (req, res) => {
    connection.query("SELECT * FROM usuario", (err, result) => {
        res.json(result);
    });
});

api.get("/curso", (req, res) => {
    connection.query("SELECT * FROM curso", (err, result) => {
        res.json(result);
    });
});

api.get("/encuesta", (req, res) => {
    connection.query("SELECT * FROM encuesta", (err, result) => {
        res.json(result);
    });
});

api.get("/grupo", (req, res) => {
    connection.query("SELECT * FROM grupo", (err, result) => {
        res.json(result);
    });
});

api.get("/grupousuario", (req, res) => {
    connection.query("SELECT * FROM grupo_usuario", (err, result) => {
        res.json(result);
    });
});

api.get("/tarea", (req, res) => {
    connection.query("SELECT * FROM tarea", (err, result) => {
        res.json(result);
    });
});

api.get("/usuariocurso", (req, res) => {
    connection.query("SELECT * FROM usuario_curso", (err, result) => {
        res.json(result);
    });
});

module.exports = api;