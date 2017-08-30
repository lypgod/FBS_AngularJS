(function () {
    'use strict';

    angular
        .module('inspinia')
        .run(function ($rootScope, $state, AUTH_EVENTS, AuthService, notify) {
            $rootScope.$on('$stateChangeStart', function (event, next) {
                // var authorizedRoles = next.data.authorizedRoles;
                if (
                    next.data && next.data.authorizedRoles &&
                    next.data.authorizedRoles.length > 0 &&
                    !AuthService.isAuthorized(next.data.authorizedRoles)) {
                    event.preventDefault();

                    console.log(AuthService);
                    if (AuthService.isAuthenticated()) {
                        // user is not allowed
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        notify({
                            message: {"messages": ["权限不足！"]},
                            classes: 'alert-danger',
                            duration: 3000,
                            templateUrl: 'app/templates/components/common/notify.html'
                        });
                        // $state.go("login");
                    } else {
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        notify({
                            message: {"messages": ["请登录！"]},
                            classes: 'alert-danger',
                            duration: 3000,
                            templateUrl: 'app/templates/components/common/notify.html'
                        });
                        $state.go("login");
                    }
                }
            });
        })

})();
