const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");
const dbConnection = require("../connect");
const connection = dbConnection();

userOperation = function(req, res) {
    const command = req.body.command;
    switch (command) {
        case "REGISTER_USER":
            registerUser(req, res);
            break;
        case "LOGIN_USER":
            loginUser(req, res);
            break;
        default:
            return res.status(500).send({
                status: "ERROR",
                message: "No se ha encontrado la operación",
            });
    }
};

function registerUser(req, res) {
    const user = req.body.transaction;
    const saltRounds = 10;
    const newUsuario = new Usuario(user);
    console.log(newUsuario);
    console.log(req.body.transaction);
    bcrypt.hash(newUsuario.password, saltRounds).then((hash) => {
        connection.connect();
        connection.query(
            "INSERT INTO usuario values(?,?,?,?)", [newUsuario.id, newUsuario.nombre, newUsuario.email, hash],
            (err, result) => {
                if (err) {
                    return res.status(200).send({
                        status: "FAILED",
                        message: err,
                    });
                } else {
                    return res.status(200).send({
                        status: "SUCCESS",
                        message: "Usuario registrado correctamente",
                    });
                }
            }
        );
        connection.end();
    });
}

function loginUser(req, res) {
    const newUsuario = new Usuario(req.body.transaction);
    connection.connect();
    console.log(req.body.transaction);
    /* await connection.query("SELECT * FROM usuario WHERE correo = ?", [newUsuario.email], (errr, ress) => {
        console.log('Rspuesta ', ress);
        console.log('Error', errr);
    }); */
    connection.query(
        "SELECT * FROM usuario WHERE correo = ?", [newUsuario.email],
        async(err, result) => {
            if (err) {
                return res.status(200).send({
                    status: "Failed",
                    message: "No se encontro el usuario",
                });
            }
            if (result != []) {
                console.log('Result -> ', result);
                bcrypt.compare(newUsuario.password, result.contrasenia,
                    (err2, result2) => {
                        console.log('Result2 -> ', result2);
                        if (err2) {
                            console.log('err2 -> ', err2);
                            return res.status(200).send({
                                status: "FAILED",
                                message: "La contraseña es incorrecta",
                            });
                        }
                        if (result2) {
                            return res.status(200).send({
                                status: "SUCCESS",
                                message: "Usuario logeado correctamente",
                            });
                        }
                    }
                );
            }

            // connection.end()
        }
    );
}
module.exports = userOperation;