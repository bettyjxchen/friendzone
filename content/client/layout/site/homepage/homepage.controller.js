(function() {
	angular
		.module("client.layout")
		.controller("homepageController", HomepageController);

	HomepageController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function HomepageController($location, $anchorScroll, $timeout) {
		var vm = this;

		init();

		function init() {
			_scrollToTop();
		}

		function _scrollToTop() {
			$timeout(() => {
				$location.hash("top");
				$anchorScroll();
			});
		}
	}
})();
