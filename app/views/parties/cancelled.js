var moment ;

App.Views.PartyCancelled = Ember.View.extend({
  templateName: "parties/_cancelled",

  restore: function(party) {
    "use strict" ;
    this.destroy() ;
    this.get('controller.controllers.party').send('restore',party) ;
  }
}) ;