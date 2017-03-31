/**
 * Created by matan on 30/03/17.
 */

'use strict';

const {
    addWish,
    addFriend,
    getFriendsWishesByRecordLocator,
    getFriendsWishesByCity
} = require('../database').User;


async function addFriendEndpoint(req, res) {
    const {
        user
    } = req.session;
    const {
        friend
    } = req.body;

    //addFriend(user.username, )
}