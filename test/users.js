const axios = require('axios');

class Users {
    static all() {
        return axios.get('/user.json').then(resp => resp.data);
    }
}
module.exports = Users;
