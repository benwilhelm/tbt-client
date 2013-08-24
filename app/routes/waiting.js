App.WaitingRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({waiting:true}) ;
  }
}) ;