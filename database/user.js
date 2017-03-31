/**
 * Created by matan on 30/03/17.
 */

'use strict';

const randomstring = require('randomstring');
const { createHash } = require('crypto');
const { flatten, filter } = require('lodash');
const { getLocations } = require('../amadeus');

const {
    getClient
} = require('./mongo');

function getPassHash(password) {
    const hash = createHash('sha256');
    hash.update(`saltsalt${password}moresalt`);
    return hash.digest();
}

async function addFriend(username, friend) {
    const db = await getClient();
    await db.collection('User').updateOne({
        username
    }, {
        $addToSet: {
            friends: friend
        }
    });

    await db.collection('User').updateOne({
        username: friend
    }, {
        $addToSet: {
            friends: username
        }
    });
}

async function addWish(username, product) {
    const db = await getClient();
    await db.collection('User').updateOne({
        username
    }, {
        $addToSet: {
            wishlist: product
        }
    });
}

async function getFriendsWishesByCity(username, city) {
    const db = await getClient();
    const col = db.collection('User');
    const user = await col.findOne({ username });
    if (!user) return [];
    const friends = await col.find({ username: { $in: user.friends } }).toArray();
    const wishes = flatten(friends.map(friend => friend.wishlist));
    return filter(wishes, wish => wish.city === city);
}

async function getFriendsWishesByRecordLocator(username, record_locator) {
    const city = await getLocations(record_locator);
    return await getFriendsWishesByCity(username, city);
}

async function getUser(username) {
    const db = await getClient();

    return db.collection('User').findOne({
        username
    });
}

async function getUserPassword(username, password) {
    const db = await getClient();
    const passhash = getPassHash(password);

    return db.collection('User').findOne({
        username,
        passhash
    });
}

async function addUser(username, password, firstName, lastName) {
    const _id = randomstring.generate();
    const db = await getClient();
    const passhash = getPassHash(password);
    const friends = [];
    const wishlist = [];
    await db.collection('User').insertOne({
        username,
        passhash,
        firstName,
        lastName,
        friends,
        wishlist,
        _id
    });
    return _id;
}

module.exports = {
    addUser,
    getUser,
    getUserPassword,
    addWish,
    addFriend,
    getFriendsWishesByRecordLocator,
    getFriendsWishesByCity
};