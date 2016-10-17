'use strict';
 
angular.module('myApp').factory('BlogService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/RiddhiCollaboration/WebContent/Components/Blog';
 
    var factory = {
        fetchAllBlogComments: fetchAllBlogComments,
        createBlogComment: createBlogComment,
        updateBlogComment:updateBlogComment,
        deleteBlogComment:deleteBlogComment
    };
 
    return factory;
 
    function fetchAllBlogComments() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching fetchBlogComments');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createBlogComment(blogcomment) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, blogcomment)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating BlogComment');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateBlogComment(blogcomment, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, blogcomment)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating BlogComment');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteBlogComment(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting BlogComment');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
}]);
