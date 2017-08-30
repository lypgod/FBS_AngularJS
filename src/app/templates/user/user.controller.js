'use strict';

angular.module('inspinia')
    .controller('UserController', function ($scope, $state, dataService, notify, $uibModal) {

        var vm = this;

        vm.postUser = {userName: '', password: ''};
        vm.userList = {};

        vm.getUserList = function () {
            // vm.userList = [
            //     {
            //         "id": 22,
            //         "userName": "user44444",
            //         "password": "password2"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     },
            //
            //     {
            //         "id": 33,
            //         "userName": "user3",
            //         "password": "password3"
            //     }
            // ];
            // vm.loginRequest = {
            //     method: 'POST',
            //     url: URLS.BASE_URL + URLS.USER_LOGIN_URL,
            //     data: { user: vm.user }
            // };
            //
            // dataService.getData(vm.loginRequest).then(function(data){
            //     //vm.inspiniaDemo1();
            //     console.log("success - ");
            //     console.log(data);
            // },function(error){
            //     //vm.inspiniaDemo2();
            //     console.log("failed - ");
            //     console.log(error);
            // });

            dataService.getAllUsers().then(function (data) {
                vm.userList = data.data;
            });
        };

        vm.deleteUser = function (usename) {
            dataService.deleteUser().then(function (data) {
                notify({
                    message: {"messages": ["删除成功！"]},
                    classes: 'alert-info',
                    duration: 3000,
                    templateUrl: 'app/templates/components/common/notify.html'
                });
                vm.getUserList();
            });
        };

        vm.openUserModal = function (usename) {
            vm.modalInstance = $uibModal.open({
                templateUrl: 'app/templates/components/common/user_modal.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    username: function () {
                        return usename;
                    }
                }
            });

            vm.modalInstance.result.then(function (result) {
                if (result) {
                    notify({
                        message: {"messages": ["用户添加/修改成功！"]},
                        classes: 'alert-info',
                        duration: 3000,
                        templateUrl: 'app/templates/components/common/notify.html'
                    });
                    vm.getUserList();
                }
            });
        };

        vm.testException = function () {
            dataService.exception();
        };

        vm.passStrengthStyle="text-danger";
        vm.passStrengthText = "弱";
        $scope.$watch('passStrength', function (data) {
            if(data < 50) {
                vm.passStrengthStyle="text-danger";
                vm.passStrengthText = "弱";
            } else if (data < 82){
                vm.passStrengthStyle="text-warning";
                vm.passStrengthText = "中";
            } else {
                vm.passStrengthStyle="text-info";
                vm.passStrengthText = "强";
            }
        });

        vm.registerUser = function () {
            dataService.addUser(vm.postUser).then(function () {
                notify({
                    message: {"messages": ["注册成功！"]},
                    classes: 'alert-info',
                    duration: 3000,
                    templateUrl: 'app/templates/components/common/notify.html'
                });
                $state.go("login");
            });
        };

        vm.loginUser = function () {
            dataService.loginUser(vm.postUser).then(function (data) {
                console.log(data);
                $state.go("index.user");
            });
        };

    })

    .controller('ModalInstanceCtrl', function (dataService, $uibModalInstance, username) {
        var $ctrl = this;
        $ctrl.operation = (username) ? "Edit" : "Add";

        $ctrl.user = {
            id: 0,
            userName: username,
            password: ''
        };

        if (username) {
            dataService.getUserByName(username).then(function (data) {
                $ctrl.user = data.data;
            });
        }

        $ctrl.ok = function () {
            if (username) {
                dataService.updateUser(username, $ctrl.user).then(function () {
                    $uibModalInstance.close(true);
                }, function () {
                    $uibModalInstance.close(false);
                });
            } else {
                dataService.addUser($ctrl.user).then(function () {
                    $uibModalInstance.close(true);
                }, function () {
                    $uibModalInstance.close(false);
                });
            }
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
;
