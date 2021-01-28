const express = require("express");
const api = express.Router();
const dbConnection = require("../connect");
const connection = dbConnection();

api.get("/curso", (req, res) => {
    connection.query("describe curso", (err, result) => {
        res.json(result);
    });
});

api.get("/encuesta", (req, res) => {
    connection.query("describe encuesta", (err, result) => {
        res.json(result);
    });
});
api.get("/grupo", (req, res) => {
    connection.query("describe grupo", (err, result) => {
        res.json(result);
    });
});
api.get("/grupousuario", (req, res) => {
    connection.query("describe grupo_usuario", (err, result) => {
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