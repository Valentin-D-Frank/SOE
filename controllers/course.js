const Course = require('../models/Course');
const dbConnection = require('../connect');
const connection = dbConnection();

userOperation = function(req, res) {
    const command = req.body.command

    console.log(req.body);
    switch (command) {
        case 'REGISTER_COURSE':
            registerCourse(req, res)
            break
        default:
            return res
                .status(500)
                .send({
                    status: 'ERROR',
                    message: 'No se ha encontrado la operación en CURSO'
                })
    }
}

function registerCourse(req, res) {
    const course = req.body.transaction
    const newCourse = new Course(course)

    console.log(req.body.transaction);
    connection.connect()
    connection.query(
        'INSERT INTO curso values(?,?,?,?)', [newCourse.id,newCourse.nombre_curso, newCourse.id_usuario, newCourse.descripcion],
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
}
module.exports = userOperation