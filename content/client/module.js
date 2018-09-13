/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

(function() {
  ["client", "homepage", "admin"].forEach(function(appName) {
    "use strict";
    angular.module(appName, [
      // 3rd party
      "ui.router",
      "ui.bootstrap",
      "ngCookies",
      // 'ui.toggle',

      //base / common
      `${appName}.layout`,
      "client._common",

      //services
      "client.authentication",
      "client.services",

      //views /controllers
      "client.crud",
      "client.hackers",
      "client.site"
    ]);

    angular
      .module(appName)
      .config(RouteConfig)
      .run(StateErrorHandler);

    StateErrorHandler.$inject = [
      "$rootScope",
      "$log",
      "$state",
      "$window",
      "$transitions"
    ];

    function StateErrorHandler(
      $rootScope,
      $log,
      $state,
      $window,
      $transitions
    ) {
      $rootScope.$on("$stateChangeError", info => $log.log(info));
      // $rootScope.$on('$stateChangeSuccess', () => { console.log('test')
      // $window.localStorage.removeItem("reload") })
      $transitions.onSuccess({}, trans =>
        $window.localStorage.removeItem("reload")
      );
    }

    RouteConfig.$inject = [
      "$stateProvider",
      "$urlRouterProvider",
      "$locationProvider"
    ];

    function RouteConfig(
      $stateProvider,
      $urlRouterProvider,
      $locationProvider
    ) {
      $urlRouterProvider.otherwise(($injector, $location) => {
        var $window = $injector.get("$window");
        if ($window.localStorage.getItem("reload")) {
          $window.localStorage.removeItem("reload");
          $window.location.href = "/error";
        } else {
          $window.localStorage.setItem("reload", "true");
          $window.location.reload();
        }
      });
      $locationProvider.html5Mode(true);
    }
  });
})();
