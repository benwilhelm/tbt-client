var moment;
App.PartyController = Ember.Controller.extend({
  actions: {
    notify: function(party){
      "use strict";
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_notified',time) ;
      this.store.commit() ;
    },
    
    recall: function(party){
      "use strict";
      party.set('time_notified',null) ;
      this.store.commit() ;
    },
      
    seat: function(party) {
      "use strict";
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_seated',time) ;
      this.store.commit() ;
    },
      
    unseat: function(party) {
      "use strict";
      party.set('time_seated',null) ;
      this.store.commit() ;
    },
      
    cancel: function(party) {
      "use strict";
      var time = moment().format('YYYY-MM-DDTHH:mm:ss') ;
      party.set('time_cancelled',time) ;
      this.store.commit() ;
    },
      
    restore: function(party) {
      "use strict";
      party.set('time_cancelled',null) ;
      this.store.commit() ;
    }
  }
}) ;


App.PartiesWaitingController = Ember.ArrayController.extend({
  needs: ['party'],
  sortProperties: ["time_taken"],
  sortAscending: true
}) ;

App.PartiesSeatedController = Ember.ArrayController.extend({
  needs: ['party'],
  sortProperties: ["time_seated"],
  sortDescending: true
}) ;

App.PartiesCancelledController = Ember.ArrayController.extend({
  needs: ['party'],
  sortProperties: ["time_cancelled"],
  sortDescending: true
}) ;
