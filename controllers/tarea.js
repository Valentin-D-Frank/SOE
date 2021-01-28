const dbConnection = require("../connect");
const connection = dbConnection();

userOperation = function(req, res) {
    const command = req.body.command;
    switch (command) {
        case "ENVIO_TAREA":
            envioTarea(req, res);
            break;
        default:
            return res.status(500).send({
                status: "ERROR",
                message: "No se ha encontrado el archivo",
            });
    }
};

function envioTarea(req, res) {
    const tarea = req.body.transaction;
    console.log('Tarea ->', tarea);
    /* connection.query(
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
    ); */
}


module.exports = userOperation;