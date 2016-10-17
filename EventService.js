'use strict';
 
angular.module('myApp').factory('EventService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/RiddhiCollaboration/WebContent/Components/Event/EventService';
 
    var factory = {
        fetchAllEvents: fetchAllEvents,
        createEvent: createEvent,
        updateEvent:updateEvent,
        deleteEvent:deleteEvent
    };
 
    return factory;
 
    function fetchAllEvents() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Events');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createEvent(event) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, event)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Event');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateEvent(event, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, event)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Event');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteEvent(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting Event');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
}]);
