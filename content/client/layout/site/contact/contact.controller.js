(function() {
	angular
		.module("client.layout")
		.controller("contactController", ContactController);

	ContactController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function ContactController($location, $anchorScroll, $timeout) {
		var vm = this;

		init();

		function init() {
			_scrollToTop();
		}

		function _scrollToTop() {
			$timeout(() => {
				$location.hash(" ");
				$anchorScroll();
			});
		}
	}
})();
