(function(global) {
    var ds = {};

    ds.empService = function ($q, $http) {//$q 是angularjs专门用来做ajax call和promise的,解析后台发过来的数据
        var url = "/rest/es/emp";  //自己定义的后台controller的地址
        return {
            getAllEmp: function() {
                var defer = $q.defer(); //调用defer()方法
                $http.get(url).then(function(resp){
                    defer.resolve(resp.data);          //解释数据
                });
                return defer.promise; //返回数据
            },

            deleteOneEmp: function(name){
                var defer = $q.defer();
                $http.delete(url + "/" + name).then(function(resp){
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            getOneEmp: function(name){
                var defer = $q.defer();
                $http.get(url + "/" + name).then(function(resp){
                      //delete resp.data._id;
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            updateOneEmp: function(emp){
                var defer = $q.defer();
                $http.put(url, emp).then(function(resp) {
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            saveOneEmp: function(emp) {
                var defer = $q.defer(); // angularjs封装了promise一个变量
                $http.post(url, emp).then(function(resp){
                    defer.resolve(resp.data);
                });
                return defer.promise; //
            }
        }
    }
    global.ds = ds;
})(window);


