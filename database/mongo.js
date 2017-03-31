/**
 * Created by matan on 30/03/17.
 */

'use strict';

const mongoClient = require('mongodb').MongoClient;
const { url } = require('config').get('mongodb');

const listeners = [];

mongoClient.connect(url).then(db => {
    while (listeners.length) {
        listeners.pop()(db);
    }
});

async function getClient() {
    if (module.exports.db) return module.exports.db;
    return new Promise(resolve => listeners.push(resolve));
}

module.exports = {
    getClient
};