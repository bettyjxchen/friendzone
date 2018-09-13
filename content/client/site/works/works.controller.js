(function () {

    angular
        .module('client.layout')
        .controller('worksController', WorksController)

    WorksController.$inject = ['$window', '$timeout', '$location', '$anchorScroll']

    function WorksController($window, $timeout, $location, $anchorScroll) {
        var vm = this

        vm.scrollToTop = _scrollToTop

        init()

        function init() {
            $window.themeAll()
            // $timeout(() => $window.App().init())
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