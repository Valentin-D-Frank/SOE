const Homework = require('../models/Homework');
const dbConnection = require('../connect');
const connection = dbConnection();

userOperation = function(req, res) {
    const command = req.body.command

    switch (command) {
        case 'REGISTER_HOMEWORK':
            registerHomework(req, res)
            break
        default:
            return res
                .status(500)
                .send({
                    status: 'ERROR',
                    message: 'No se ha encontrado la operación en Tarea'
                })
    }
}

function registerHomework(req, res) {
    const tarea = req.body.transaction
    const newHomework = new Homework(tarea)
    console.log('acscsaicnsaovabn');
    connection.query('INSERT INTO tarea values(?,?,?,?,?)', [newHomework.id, newHomework.nombre_tarea, newHomework.descripcion, newHomework.fecha_entrega, newHomework.id_curso], (err, result) => {
        if (err) {
            return res
                .status(200)
                .send({
                    status: 'FAILED',
                    message: err
                })
        } else {
            return res
                .status(200)
                .send({
                    status: 'SUCCESS',
                    message: 'Tarea registrado correctamente'
                })
        }
    })


}
module.exports = userOperation