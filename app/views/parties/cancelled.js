var moment ;

App.Views.PartyCancelled = Ember.View.extend({
  templateName: "parties/_cancelled",

  actions: {
    restore: function(party) {
      "use strict" ;
      var view = this ;
      this.$().highlightFade(function(){
        view.get('controller.controllers.parties').send('restore',party) ;
        view.get('controller.content').removeObject(party) ;
      });
    }
  }
}) ;