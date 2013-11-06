App.PartiesWaitingRoute = Ember.Route.extend({
  model: function(){
    var store = this.get('store') ;
    return store.find('party',{waiting:true}) ;
  }
}) ;

App.PartiesSeatedRoute = Ember.Route.extend({
  model: function(){
    var store = this.get('store') ;
    return store.find('party',{seated:true}) ;
  }
}) ;

App.PartiesCancelledRoute = Ember.Route.extend({
  model: function(){
    var store = this.get('store') ;
    return store.find('party',{cancelled:true}) ;
  }
}) ;