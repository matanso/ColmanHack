/**
 * Created by matan on 30/03/17.
 */

'use strict';

const { User } = require('../database');


async function login(req, res) {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    const {
        username,
        password
    } = req.body;

    console.log(`User ${username} is logging in`);

    const user = await User.getUserPassword(username, password);

    if (user) {
        res.session.loggedIn = true;
        req.session.user = user;
    }
    res.redirect('/');
}

async function register(req, res) {
    const {
        username,
        password,
        firstName,
        lastName
    } = req.body;

    console.log(`User ${username} is registering`);

    const user = await User.getUser(username);
    if (user) return res.redirect('/');

    await User.addUser(username, password, firstName, lastName);
    await login(req, res);
}

async function auth(req, res, next) {
    if (req.session.loggedIn) next();
    res.send({ success: false, err: 'Not authorized' });
}

module.exports = {
    auth,
    login,
    register
};