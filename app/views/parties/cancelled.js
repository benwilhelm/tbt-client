var moment ;

App.Views.PartyCancelled = Ember.View.extend({
  templateName: "parties/_cancelled",

  actions: {
    restore: function(party) {
      "use strict" ;
      this.get('controller.controllers.party').send('restore',party) ;
      this.get('controller.content').removeObject(party) ;
    }
  }
}) ;