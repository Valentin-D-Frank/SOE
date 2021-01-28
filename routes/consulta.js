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


api.get("/usuariotarea", (req, res) => {
    connection.query("SELECT * FROM usuario_tarea", (err, result) => {
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

api.get('/insert', (req, res) => {
    connection.query('INSERT INTO usuario_tarea values(?,?,?)', [2, 3, 'tarea2.pdf'], (err, result) => {
        res.json(result);
    });
})

module.exports = api;