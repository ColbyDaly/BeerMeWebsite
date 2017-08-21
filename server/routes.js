/* James Houston
 * BeerMe ©2017
 * Routes.js
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http');
const db = require('./db.js');
const secret = "\xc4Ly\t\x94\x1b\xec\x1f\xb4\BeerMe\x93\x9e^\x91\x122\x9b1";

// Authentication function 
function auth(req, res, next) {
    if(!req.cookies.token) {
        res.redirect('/login');
    } else {
        var token = req.cookies.token;
        var valid = jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                res.redirect('/login');
            }
            next();
        });
    }
};

/*
 *  HOME
 */
router.get('/', function(req, res) {
    console.log('GET::HOME');
    res.sendFile(path.join(__dirname + '/../app/views/home.html'));
});

/*
 *  LOGIN
 */
router.get('/login', function(req, res) {
    console.log('GET::LOGIN');
    res.sendFile(path.join(__dirname + '/../app/views/login.html'));
});
router.post('/login', function(req, res) {
    console.log('POST::LOGIN');
    req = req.body;
    var email = req.email,
        password = req.password;
    db.login(email, password, function(response) {
        if(response.success) {
            var userData = {
                username: response.name,
                email: email
            };
            delete response.name;
            var token = jwt.sign(userData, secret);
            res.cookie('token', token);
        }
        res.json(response);        
    });
});
router.get('/logout', function(req, res) {
    console.log('GET::LOGOUT');
    res.clearCookie('token');
    res.send('Successfully logged out');
});

/*
 *  REGISTER
 */
router.get('/register', function(req, res) {
    console.log('GET::REGISTER');
    var cookie = req.cookies;
    console.log(cookie);
    res.send('Register page');
});
router.post('/register', function(req, res) {
    console.log('POST::REGISTER');
    req = req.body;
    console.log(req);
    var name = req.name,
        email = req.email,
        password = req.password;
    db.register(name, email, password, function(response) {
        console.log('response: ' + response.error);
        res.json(response);
    });
});

router.get('/beers', function(req, res) {
    res.sendFile(path.join(__dirname + '/../app/views/beers.html'));
});
router.get('/beerList/:page', function(req, res) {
    var options = {
        host: 'api.brewerydb.com',
        path: '/v2/beers/?p='+ encodeURIComponent(req.params.page) + '&key=cfd720b8354b5797fdab2bba6a15345a'
    };
    http.get(options, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            var data = JSON.parse(str);
            var beerData = {maxPages: data.numberOfPages, data: []};
            var rawData = data.data;
            // Iterate over page (max size is 50) and split into groups of 5
            for(var i = 0; i < 50; i+=5) {
                beerData.data.push(rawData.slice(i, i+5));
            }
            res.json(beerData);
        });
    });
});
router.get('/searchBeer/:query/:page', function(req, res) {
    var options = {
        host: 'api.brewerydb.com',
        path: '/v2/search/?q='+ encodeURIComponent(req.params.query) + '&p=' + encodeURIComponent(req.params.page) + '&key=cfd720b8354b5797fdab2bba6a15345a'
    };
    http.get(options, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            var data = JSON.parse(str);
            var beerData = {maxPages: data.numberOfPages, data: []};
            var rawData = data.data;
            // Iterate over page (max size is 50) and split into groups of 5
            for(var i = 0; i < 50; i+=5) {
                if(rawData) {
                    beerData.data.push(rawData.slice(i, i+5));
                }
            }
            res.json(beerData);
        });
    });
});
router.get('/searchStyle/:query/:page', function(req, res) {
    var options = {
        host: 'api.brewerydb.com',
        path: '/v2/search/style/?q='+ encodeURIComponent(req.params.query) + '&p=' + encodeURIComponent(req.params.page) + '&withDescriptions=Y&key=cfd720b8354b5797fdab2bba6a15345a'
    };
    http.get(options, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            var data = JSON.parse(str);
            var beerData = {maxPages: data.numberOfPages, data: []};
            var rawData = data.data;
            // Iterate over page (max size is 50) and split into groups of 5
            for(var i = 0; i < 50; i+=5) {
                if(rawData) {
                    beerData.data.push(rawData.slice(i, i+5));
                }
            }
            res.json(beerData);
        });
    });
});
router.get('/searchAbv/:query/:page', function(req, res) {
    var options = {
        host: 'api.brewerydb.com',
        path: '/v2/beers/?abv='+ encodeURIComponent(req.params.query) + '&p=' + encodeURIComponent(req.params.page) + '&key=cfd720b8354b5797fdab2bba6a15345a'
    };
    http.get(options, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            var data = JSON.parse(str);
            var beerData = {maxPages: data.numberOfPages, data: []};
            var rawData = data.data;
            // Iterate over page (max size is 50) and split into groups of 5
            for(var i = 0; i < 50; i+=5) {
                if(rawData) {
                    beerData.data.push(rawData.slice(i, i+5));
                }
            }
            res.json(beerData);
        });
    });
});
router.get('/searchIbu/:query/:page', function(req, res) {
    var options = {
        host: 'api.brewerydb.com',
        path: '/v2/beers/?ibu='+ encodeURIComponent(req.params.query) + '&p=' + encodeURIComponent(req.params.page) + '&key=cfd720b8354b5797fdab2bba6a15345a'
    };
    http.get(options, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            var data = JSON.parse(str);
            var beerData = {maxPages: data.numberOfPages, data: []};
            var rawData = data.data;
            // Iterate over page (max size is 50) and split into groups of 5
            for(var i = 0; i < 50; i+=5) {
                if(rawData) {
                    beerData.data.push(rawData.slice(i, i+5));
                }
            }
            res.json(beerData);
        });
    });
});

/*
 *  PROTECTED
 */
router.get('/getVote', auth, function(req, res) {
    var user = req.query.user;
    var beer = req.query.beerId;
    db.getVote(beer, user, function(response) {
        console.log(response);
        res.json(response);
    });
    
    db.addVote('test', 'James', false, false, function(response) {
        console.log(response);
        db.getVote('test', 'James', function(response) {
            res.json(response);
        });
    });
    
});

/*
 *  WILDCARD
 */
router.get('*', function(req, res) {
    res.send('Wildcard request');
});

/*
 *  EXPORTS
 */
module.exports = router;