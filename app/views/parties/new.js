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
      var name = $("#new_party_dialog #party_name").val() ;
      var size = $("#new_party_dialog #party_size").val() ;
      var phone = $("#new_party_dialog #party_phone").val() ;
      var wait = $("#new_party_dialog #party_wait").val() ;
      var time_taken = now.format('YYYY-MM-DDTHH:mm:ss') ;
      var time_promised = now.add('m',wait) ;
      
      var party = App.Party.createRecord({
        "name": name ,
        "size": size,
        "phone_number": phone,
        "time_taken": time_taken,
        "time_promised": time_promised,
        "time_notified": null,
        "time_seated": null,
        "time_cancelled": null
      }) ;
      
      party.save().then(function(){
        controller.get('content').pushObject(party) ;
        $("#new_party_dialog input").val('') ;
        controller.set('statusMessage','Saved') ;
      }) ;      
    }
  }
}) ;