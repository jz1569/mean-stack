
var app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.factory('es', ['$q', '$http', ds.empService]);//$q: angularjs用promise

app.controller("mainCtrl", ["$scope", function($scope){

}]);

app.controller("addCtrl", ["$scope", "es", "$location", function ($scope, es, $location) {
    $scope.doClear = function () {
        $scope.emp = { };
    }
    $scope.doSubmit = function() {
        es.saveOneEmp($scope.emp).then(function(result) {
            $location.path("/home");
        });
    }
}]);

app.controller("homeCtrl",["$scope","es",function ($scope,es){

    es.getAllEmp().then(function(res){
        $scope.empList = res;
    });
    $scope.doDelete = function(index){
        var name = $scope.empList[index].name;
        es.deleteOneEmp(name).then(function(){
            $scope.empList.splice(index,1);
        })
    }
}]);

app.controller("updateCtrl",["$scope","es","$location","$routeParams",function($scope,es,$location,$routeParams){
    var name = $routeParams.name;
    es.getOneEmp(name).then(function(resp){
        $scope.emp =resp;
        $scope.originalEmp = angular.copy($scope.emp);
    })
    $scope.doClear = function(){
        $scope.emp = angular.copy($scope.originalEmp);
    }
    $scope.doSubmit = function(){
        es.updateOneEmp($scope.emp).then(function(result){
            $location.path("/home");
        })
    }
}])

app.config(["$routeProvider", function($routeProvider) { //$routeProvider 做前台路由 定义不同页面
    $routeProvider.when("/home", {
        templateUrl: 'template/home.html',
        controller: "homeCtrl"
    }).when("/add", {
        templateUrl: 'template/add.html',
        controller: "addCtrl"
    }).when("/show", {
        templateUrl: 'template/show.html',
    }).when("/update/:name", {
        templateUrl: 'template/update.html',
        controller: "updateCtrl"
    }).otherwise({
        redirectTo: "/home"
    })
}])

