/* James Houston
 * BeerMe ©2017
 * App.js -- Client side
 */ 
(function() {
    var app = angular.module('beerMe', ['ngCookies', 'angular-jwt']);
    var user = {};
    // Nav
    app.directive('beerNav', function () {
        return {
            restrict: 'E',
            templateUrl: '/views/beerMe-nav.html',
            controller: 'NavController',
            controllerAs: 'nav'
        };
    });
    // Beers
    app.directive('beerItem', function() {
       return {
           restrict: 'E',
           templateUrl: '/views/beerMe-item.html',
           controller: 'BeerController',
           controllerAs: 'beers'
       };
    });
    
    // Controllers
    
    app.controller('NavController', [ '$cookies', 'jwtHelper', function($cookies, jwtHelper) {
        var token = $cookies.get('token');
        if(token) {
            var userData = jwtHelper.decodeToken(token);
            this.name = userData.username.split(' ')[0];
            user.name = this.name;
        }
    }]);
    
    app.controller('BeerController', ['$http', function($http) {
        var beers = this;
        var query = '/beerList/'
        beers.user = user.name;
        beers.vote = { up: false, down: false };
        beers.flag = 'beers';
        beers.page = 1;
        beers.search = '';
        beers.style = '';
        beers.abv = '';
        beers.ibu = '';
        beers.getBeers = function(page) {
            beers.flag = 'beers';
            $http({
                method: 'GET',
                url: query + page
            }).then(function successCallback(beerItems) {
                beers.items = beerItems.data;
                beers.maxPage = beerItems.data.maxPages;
            }, function errorCallback(response) {
                console.log(response);
                this.error = response;
            });
        };
        beers.getBeers(beers.page);
        
        // Search controls
        beers.searchBeers = function() {
            beers.flag = 'beers';
            $http({
                method: 'GET',
                url: '/searchBeer/' + beers.search + '/1'
            }).then(function successCallback(beerItems) {
                beers.items = beerItems.data;
                beers.maxPage = beerItems.data.maxPages;
                query = '/searchBeer/' + beers.search + '/';
                beers.page = 1;
                beers.style = '';
                beers.abv = '';
                beers.ibu = '';
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        beers.searchStyle = function() {
            beers.flag = 'style';
            $http({
                method: 'GET',
                url: '/searchStyle/' + beers.style + '/1'
            }).then(function successCallback(beerItems) {
                beers.items = beerItems.data;
                beers.maxPage = beerItems.data.maxPages;
                query = '/searchStyle/' + beers.style + '/';
                beers.page = 1;
                beers.search = '';
                beers.abv = '';
                beers.ibu = '';
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        beers.searchAbv = function() {
            beers.flag = 'beers';
            $http({
                method: 'GET',
                url: '/searchAbv/' + beers.abv + '/1'
            }).then(function successCallback(beerItems) {
                beers.items = beerItems.data;
                beers.maxPage = beerItems.data.maxPages;
                query = '/searchAbv/' + beers.abv + '/';
                beers.page = 1;
                beers.search = '';
                beers.style = '';
                beers.ibu = '';
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        beers.searchIbu = function() {
            beers.flag = 'beers';
            $http({
                method: 'GET',
                url: '/searchIbu/' + beers.ibu + '/1'
            }).then(function successCallback(beerItems) {
                beers.items = beerItems.data;
                beers.maxPage = beerItems.data.maxPages;
                query = '/searchIbu/' + beers.ibu + '/';
                beers.page = 1;
                beers.search = '';
                beers.style = '';
                beers.abv = '';
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        
        // Vote controls
        beers.toggleClass = function(beer, button) {
            beer.up = {};
            beer.up.class = '';
            beer.down = {};
            beer.down.class = '';
            console.log('Here: ' + button);
            switch(button) {
                case 'up':
                    if(beer.up.class == 'active') {
                        beer.up.class = '';
                    } else if(beer.up.class == '') {
                        beer.up.class = 'active'
                    }
                    console.log(beer.up);
                    break;
                case 'down':
                    if(beer.down.class == 'active') {
                        beer.down.class = '';
                    } else if(beer.down.class == '') {
                        beer.down.class = 'active'
                    }
                    console.log(beer.down);
                    break;
            }
        };
        
        // Page controls
        beers.nextPage = function() {
            if(beers.page != beers.maxPage) {
                beers.getBeers(beers.page + 1);
                beers.page++;
            }
        };
        beers.prevPage = function() {
            if(beers.page != 1) {
                beers.getBeers(beers.page - 1);
                beers.page--;
            }
        };
    }]);
})();

