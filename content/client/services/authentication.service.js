(function (){
    'use strict'

    angular.module('client.services')
        .factory('authenticationService', AuthenticationService)

    AuthenticationService.$inject = ['$cookies']

    function AuthenticationService($cookies) {
        return {
            getCurrentUser: _getCurrentUser,
            checkLoginStatus: _checkLoginStatus
        }

        function _getCurrentUser() {
            let cookie = $cookies.get('auth')
            cookie = cookie.split('j:').splice(1, 1)
            cookie = JSON.parse(cookie[0])
            return cookie
        }

        function _checkLoginStatus() {
            let cookie = $cookies.get('auth')
            if (!cookie) { 
                return false 
            }
            else { 
                return true 
            }
        }

    }

})()