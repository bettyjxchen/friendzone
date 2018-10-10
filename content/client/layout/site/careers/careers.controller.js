(function() {
	angular
		.module("client.layout")
		.controller("careersController", CareersController);

	CareersController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function CareersController($location, $anchorScroll, $timeout) {
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
