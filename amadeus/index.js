/**
 * Created by matan on 30/03/17.
 */

'use strict';

const unirest = require('unirest');
const { apikey } = require('config').get('amadeus');

const last_names_by_record_locator = {
    'KRF4V3' : "AMARNANI",
    '6Q63LA' : "SHAUL",
    '6Q3IO9' : "GAL",
    '6QNS9P' : "BUSHIN",
    '6QZDZY' : "SHTK",
    '6Q3G29' : "BOOKIL",
    '6Q3ICD' : "RUBIN"
};

function getLocations(record_locator) {
    const last_name = last_names_by_record_locator[record_locator];
    console.log("getting location...");
    return new Promise((resolve, reject) =>
        unirest.get(`https://api.sandbox.amadeus.com/v1.2/travel-record/${record_locator}?last_name=${last_name}&apikey=${apikey}`)
            .end(({body}) => {
                    resolve(parseAirport(body.reservation.unticketed_flights[0].flights[0].destination.airport));
                }
            ));
}

const airport_to_city = {
    CMN : "Casablanca",
    AMS : "Amsterdam",
    LTN : "London",
    JFK : "New York",
    EWR : "New York",
    LHR : "London"
};

function parseAirport(airport) {
    return airport_to_city[airport] || "Empty";
}

module.exports = {
    getLocations
};