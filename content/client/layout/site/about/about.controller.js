(function() {
	angular
		.module("client.layout")
		.controller("aboutController", AboutController);

	AboutController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function AboutController($location, $anchorScroll, $timeout) {
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
