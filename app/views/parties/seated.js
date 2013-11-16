var moment ;

App.Views.PartySeated = Ember.View.extend({
  templateName: "parties/_seated",

  actions: {
    unseat: function(party){
      "use strict" ;
      var view = this ;
      this.$().highlightFade(function(){
        view.get('controller.controllers.parties').send('unseat',party) ;
        view.get('controller.content').removeObject(party) ;
        view.destroy() ;
      });
    },
  
    cancel: function(party) {
      "use strict" ;
      var view = this ;
      this.$().highlightFade(function(){
        view.get('controller.controllers.parties').send('cancel',party) ;
        view.get('controller.content').removeObject(party) ;
        view.destroy() ;
      });
    }
  }
}) ;