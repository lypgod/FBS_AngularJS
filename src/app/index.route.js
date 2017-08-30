(function () {
    'use strict';

    angular
        .module('inspinia')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, USER_ROLES) {

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        $stateProvider
            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "app/templates/components/common/content.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state('index.user', {
                url: "/user",
                templateUrl: "app/templates/user/user.html",
                controller: "UserController",
                controllerAs: "user",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                },
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['bower_components/footable/dist/footable.all.min.js',
                                        'bower_components/footable/css/footable.core.css']
                            },
                            {
                                name: 'ui.footable',
                                files: ['bower_components/angular-footable/dist/angular-footable.js']
                            }
                        ]);
                    }
                }
            })
            .state('register', {
                url: "/user/register",
                templateUrl: "app/templates/user/register.html",
                controller: "UserController",
                controllerAs: "user"
            })
            .state('login', {
                url: "/user/login",
                templateUrl: "app/templates/user/login.html",
                controller: "UserController",
                controllerAs: "user"
            })
            .state('logout', {
                url: "/user/login",
                templateUrl: "app/templates/user/logout.html",
                controller: "UserController",
                controllerAs: "user"
            })

            .state('index.minor', {
                url: "/minor",
                templateUrl: "app/templates/minor/minor.html"
            });

        $urlRouterProvider.otherwise('/index/user');
    }

})();
