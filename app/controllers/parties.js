App.PartiesController = Ember.Controller.extend({
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
    },
    
    deleteAll: function() {
      var self = this ;
      this.store.findAll('party').then(function(parties){
        parties.forEach(function(party){
          Ember.run.once(party,function(){
            this.deleteRecord() ;
            this.save() ;
          });
        }) ;
      }) ;
    }
  }
}) ;


App.PartiesWaitingController = Ember.ArrayController.extend({
  needs: ['parties','application'],
  sortProperties: ["time_taken"],
  sortAscending: true,
  
  actions: {
  
    newParty: function(info){    
      var c = this ;
      var party = this.store.createRecord('party',info) ;
      return party.save().then(function(){
        c.get('content').pushObject(party) ;
        return party ;
      }) ;
    }, 
    
    openAddPartyDialog: function() {
      this.set('addingNewParty',true) ;
    },
    
    closeAddPartyDialog: function() {
      this.set('addingNewParty',false) ;
    }
  }
}) ;

App.PartiesSeatedController = Ember.ArrayController.extend({
  needs: ['parties'],
  sortProperties: ["time_seated"],
  sortAscending: false
}) ;

App.PartiesCancelledController = Ember.ArrayController.extend({
  needs: ['parties'],
  sortProperties: ["time_cancelled"],
  sortAscending: false
}) ;
