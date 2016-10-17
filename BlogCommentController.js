'use strict';
 
angular.module('myApp').controller('BlogCommentController', ['$scope', 'BlogCommentService', function($scope, BlogCommentService) {
    var self = this;
    self.user={id:'',description:'',userdetails_id:'',com_createdAt:''};
    self.users=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllBlogComments();
 
    function fetchAllBlogComments(){
        BlogCommentService.fetchAllBlogComments()
            .then(
            function(d) {
                self.BlogComments = d;
            },
            function(errResponse){
                console.error('Error while fetching BlogComments');
            }
        );
    }
 
    function createBlogComment(blogcomment){
        BlogCommentService.createBlogComment(blogcomment)
            .then(
            fetchAllBlogComments,
            function(errResponse){
                console.error('Error while creating BlogComment');
            }
        );
    }
 
    function updateBlogComment(blogcomment, id){
        BlogCommentService.updateBlogComment(blogcomment, id)
            .then(
            fetchAllBlogComments,
            function(errResponse){
                console.error('Error while updating BlogComment');
            }
        );
    }
 
    function deleteBlogComment(id){
        BlogCommentService.deleteBlogComment(id)
            .then(
            fetchAllBlogComments,
            function(errResponse){
                console.error('Error while deleting BlogComment');
            }
        );
    }
 
    function submit() {
        if(self.blogcomment.id===null){
            console.log('Saving New BlogComment', self.blogcomment);
            createBlogComment(self.blogcomment);
        }else{
            updateBlogComment(self.blogcomment, self.blogcomment.id);
            console.log('BlogComment updated with id ', self.blogcomment.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.blogcomments.length; i++){
            if(self.blogcomments[i].id === id) {
                self.blogcomment = angular.copy(self.blogcomments[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.blogcomment.id === id) {//clean form if the blog to be deleted is shown there.
            reset();
        }
        deleteBlogComment(id);
    }
 
 
    function reset(){
        self.blogcomment={id:'',description:'',userdetails_id:'',com_createdAt:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);