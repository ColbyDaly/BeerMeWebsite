/* James Houston
 * BeerMe ©2017
 * Server.js
 */

const mongoose = require('mongoose');

/*
 *  SCHEMA
 */
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    hash: {
        type: String
    }    
});

/*
 *  MODEL
 */
var User = mongoose.model('User', userSchema);

/*
 *  EXPORTS
 */
module.exports.user = User; 
