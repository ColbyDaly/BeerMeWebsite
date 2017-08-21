/* James Houston
 * BeerMe ©2017
 * Server.js -- Server side
 */

const express = require('express');
const server = express();
const routes = require('./server/routes.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = "\xc4Ly\t\x94\x1b\xec\x1f\xb4\BeerMe\x93\x9e^\x91\x122\x9b1";

// Server configuration
server.use(cookieParser(secret));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Static content configuration
server.use('/app', express.static('.'));
server.use('/modules', express.static('node_modules'));
server.use('/img', express.static('app/static/img'));
server.use('/js', express.static('app/static/js'));
server.use('/css', express.static('app/static/css'));
server.use('/fonts', express.static('app/static/fonts'));
server.use('/views', express.static('app/views'));

// Server routes -- hoping to use angular after first route
server.use(routes);

// Running configuration
server.listen(process.env.PORT || 8080, function() {
   console.log('BeerMe running on port 8080\nUse ctrl-c to stop\n'); 
});