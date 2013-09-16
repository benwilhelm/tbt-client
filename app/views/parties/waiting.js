var moment, window ;

App.Views.PartyWaiting = Ember.View.extend({
  templateName: "parties/_waiting",

  actions: {
    notify: function(party){
      "use strict" ;
      this.get('controller.controllers.party').send('notify',party) ;
    },
    
    confirmRecall: function() {
      "use strict" ;
    },
  
    recall: function(party){
      "use strict" ;
      if (window.confirm("Would you like to recall this notification?")) {
        this.get('controller.controllers.party').send('recall',party) ;
      }
    },
      
    seat: function(party) {
      "use strict" ;
      this.get('controller.controllers.party').send('seat',party) ;
      this.destroy() ;
    },
  
    cancel: function(party) {
      "use strict" ;
      this.get('controller.controllers.party').send('cancel',party) ;
      this.destroy() ;
    }
  }
}) ;