'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function () {
                    $timeout(function () {
                        element.metisMenu();
                    });
                });

                // Colapse menu in mobile mode after click on element
                var menuElement = angular.element('#side-menu a:not([href$="\\#"])');
                menuElement.click(function () {
                    if (angular.element(window).width() < 769) {
                        angular.element("body").toggleClass("mini-navbar");
                    }
                });

                // Enable initial fixed sidebar
                if (angular.element("body").hasClass('fixed-sidebar')) {
                    var sidebar = element.parent();
                    sidebar.slimScroll({
                        height: '100%',
                        railOpacity: 0.9
                    });
                }

            }
        };
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive('fooRepeatDone', function () {
        return function ($scope, element) {
            if ($scope.$last) { // all are rendered
                $('.footable').trigger('footable_redraw');
            }
        }
    })
    .directive('checkRegistered', function (dataService) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;

                scope.isRegistered = true;

                scope.$watch(attr.ngModel, function (newValue) {
                    if (newValue && newValue.length > 0 && newValue.length <=5) {
                        dataService.checkRegistered(newValue).then(function (data) {
                            scope.isRegistered = data.data;
                            ctrl.$validate();
                        });
                    }
                });

                ctrl.$validators.checkRegistered = function(modelValue) {
                    if (modelValue.length > 0 && modelValue.length <=5) {
                        if (!scope.isRegistered) {
                            scope.isRegistered = true;
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                };
            }
        };
    })

;


