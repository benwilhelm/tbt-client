App.PartiesController = Ember.Controller.extend({
  actions: {
    notify: function(party){
      party.set('notifying',true) ;
      var data = {
        to: party.get('phone_number'),
        message: App.Settings.notificationText,
        timeSent: moment().format(),
        timeTaken: party.get('time_taken'),
        timePromised: party.get('time_promised'),
        type: 'tableReady'
      };
      
      $.apiCall('POST','/notifications', data, function(resp){
        Ember.run(function(){ // run loop seems unnecessary, but tests fail without it
          var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
          party.set('time_notified',time) ;
          party.set('notifying',false) ;
          party.save() ;
        });
      },function(jqxhr, status, err){
        party.set('time_notified',false) ;
        console.log('error posting to /notifications') ;
        console.log(jqxhr) ;
        console.log(status) ;
        console.log(err) ;
      }) ;
    },
    
    recall: function(party){
      party.set('recalling',true) ;
      var data = {
        to: party.get('phone_number'),
        message: App.Settings.recallText,
        timeSent: moment().format(),
        type: 'recallNotification'
      };
    
      $.apiCall('POST','/notifications', data, function(resp){
        Ember.run(function(){ // run loop seems unnecessary, but tests fail without it
          party.set('time_notified',null) ;
          party.set('recalling',false) ;
          party.save() ;
        });
      },function(jqxhr, status, err){
        party.set('time_notified',false) ;
        console.log('error posting to /notifications') ;
        console.log(jqxhr) ;
        console.log(status) ;
        console.log(err) ;
      }) ;
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

App.PartiesNewController = Ember.ObjectController.extend({
  didInsertElement: function() {
    console.log('didInsertElement') ;
    $.hideFooterForInputs() ;
  },
  needs: ['parties'],
  statusMessage: "",
  actions: {
    createParty: function(info, success, failure){    
      var c = this ;
      var party = this.store.createRecord('party',info) ;
      party.save().then(success, failure) ;
    },
    
    addParty: function() {
      var controller = this ;
      this.set('statusMessage','Saving Party...') ;
      
      var now = moment() ;
      var wait = $("#new_party_dialog #party_wait").val() ;

      var info = {
        name: $("#new_party_dialog #party_name").val(),
        size: $("#new_party_dialog #party_size").val(),
        phone_number: $("#new_party_dialog #party_phone").val(),
        time_taken: now.format('YYYY-MM-DDTHH:mm:ss'),
        time_promised: now.add('m',wait).format("YYYY-MM-DDTHH:mm:ss")
      };
                  
      this.send('createParty', info, function(){
        // success
        this.set('statusMessage','') ;
        controller.transitionToRoute('/parties/waiting') ;
      }, function(err){
        // error
        controller.set('statusMessage', "Error saving party") ;
      }) ;
    }
  }

}) ;

App.PartiesWaitingController = Ember.ArrayController.extend({
  needs: ['parties'],
  sortProperties: ["time_taken"],
  sortAscending: true  
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
