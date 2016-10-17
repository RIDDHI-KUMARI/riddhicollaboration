'use strict';
 
angular.module('myApp').controller('EventController', ['$scope', 'EventService', function($scope, EventService) {
    var self = this;
    self.user={id:'',name:'',description:'',createdAt:''};
    self.users=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllEvents();
 
    function fetchAllEvents(){
        EventService.fetchAllEvents()
            .then(
            function(d) {
                self.Events = d;
            },
            function(errResponse){
                console.error('Error while fetching Events');
            }
        );
    }
 
    function createEvent(event){
        EventService.createEvent(event)
            .then(
            fetchAllEvents,
            function(errResponse){
                console.error('Error while creating Event');
            }
        );
    }
 
    function updateEvent(event, id){
        EventService.updateEvent(event, id)
            .then(
            fetchAllEvents,
            function(errResponse){
                console.error('Error while updating Event');
            }
        );
    }
 
    function deleteEvent(id){
        EventService.deleteEvent(id)
            .then(
            fetchAllEvents,
            function(errResponse){
                console.error('Error while deleting Event');
            }
        );
    }
 
    function submit() {
        if(self.event.id===null){
            console.log('Saving New Event', self.event);
            createEvent(self.event);
        }else{
            updateEvent(self.event, self.event.id);
            console.log('Event updated with id ', self.event.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.events.length; i++){
            if(self.events[i].id === id) {
                self.event = angular.copy(self.events[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.event.id === id) {//clean form if the blog to be deleted is shown there.
            reset();
        }
        deleteEvent(id);
    }
 
 
    function reset(){
        self.event={id:'',name:'',description:'',createdAt:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);