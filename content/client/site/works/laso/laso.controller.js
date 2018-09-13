(function () {

    angular
        .module('client.site')
        .controller('lasoController', LasoController)

    LasoController.$inject = ['$window', '$timeout', '$location', '$anchorScroll']

    function LasoController($window, $timeout, $location, $anchorScroll) {
        var vm = this

        init()
        
        function init() {
            // $timeout(() => $window.App().init())
            $window.themeAll()
            _scrollToTop()
        }

        function _scrollToTop() {
            $timeout(() => {
                $location.hash('')
                $anchorScroll()
            })
        }

    }


})();