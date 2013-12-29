App.SettingsController = Ember.Controller.extend({

  defaultSettings : {
    'accountEmail': null,
    'accountPassword': null,
    'returnTime': 5,
    'notificationText': 'Your table is ready.',
    'recallText': 'We apologize, but your table is not ready.'
  },
  
  showPassword: false,

  updateSettings: function(s) {
    var self = this ;
    var promises = {} ;
    for (var idx in this.defaultSettings) {
      if (s[idx]) {
        var val = s[idx] ;
        promises[idx] = this.store.find('setting',{'name':idx}) ;
      }
    }
    
    return Ember.RSVP.hash(promises).then(function(found){

      var saving = [] ;
      for (var idx in found) {
        var setting = found[idx].objectAt(0) ;
        if (setting) {
          setting.set('value', s[idx]) ;
        } else {
          var o = {
            name: idx,
            value: s[idx]
          };
          setting = self.store.createRecord('setting', o) ;
        }
        saving.push(setting.save()) ;
      }
      return Ember.RSVP.all(saving) ;
    }).then(function(promise){
      // saved ok 
      return promise ;
    },function(e){
      // error saving
      console.log('error saving settings') ;
      console.log(e.message) ;
    }) ;
  },

  actions: {    
    saveSettings: function() {
      var self = this ;
      var vals = {
        accountEmail: $("input#accountEmail").val(),        
        returnTime: $("input#returnTime").val(),
        notificationText: $("textarea#notificationText").val(),
        recallText: $("textarea#recallText").val()        
      };
      
      var pw = $("input#accountPassword").val() ;
      if (pw) {
        vals.accountPassword = btoa(pw) ;
      }
      
      
      this.updateSettings(vals).then(function(){
        $("#settings_status").html("Saved") ;
        self.set('showPassword', false) ;
        window.setTimeout(function(){
          $("#settings_status").html("&nbsp") ;
        },3000) ;
      }) ;
    },
    
    togglePassword: function() {
      var showPassword = !this.get('showPassword') ;
      this.set('showPassword',showPassword) ;
    }
    
  }
}) ;
