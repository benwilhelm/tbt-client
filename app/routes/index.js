App.IndexRoute = Ember.Route.extend({
  redirect: function(){
    "use strict" ;
    this.transitionTo('waiting') ;
  }
});