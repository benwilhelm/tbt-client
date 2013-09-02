var moment;
App.PartyController = Ember.Controller.extend({
  notify: function(party){
    "use strict";
    var time = moment() ;
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
    var time = moment() ;
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
    var time = moment() ;
    party.set('time_cancelled',time) ;
    this.store.commit() ;
  },
    
  restore: function(party) {
    "use strict";
    party.set('time_cancelled',null) ;
    this.store.commit() ;
  }
}) ;

App.PartiesWaitingController = Ember.ArrayController.extend({
  needs: ['party']
}) ;

App.PartiesSeatedController = Ember.ArrayController.extend({
  needs: ['party']
}) ;

App.PartiesCancelledController = Ember.ArrayController.extend({
  needs: ['party']
}) ;
