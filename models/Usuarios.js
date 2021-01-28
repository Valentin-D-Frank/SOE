const { v4: uuidv4 } = require('uuid');

class Usuario {

    constructor(user) {
        this.id = uuidv4(),
            this.nombre = user.name,
            this.email = user.email,
            this.password = user.password
            // this.createAt = user.createAt || new Date()
    }
}
module.exports = Usuario