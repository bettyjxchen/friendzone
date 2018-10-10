(function() {
	angular.module("client.layout").controller("faqController", FaqController);

	FaqController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function FaqController($location, $anchorScroll, $timeout) {
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
