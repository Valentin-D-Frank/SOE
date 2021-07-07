const Course = require('../models/Course');
const dbConnection = require('../connect');
const connection = dbConnection();

userOperation = function(req, res) {
    const command = req.body.command
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

    connection.query(
        'INSERT INTO curso values(?, ?,?,?)', [newCourse.id, newCourse.nombre_curso, newCourse.descripcion, newCourse.id_usuario],
        (err, result) => {
            if (err) {
                return res
                    .status(200)
                    .send({
                        status: 'FAILED',
                        message: err
                    })
            } else {
                
            }
        })


}
module.exports = userOperation
