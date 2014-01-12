App.SettingsController = Ember.Controller.extend({

  defaultSettings : {
    'apiKey': null,
    'apiSecret': null,
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
  
  authorizeAccount: function(username, password) {
    var self = this ;
    return Ember.RSVP.Promise(function(resolve,reject){
      $.ajax({
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password)) ;
        },
        url: App.REMOTE_HOST + '/api/credentials',
        type: 'GET',
        dataType: 'json',
        error: function(err){
          Ember.run(function(){
            reject(err);
          });
        },
        success: function(data, status, jqxhr){
          if (data.error) {
            Ember.run(function(){
              reject(data.errorMsg) ;
            });
          }
          
          Ember.run(function(){
            resolve(self.updateSettings(data.payload)) ;
          });
        }
      }) ;
    });
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
        vals.accountPassword = pw ;
      }
      
      
      this.updateSettings(vals).then(function(){
        $("#settings_status").html("Saved") ;
        self.set('showPassword', false) ;
        window.setTimeout(function(){
          $("#settings_status").html("&nbsp") ;
        },3000) ;
      }) ;
    },
    
    togglePasswordForm: function() {
      var showPassword = !this.get('showPassword') ;
      this.set('showPassword',showPassword) ;
    }
    
  }
}) ;
