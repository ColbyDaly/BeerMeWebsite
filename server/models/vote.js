/* James Houston
 * BeerMe ©2017
 * Vote.js
 */

const mongoose = require('mongoose');

/*
 *  SCHEMA
 */
var voteSchema = new mongoose.Schema({
    beerId: {
        type: String
    },
    userId: {
        type: String
    },
    upVote: {
        type: Boolean,
        default: false;
        
    },
    downVote: {
        type: Boolean,
        default: false
    }
});

/*
 *  MODEL
 */
var Vote = mongoose.model('Vote', voteSchema);

/*
 *  EXPORTS
 */
module.exports.user = Vote; 
