App.CancelledRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({cancelled:true}) ;
  }
}) ;