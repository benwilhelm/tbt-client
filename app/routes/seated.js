App.SeatedRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({seated:true}) ;
  }
}) ;