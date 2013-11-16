var moment ;

App.Views.PartyNew = Ember.View.extend({
  layoutName: "views/modal-overlay",
  templateName: "parties/new",
  
  actions: {
    addParty: function(){
      "use strict" ;
      var controller = this.get('controller') ;
      controller.set('statusMessage','Saving Party...') ;
      
      var now = moment() ;
      var wait = $("#new_party_dialog #party_wait").val() ;

      var info = {
        name: $("#new_party_dialog #party_name").val(),
        size: $("#new_party_dialog #party_size").val(),
        phone_number: $("#new_party_dialog #party_phone").val(),
        time_taken: now.format('YYYY-MM-DDTHH:mm:ss'),
        time_promised: now.add('m',wait).format("YYYY-MM-DDTHH:mm:ss")
      };
                  
      controller.addObserver('content.length', function(){
        $("#new_party_dialog input").val('') ;
        controller.set('statusMessage','Saved') ;
        controller.removeObserver('content.length') ;
        controller.set('addingNewParty',false) ;
      }) ;

      controller.send('newParty',info) ;
    }
  }
}) ;