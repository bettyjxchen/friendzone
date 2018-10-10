(function() {
	angular
		.module("client.layout")
		.controller("termsController", TermsController);

	TermsController.$inject = ["$location", "$anchorScroll", "$timeout"];

	function TermsController($location, $anchorScroll, $timeout) {
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
