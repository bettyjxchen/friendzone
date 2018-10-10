/* global angular */
(function() {
	"use strict";

	angular.module("client.site", ["ui.router"]);

	angular.module("client.site").config(RouteConfig);

	RouteConfig.$inject = ["$stateProvider"];

	function RouteConfig($stateProvider) {
		$stateProvider
			.state("site.home", {
				url: "/",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/homepage/homepage.html",
						controller: "homepageController as homeCtrl"
					}
				}
			})
			.state("site.about", {
				url: "/about",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/about/about.html"
					}
				}
			})
			.state("site.faq", {
				url: "/faq",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/faq/faq.html"
						//controller
					}
				}
			})
			.state("site.careers", {
				url: "/careers",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/careers/careers.html"
						//controller
					}
				}
			})
			.state("site.contact", {
				url: "/contact",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/contact/contact.html"
						//controller
					}
				}
			})
			.state("site.terms-and-conditions", {
				url: "/terms-and-conditions",
				views: {
					"content@site": {
						templateUrl:
							"client/layout/site/terms-and-conditions/terms-and-conditions.html"
						//controller
					}
				}
			})
			.state("site.404", {
				url: "/404",
				views: {
					"content@site": {
						templateUrl: "client/layout/site/others/404.html"
						//controller
					}
				}
			});
	}

	//   getNeighborhood.$inject = [
	//     "neighborhoodService",
	//     "areaService",
	//     "$stateParams"
	//   ];
	//   function getNeighborhood(neighborhoodService, areaService, $stateParams) {
	//     return neighborhoodService
	//       .readByName($stateParams.neighborhood)
	//       .then(data => data.item[0]);
	//   }

	//   getArea.$inject = ["areaService", "$stateParams"];
	//   function getArea(areaService, $stateParams) {
	//     if ($stateParams.area) {
	//       return areaService
	//         .readByName($stateParams.area)
	//         .then(data => data.item[0]);
	//     } else {
	//       return null;
	//     }
	//   }
})();
