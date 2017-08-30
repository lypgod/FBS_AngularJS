'use strict';

angular.module('inspinia')
  .controller('LoginController', function ($log,$state,dataService,notify) {

    var vm = this;

    vm.userLogin = function () {
      vm.loginRequest = {
        method: 'POST',
        url: "",
        data: { user: vm.user }
      };

      dataService.getData(vm.loginRequest).then(function(data){
        //vm.inspiniaDemo1();
        console.log("success - ");
        console.log(data);
      },function(error){
        //vm.inspiniaDemo2();
        console.log("failed - ");
        console.log(error);
      });

      //$state.go("index.main");
    };
  });
