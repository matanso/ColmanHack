/**
 * Created by matan on 30/03/17.
 */

'use strict';

const { Router } = require('express');
const bodyParser = require('body-parser');
const { auth, login, register } = require('./auth');

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', register);

router.post('/login', login);

router.use(auth);

//authenticated



module.exports = {
    router
};