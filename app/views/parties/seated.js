var moment ;

App.Views.PartySeated = Ember.View.extend({
  templateName: "parties/_seated",

  actions: {
    unseat: function(party){
      "use strict" ;
      this.get('controller.controllers.party').send('unseat',party) ;
      this.destroy() ;
    },
  
    cancel: function(party) {
      "use strict" ;
      this.get('controller.controllers.party').send('cancel',party) ;
      this.destroy() ;
    }
  }
}) ;