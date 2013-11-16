App.SettingsController = Ember.Controller.extend({

  actions: {
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
          App.Settings[idx] = val ;
          promises[idx] = this.store.find('setting',{'name':idx}) ;
        }
      }
      
      Ember.RSVP.hash(promises).then(function(found){
        for (var idx in found) {
          var setting = found[idx].objectAt(0) ;
          setting.set('value', s[idx]) ;
          setting.save() ;
        }
      }) ;
    }
  }
}) ;
