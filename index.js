/**
 * Created by matan on 30/03/17.
 */

'use strict';


const express = require('express');

const { getProducts } = require('./product');
const { port } = require('config').get('app');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/product/:name', async (req, res) => {
    const productName = req.params.name;
    console.log(`Getting product ${productName}`);
    const products = await getProducts(req.params.name);
    res.render('product', products[0]);
});

app.listen(port);
console.log(`App listening on port ${port}`);