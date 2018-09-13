(function () {

    angular
        .module('client.layout')
        .controller('codeController', CodeController)

    CodeController.$inject = ['$window', '$timeout', '$location', '$anchorScroll']

    function CodeController($window, $timeout) {
        var vm = this

        init()

        function init() {
            // $timeout($window.themeAll)
            $window.themeAll()
        }

        function _scrollToTop() {
            $timeout(() => {
                $location.hash('')
                $anchorScroll()
            })
        }

    }


})();