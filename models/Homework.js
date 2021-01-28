const { v4: uuidv4 } = require('uuid');
class Homework {

    constructor(homework) {
        this.id = uuidv4(),
            this.nombre_tarea = homework.nombre_tarea,
            this.fecha_entrega = homework.fecha_entrega,
            this.descripcion = homework.descripcion,
            this.id_curso = homework.id_curso
    }
}
module.exports = Homework