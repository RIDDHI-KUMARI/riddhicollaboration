'use strict';
 
angular.module('myApp').factory('BlogService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/RiddhiCollaboration/WebContent/Components/JobOpportunities/JobOpportunitiesService';
 
    var factory = {
        fetchAllJobOpportunities: fetchAllJobOpportunities,
        createJobOpportunities: createJobOpportunities,
        updateJobOpportunities:updateJobOpportunities,
        deleteJobOpportunities:deleteJobOpportunities
    };
 
    return factory;
 
    function fetchAllJobOpportunities() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching JobOpportunities');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createJobOpportunities(jobopportunities) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, jobopportunities)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating JobOpportunities');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateJobOpportunities(jobopportunities, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, jobopportunities)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating JobOpportunities');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteJobOpportunities(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting JobOpportunities');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
}]);
