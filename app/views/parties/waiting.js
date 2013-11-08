var moment, window ;

App.Views.PartyWaiting = Ember.View.extend({
  templateName: "parties/_waiting",

  actions: {
    notify: function(party){
      this.get('controller.controllers.party').send('notify',party) ;
    },
    
    recall: function(party){
      if (window.confirm("Would you like to recall this notification?")) {
        this.get('controller.controllers.party').send('recall',party) ;
      }
    },
      
    seat: function(party) {
      var view = this ;
      this.$().highlightFade(function(){
        view.get('controller.controllers.party').send('seat',party) ;
        view.destroy() ;
      }) ;
    },
  
    cancel: function(party) {
      var view = this ;
      this.$().highlightFade(function(){
        view.get('controller.controllers.party').send('cancel',party) ;
        view.destroy() ;
      });
    }
  }
}) ;