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
        (err, result) => {
            console.log('EEEEEEEEEEEEE', err, result);
            if (err != null) console.log(err);
            if (result == '') {
                return res.status(200).send({
                    status: "Failed",
                    message: "No se encontro el usuario",
                });
            }
            if (result != '') {
                console.log('Result -> ', result);
                try {

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
                } catch {
                    console.log('Error en el try');
                }
            }

            // connection.end()
        }
    );
}

async function createAssignment  (req, res) {
    const id_c = req.params.id_c;
    const {a_name, a_description} = req.body;
    const a_file = await cloudinary(req.files.a_file.tempFilePath);    
    try {
        await pool.query('INSERT INTO assignment (c_id, a_name, a_description, a_file) VALUES ($1, $2, $3, $4)', [id_c, a_name, a_description, a_file]);
        const assignment = await (await pool.query('SELECT * FROM assignment ORDER BY id_a DESC LIMIT 1')).rows[0];
        res.status(200).json({
            message: 'Successfull added assignment',
            assignment
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
};


module.exports = userOperation;