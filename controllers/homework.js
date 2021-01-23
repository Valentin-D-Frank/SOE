const Usuario = require('../models/Homework');
const dbConnection = require('../connect');
const connection = dbConnection();

userOperation = function (req, res) {
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
                    message: 'No se ha encontrado la operación'
                })
    }
}

function registerHomework(req, res) {
    const user = req.body.transaction
    const newHomework = new Homework(course)

        connection.connect()
        connection.query(
            'INSERT INTO tarea(nombre_tarea,fecha_entrega_tarea,tipo_entrega,id_curso,archivo) values(?,?,?,?,?)',
            [newHomework.nombre_tarea, newHomework.fecha_entrega, newHomework.tipo_entrega,
                newHomework.id_curso,newHomework.archivo],
            (err, result) => {
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
                        message: 'Curso registrado correctamente'
                    })
            }
        }) 
        connection.end()
            /*.then((res) => {
                return res
                    .status(200)
                    .send({
                        status: 'SUCCESS',
                        message: 'Usuario registrado correctamente'
                    })
            })
            .catch((err) => {
                return res
                    .status(200)
                    .send({
                        status: 'FAILED',
                        message: err
                    })

            })*/
    
}
module.exports = userOperation