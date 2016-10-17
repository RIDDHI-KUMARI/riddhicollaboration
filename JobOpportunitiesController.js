'use strict';
 
angular.module('myApp').controller('JobOpportunitiesController', ['$scope', 'JobOpportunitiesService', function($scope, JobOpportunitiesService) {
    var self = this;
    self.user={id:'',title:'',description:'',createdAt:''};
    self.users=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllJobOpportunities();
 
    function fetchAllJobOpportunities(){
        JobOpportunitiesService.fetchAllJobOpportunities()
            .then(
            function(d) {
                self.JobOpportunities = d;
            },
            function(errResponse){
                console.error('Error while fetching JobOpportunities');
            }
        );
    }
 
    function createJobOpportunities(jobopportunities){
        JobOpportunitiesService.createJobOpportunities(jobopportunities)
            .then(
            fetchAllJobOpportunities,
            function(errResponse){
                console.error('Error while creating JobOpportunities');
            }
        );
    }
 
    function updateJobOpportunities(jobopportunities, id){
        JobOpportunitiesService.updateJobOpportunities(jobopportunities, id)
            .then(
            fetchAllJobOpportunities,
            function(errResponse){
                console.error('Error while updating JobOpportunities');
            }
        );
    }
 
    function deleteJobOpportunities(id){
        JobOpportunitiesService.deleteJobOpportunities(id)
            .then(
            fetchAllJobOpportunities,
            function(errResponse){
                console.error('Error while deleting JobOpportunities');
            }
        );
    }
 
    function submit() {
        if(self.jobopportunities.id===null){
            console.log('Saving New JobOpportunities', self.jobopportunities);
            createJobOpportunities(self.jobopportunities);
        }else{
            updateJobOpportunities(self.jobopportunities, self.jobopportunities.id);
            console.log('JobOpportunities updated with id ', self.jobopportunities.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.jobopportunities.length; i++){
            if(self.jobopportunities[i].id === id) {
                self.jobopportunities = angular.copy(self.jobopportunities[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.jobopportunities.id === id) {//clean form if the blog to be deleted is shown there.
            reset();
        }
        deleteJobOpportunities(id);
    }
 
 
    function reset(){
        self.jobopportunities={id:'',title:'',description:'',createdAt:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);