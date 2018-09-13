(function () {

    angular
        .module('client.site')
        .controller('snappleController', SnappleController)

    SnappleController.$inject = ['$window', '$location', '$timeout', '$anchorScroll']

    function SnappleController($window, $location, $timeout, $anchorScroll) {
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