(function () {

    angular
        .module('homepage.layout')
        .controller('homepageController', HomepageController)

    HomepageController.$inject = ['messageService']

    function HomepageController(messageService) {
        var vm = this

        vm.formData = {}
        vm.isMessageSuccess = false
        vm.isMessageSuccess = false

        vm.submitMessage = _submitMessage

        init()

        function init() {

        }

        function _submitMessage() {
            if (vm.contactForm.$valid) {
                messageService.create(vm.formData)
                    .then(() => {
                        vm.formData = {}
                        vm.isMessageSuccess = true
                        vm.isMessageError = false
                    })
            }
            else {
                vm.isMessageError = true
            }
        }


    }


})();