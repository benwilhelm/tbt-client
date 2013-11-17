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
  }
});