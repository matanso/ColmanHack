/**
 * Created by matan on 30/03/17.
 */

'use strict';


const express = require('express');
const path = require('path');
const { port, secret } = require('config').get('app');
const { router } = require('./api');
const {
    getLocations
} = require('./amadeus');
const {
    getProducts
} = require('./product');
const session = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.set('trust proxy', 1); // trust first proxy

app.use(session({
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(({ session }, res, next) => {
    console.log(session);
    next();
});

app.get('/amadeus/:recordLocator', async (req, res) => {
    const {
        recordLocator
    } = req.params;
    const locations = await getLocations(recordLocator);
    res.send(JSON.stringify(locations));
});

app.get('/product/:title', async (req, res) => {
    console.log('product request');
    const {
        title
    } = req.params;
    console.log(title);
    const product = await getProducts(title);
    res.render('product', {img: product.img, price: product.price});
});

app.use(express.static(path.join(__dirname, './public')));

app.use('/api', router);

app.listen(port);
console.log(`App listening on port ${port}`);