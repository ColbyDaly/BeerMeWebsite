/* James Houston
 * BeerMe ©2017
 * Server.js
 */

const mongoose = require('mongoose');

/*
 *  SCHEMA
 */
var beerSchema = new mongoose.Schema({
    beerId: {
        type: String
    },
    userId: {
        type: String
    },
    upVote: {
        type: Boolean
    },
    downVote: {
        type: Boolean
    }
});

/*
 *  MODEL
 */
var Beer = mongoose.model('Beer', beerSchema);

/*
 *  EXPORTS
 */
module.exports.beer = Beer; 
