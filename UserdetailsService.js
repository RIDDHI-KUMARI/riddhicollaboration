'use strict';
 
angular.module('myApp').factory('UserdetailsService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/RiddhiCollaboration/WebContent/Components/Userdetails/UserdetailsService';
 
    var factory = {
        fetchAllUserdetails: fetchAllUserdetails,
        createUserdetails: createUserdetails,
        updateUserdetails:updateUserdetails,
        deleteUserdetails:deleteUserdetails
    };
 
    return factory;
 
    function fetchAllUserdetailss() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Userdetails');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createUserdetails(userdetails) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, userdetails)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Userdetails');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateUserdetails(userdetails, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, userdetails)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Userdetails');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteUserdetails(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting Userdetails');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
}]);
