 class Usuario {
    
    constructor(user){
        this.id= user.id,
        this.nombre = user.name,
        this.email = user.email,
        this.password = user.password
       // this.createAt = user.createAt || new Date()
    }
}
module.exports = Usuario