(function () {

    angular
        .module('client.layout')
        .controller('siteController', SiteController)

    SiteController.$inject = ['$window', '$timeout']

    function SiteController($window, $timeout) {
        var vm = this

        init()

        function init() {
            // $window.themeAll()
            // $timeout(() => $window.App().init())
        }

    }


})();