'use strict';
 
angular.module('myApp').controller('ForumController', ['$scope', 'ForumService', function($scope, ForumService) {
    var self = this;
    self.forum={id:'',title:'',description:'',createdAt:''};
    self.forums=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllForums();
 
    function fetchAllForums(){
        ForumService.fetchAllForums()
            .then(
            function(d) {
                self.Forums = d;
            },
            function(errResponse){
                console.error('Error while fetching Forums');
            }
        );
    }
 
    function createForum(forum){
        ForumService.createForum(forum)
            .then(
            fetchAllForums,
            function(errResponse){
                console.error('Error while creating Forum');
            }
        );
    }
 
    function updateForum(forum, id){
        ForumService.updateForum(forum, id)
            .then(
            fetchAllForums,
            function(errResponse){
                console.error('Error while updating Forum');
            }
        );
    }
 
    function deleteForum(id){
        ForumService.deleteForum(id)
            .then(
            fetchAllForums,
            function(errResponse){
                console.error('Error while deleting Forum');
            }
        );
    }
 
    function submit() {
        if(self.forum.id===null){
            console.log('Saving New Forum', self.forum);
            createForum(self.forum);
        }else{
            updateForum(self.forum, self.forum.id);
            console.log('Forum updated with id ', self.forum.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.forums.length; i++){
            if(self.forums[i].id === id) {
                self.forum = angular.copy(self.forums[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.forum.id === id) {//clean form if the blog to be deleted is shown there.
            reset();
        }
        deleteForum(id);
    }
 
 
    function reset(){
        self.forum={id:'',title:'',description:'',createdAt:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);