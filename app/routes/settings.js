App.SettingsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('setting').then(function(settings){
      var ret = {};
      settings.forEach(function(setting){
        var idx = setting.get('name') ;
        ret[idx] = setting ;
      }) ;
      
      return ret ;
    }) ;
  },
  
  setupController: function(controller, content) {
    var hasKey = !!App.Settings.apiKey && !!App.Settings.apiKey.match(/^[a-zA-Z0-9]{24}$/) ;
    var hasSecret = !!App.Settings.apiSecret && !!App.Settings.apiSecret.match(/^[a-zA-Z0-9]{48}$/) ;
    controller.set('accountAuthorized', hasKey && hasSecret) ;
    controller.set('content',content) ;
  }
});