App.PartyController = Ember.Controller.extend({
  actions: {
    notify: function(party){
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_notified',time) ;
      party.save() ;
    },
    
    recall: function(party){
      party.set('time_notified',null) ;
      party.save() ;
    },
      
    seat: function(party) {
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_seated',time) ;
      party.save() ;
    },
      
    unseat: function(party) {
      party.set('time_seated',null) ;
      party.save() ;
    },
      
    cancel: function(party) {
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_cancelled',time) ;
      party.save() ;
    },
      
    restore: function(party) {
      party.set('time_cancelled',null) ;
      party.save() ;
    }
  }
}) ;


App.PartiesWaitingController = Ember.ArrayController.extend({
  needs: ['party','application'],
  sortProperties: ["time_taken"],
  sortAscending: true,
  
  actions: {
    openAddPartyDialog: function() {
      "use strict" ;
      this.set('addingNewParty',true) ;
    },
    closeAddPartyDialog: function() {
      "use strict" ;
      this.set('addingNewParty',false) ;
    }
  }
}) ;

App.PartiesSeatedController = Ember.ArrayController.extend({
  needs: ['party'],
  sortProperties: ["time_seated"],
  sortAscending: false
}) ;

App.PartiesCancelledController = Ember.ArrayController.extend({
  needs: ['party'],
  sortProperties: ["time_cancelled"],
  sortAscending: false
}) ;
