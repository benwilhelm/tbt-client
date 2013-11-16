App.SettingsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('setting') ;
  }
});