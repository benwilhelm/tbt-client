var moment ;

App.Views.PartyWaiting = Ember.View.extend({
  templateName: "parties/_waiting",

  notify: function(party){
    "use strict" ;
    this.get('controller.controllers.party').send('notify',party) ;
  },

  recall: function(party){
    "use strict" ;
    this.get('controller.controllers.party').send('recall',party) ;
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
}) ;