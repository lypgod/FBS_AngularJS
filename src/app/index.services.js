'use strict';

angular.module('inspinia')
    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    })

    .factory('AuthService', ['$http', 'Session', function ($http, Session) {
            return {
                login: function login(credentials) {
                    return $http.post('/login', credentials)
                        .then(function (res) {
                            Session.create(res.id, res.userid, res.role);
                        });
                },
                isAuthenticated: function () {
                    return !!Session.userid;
                },
                isAuthorized: function (authorizedRoles) {
                    if (!angular.isArray(authorizedRoles)) {
                        authorizedRoles = [authorizedRoles];
                    }

                    return (this.isAuthenticated()
                        && authorizedRoles.indexOf(Session.userRole) !== -1);
                }
            };
        }
    ])

    // .factory('AuthService', function ($http, Session) {
    //     var authService = {};
    //
    //     authService.login = function (credentials) {
    //         //本地提供的服务，可用loopback快速搭建
    //         var api = $resource('http://localhost:3000/api/user_tests');
    //
    //         //因为没有写服务端验证用户密码，使用save是为了方便；
    //         //这里，如果服务端已存在该credentials，返回的response会包含错误信息，可用来替代401、403等；
    //         return api.save(credentials)
    //             .$promise
    //             .then(function(res) {
    //                 Session.create(res.id, res.id,
    //                     res.Role);
    //                 return res;
    //             });
    //     };
    //
    //     authService.isAuthenticated = function () {
    //         return !!Session.userId;
    //     };
    //
    //     authService.isAuthorized = function (authorizedRoles) {
    //         if (!angular.isArray(authorizedRoles)) {
    //             authorizedRoles = [authorizedRoles];
    //         }
    //         return (authService.isAuthenticated() &&
    //             authorizedRoles.indexOf(Session.userRole) !== -1);
    //     };
    //
    //     return authService;
    // })

    .factory('dataService', function ($http, $q, notify) {
        var BASE_URL = 'http://localhost:8080';
        var service = {};
        service.getData = function (config) {
            var d = $q.defer();
            $http(config).then(function (data) {
                d.resolve(data);
            }, function (error) {
                notify({
                    message: (error.data.messages) ? error.data : {
                        "code": error.status,
                        "messages": [error.statusText]
                    },
                    classes: 'alert-danger',
                    position: 'center',
                    duration: 3000,
                    templateUrl: 'app/templates/components/common/notify.html'
                });
                d.reject(error);
            });
            return d.promise;
        };
        service.getAllUsers = function () {
            return service.getData({
                method: 'GET',
                url: BASE_URL + "/user"
            });
        };
        service.addUser = function (user) {
            return service.getData({
                method: 'POST',
                url: BASE_URL + "/user",
                data: user
            });
        };
        service.getUserByName = function (username) {
            return service.getData({
                method: 'GET',
                url: BASE_URL + "/user/" + username
            });
        };
        service.updateUser = function (userName, user) {
            return service.getData({
                method: 'PUT',
                url: BASE_URL + "/user/" + username,
                data: user
            });
        };
        service.deleteUser = function (username) {
            return service.getData({
                method: 'DELETE',
                url: BASE_URL + "/user/" + username
            });
        };
        service.checkRegistered = function (username) {
            return service.getData({
                method: 'GET',
                url: BASE_URL + "/user/checkRegistered/" + username
            });
        };
        service.loginUser = function (user) {
            return service.getData({
                method: 'POST',
                url: BASE_URL + "/user/login",
                data: user
            });
        };
        service.logoutUser = function () {
            return service.getData({
                method: 'GET',
                url: BASE_URL + "/user/logout"
            });
        };
        service.exception = function () {
            return service.getData({
                method: 'GET',
                url: BASE_URL + "/user/exception"
            });
        };
        return service;
    });

// .factory('notifyService', ['notify', function (notify) {
//   var defered = $q.defer();
//   return {};
// }]);
