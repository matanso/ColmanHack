/**
 * Created by matan on 30/03/17.
 */

'use strict';

const unirest = require('unirest');
const { token } = require('config').get('webhose');

function getProducts(keyword) {
    return new Promise((resolve, reject) =>
        unirest.get(`http://webhose.io/productSearch?token=${token}&format=json&q=name%3A${keyword}`)
            .header("Accept", "text/plain")
            .end(({body}) => {
                    resolve(body.products.map(getProduct));
                }
            ));
}

const country_to_city = {
    US: "New York",
    GB: "London",
    NL: "Amsterdam",
    EU: "London"
};

function getProduct(productObj) {
    return {
        img: productObj.images[0],
        name: productObj.name,
        price: productObj.price.toString() + productObj.currency,
        city: country_to_city[productObj.source.country] || "Empty"
    };
}

module.exports = {
    getProducts
};