(function(global) {
    var ds = {};

    ds.empService = function ($q, $http) {
        var url = "/rest/es/emp";
        return {
            getAllEmp: function () {
                var defer = $q.defer();
                $http.get(url).then(function (resp) {
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            deleteOneEmp: function (name) {
                var defer = $q.defer();
                $http.delete(url + "/" + name).then(function (resp) {
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            getOneEmp: function (name) {
                var defer = $q.defer();
                $http.get(url + "/" + name).then(function (resp) {
                    delete resp.data._id;
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            updateOneEmp: function (emp) {
                var defer = $q.defer();
                $http.put(url, emp).then(function (resp) {
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },

            saveOneEmp: function (emp) {
                var defer = $q.defer();
                $http.post(url, emp).then(function (resp) {
                    defer.resolve(resp.data);
                });
                return defer.promise;
            }
        }
    }
    global.ds = ds;
})(window);


