const { v4: uuidv4 } = require('uuid');
class Course {

    constructor(course) {
        this.id = uuidv4(),
            this.nombre_curso = course.nombre_curso,
            this.id_usuario = course.id_usuario,
            this.descripcion = course.descripcion
    }
}
module.exports = Course