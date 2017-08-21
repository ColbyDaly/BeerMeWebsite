/* James Houston
 * BeerMe ©2017
 * DB.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;
const userModel = require('./models/user.js');
const User = userModel.user;
const beerModel = require('./models/beer.js');
const Beer = beerModel.beer;

// Additional Promise library -- mongoose default is depreciated
mongoose.Promise = require('bluebird');
var dbConnect = mongoose.connect('mongodb://Admin:BeerMeDB@ds051543.mlab.com:51543/heroku_7btqqtmb', {
    useMongoClient: true
});

/*
 *  STARTUP EVENT LOG
 */
var db = mongoose.connection;
db.once('open', function() {
    console.log('MONGODB::CONNECTED');
});
db.on('error', function(error) {
    console.log('MONGODB::ERROR ' + error);    
});

module.exports.register = function(name, email, password, callback) {
    bcrypt.hash(password, salt, function(error, hash) {
       if(error) {
           console.log('BCRYPT::ERROR');
       } else {
           var newUser = new User({
               name: name,
               email: email,
               hash: hash
           });
           newUser.save(function(error, savedUser) {
               if(!error) {
                   callback({ success: 'Successfully registered. Please log in' });
               } else {
                   console.log('error: ' + error.errmsg);
                   if(error.code == 11000) {
                       var errorMsg = error.errmsg;
                       if(errorMsg.indexOf('name') != -1) {
                           callback({ error: 'Duplicate entry: Username' });
                       } else if (errorMsg.indexOf('email') != -1) {
                           callback({ error: 'Duplicate entry: Email' });
                       }
                   } else {
                       console.log(error);
                       callback({ error: 'Database error' });
                   }
                }
           });
       }
    });
};
module.exports.login = function(email, password, callback) {
    User.find({ email: email }, function(error, fResponse) {
        if(error) {
            // Database lookup error
            callback({ error: 'Database error' });
        } else {
            if(!fResponse) {
                // No users found with email
                callback({ error: 'Account \''+ email +'\' not found' });
            } else {
                bcrypt.compare(password, fResponse[0].hash, function(error, cResponse) {
                    if(error) {
                        // Compare error - bcrypt
                        callback({ error: 'Database error' });
                    } else {
                        if(cResponse) {
                            // Valid password
                            callback({ success: 'Successfully logged in', name: fResponse[0].name });
                        } else {
                            // Invalid password
                            console.log(error);
                            callback({ error: 'Invalid password' });
                        }
                    }
                });
            }
        }
    });
};
module.exports.getVote = function(beer, user, callback) {
    Beer.find({ beerId: beer, userId: user }, function(error, response) {
        if(error) {
            // DB error
            console.log(error);
            callback({ error: 'Database error' });
        } else {
            callback(response);
        }
    });
};
module.exports.addVote = function(beer, user, up, down, callback) {
    // Update if already entry for user/beer
    Beer.findOne({ beerId: beer, userId: user }, function(error, response) {
        if(error) {
            // DB error
            console.log(error);
            callback({ error: 'Database error' });
        } else {
            console.log(response);
            if(response) {
                Beer.update({ upVote: up, downVote: down }, function() {
                    callback({ success: 'Vote updated' });
                });
            }
            else {
                // No vote found, add vote
                var newVote = new Beer({
                    beerId: beer,
                    userId: user,
                    upVote: up,
                    downVote: down
                });
                newVote.save(function(error, savedVote) {
                    if(!error) {
                        callback({ success: 'Vote added' });
                    } else {
                        console.log('error: ' + error.errmsg);
                        console.log(error);
                        callback({ error: 'Database error' });
                    }
                });
            }
        }
    });
}
