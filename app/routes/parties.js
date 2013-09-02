App.PartiesWaitingRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({waiting:true}) ;
  }
}) ;

App.PartiesSeatedRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({seated:true}) ;
  }
}) ;

App.PartiesCancelledRoute = Ember.Route.extend({
  model: function(){
    "use strict";
    return App.Party.find({cancelled:true}) ;
  }
}) ;