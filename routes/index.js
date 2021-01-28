const express = require("express");
const user = require("../controllers/user");
const homework = require("../controllers/homework");
const course = require("../controllers/course");
const usercurso = require("../controllers/usercurso");
const tarea = require('../controllers/tarea');

const api = express.Router();
const dbConnection = require("../connect");
const connection = dbConnection();

api.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

api.get("/", function(req, res) {
    res.render("principal");
});

api.get("/curso/:id/:iduser", (req, res) => {
    const { id, iduser } = req.params;
    /* console.log(iduser); */
    let userid = [];
    connection.query("SELECT * FROM curso WHERE id = ?", [id], (err, result) => {
        userid = result[0].creador;
        connection.query("SELECT * FROM tarea WHERE id_curso = ?", [id], (err, result) => {
            profesor = false
            if (iduser == userid) profesor = true
            res.render("curso", { result, profesor, curso_id: id, userid, iduser });
        });
    });
});

api.get("/crearcurso/:id", function(req, res) {
    const { id } = req.params;
    res.render("crearCurso", { userid: id });
});

api.get("/creartarea/:id/:userid", function(req, res) {
    const { id, userid } = req.params;
    res.render("crearTarea", { cursoid: id, userid });
});

api.get("/login", function(req, res) {
    res.render("login");
});

api.get("/register", function(req, res) {
    res.render("register");
});

api.get("/dashboard/:id", function(req, res) {
    const { id } = req.params
    let cursos = []
    let cursos2 = []
    connection.query("SELECT * FROM curso WHERE creador = ?", [id], (err, result) => {
        cursos = result
    });
    connection.query("SELECT * FROM curso, usuario_curso WHERE id = id_curso AND id_usuario = ?", [id], (err, result) => {
        /* console.log(result); */
        cursos2 = result
    });
    connection.query("SELECT * FROM usuario  WHERE id = ? ", [id], (err, result) => {

        if (result == '') res.send('404');
        res.render("home", { result, cursos, userid: id, cursos2 });
    });
});

api.get("/lista/:id", (req, res) => {
    const { id } = req.params
    let personas = [];
    connection.query("SELECT * FROM usuario ,usuario_tarea WHERE id = id_usuario AND id_tarea = ?", [id], (err, result) => {
        personas = result;
    });
    connection.query("SELECT * FROM tarea WHERE id = ?", [id], (err, result) => {
        res.render("lista", { personas, result });
    });

});

api.post("/user", user);
api.post("/homework", homework);
api.post("/course", course);
api.post('/usercurso', usercurso);
api.post('/tarea', tarea);
api.post("/login", (req, res) => {
    res.send("Registrado");
});

module.exports = api;