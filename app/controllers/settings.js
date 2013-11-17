App.SettingsController = Ember.Controller.extend({

  updateSettings: function(s) {
    var indices = [
      'returnTime',
      'notificationText',
      'recallText'
    ] ;
    
    var promises = {} ;
    for (var i=0; i<indices.length; i++) {
      var idx = indices[i] ;
      if (s[idx]) {
        var val = s[idx] ;
        promises[idx] = this.store.find('setting',{'name':idx}) ;
      }
    }
    
    return Ember.RSVP.hash(promises).then(function(found){
      var saving = [] ;
      for (var idx in found) {
        var setting = found[idx].objectAt(0) ;
        setting.set('value', s[idx]) ;
        saving.push(setting.save()) ;
      }
      return saving ;
    }).then(null,function(saving){
      // error saving
    }) ;
  },

  actions: {    
    saveSettings: function() {
      var vals = {
        returnTime: $("input#returnTime").val(),
        notificationText: $("textarea#notificationText").val(),
        recallText: $("textarea#recallText").val()
      };
      
      this.updateSettings(vals).then(function(){
        $("#settings_status").html("Saved") ;
        window.setTimeout(function(){
          $("#settings_status").html("&nbsp") ;
        },3000) ;
      }) ;
    }
    
  }
}) ;
