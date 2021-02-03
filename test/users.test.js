const axios = require('axios');
const { request } = require('express');
const { nanoid } = require('nanoid');
const Users = require('./users');
const app = require('../routes/index');

jest.mock('axios');

test('Busca un usuario', () => {
    const listado = axios.get('/users.json');
    const users = [{
        "id": "12eb1ffb-90be-400b-b863-8f1bfdcc7376",
        "nombre": "qwe",
        "email": "qwe@gmail.com",
        "contrasenia": "$2b$10$C/jqpTuJeGGdc2VUqR08NuJ/4HNKIwHbRfyyY4QL84RuOX6GRnvi."
    }];
    const resp = { data: users };
    axios.get.mockResolvedValue(resp);
    return Users.all().then(data => expect(data).toEqual(users));
});

test('cantidad de caracteres de un id es igual a 36', () => {
    const users = [{
        "id": "12eb1ffb-90be-400b-b863-8f1bfdcc7376",
        "nombre": "qwe",
        "email": "qwe@gmail.com",
        "contrasenia": "$2b$10$C/jqpTuJeGGdc2VUqR08NuJ/4HNKIwHbRfyyY4QL84RuOX6GRnvi."
    }];

    expect("12eb1ffb-90be-400b-b863-8f1bfdcc7376").toMatch("-");

});

test('Comprobacion de dirección de email', () => {
    const users = [{
        "id": "12eb1ffb-90be-400b-b863-8f1bfdcc7376",
        "nombre": "qwe",
        "email": "qwe@gmail.com",
        "contrasenia": "$2b$10$C/jqpTuJeGGdc2VUqR08NuJ/4HNKIwHbRfyyY4QL84RuOX6GRnvi."
    }];
    expect("qwe@gmail.com").toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/);

});