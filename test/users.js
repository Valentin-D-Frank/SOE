const axios = require('axios');

class Users {
    static all() {
        return axios.get('/users.json');
    }
}
module.exports = Users;
