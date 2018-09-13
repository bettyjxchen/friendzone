/* global angular */
(function () {
    'use strict'

    angular.module('client.layout', ['ui.router'])
    angular.module('client.layout').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site', {
                views: {
                    'root': {
                        templateUrl: '/client/layout/site.tpl.html',
                        controller: 'siteController as siteCtrl',
                    }
                }
            })
    }
})();

/* global angular */
(function () {
    'use strict'

    angular.module('homepage.layout', ['ui.router'])
    angular.module('homepage.layout').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            // .state('reload', {
            //     url: '/',
            //     controller: function() {
            //         console.log('hi')
            //     }
            // })
            .state('home', {
                url: '/',
                // templateUrl: '/homepage.html',
                // controller: 'homeController as homeCtrl'
                // controller: function() {
                //     console.log('hi')
                // }
            })
    }
})();

/* global angular */
(function () {
    'use strict'

    angular.module('admin.layout', ['ui.router', 'client.admin'])
    angular.module('admin.layout').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    "content": {
                        controller: ['$state', function ($state) {
                            $state.go('admin.home')
                        }],
                    }
                },
                resolve: {
                    authenticate: authenticate
                }

            })
    }

    authenticate.$inject = ['$q', '$window', '$timeout', 'authenticationService']
    function authenticate($q, $window, $timeout, authenticationService) {
        let loginStatus = authenticationService.checkLoginStatus()
        if (loginStatus) {
            return $q.resolve()
        } else {
            $timeout(() => $window.location.href = "/login")
            // $state.go('authentication.login'))
            return $q.reject()
        }
    }

})();
