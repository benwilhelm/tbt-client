var App = Ember.Application.create();
var DS;

App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter.extend({
    queryFixtures: function(fixtures,query,type){
      'use strict';
      return fixtures.filter(function(fxtr){
        for (var key in query) {
          var val = query[key] ;
          if (fxtr[key] !== val) {
            return false ;
          }
        }
        return true ;
      }) ;
    }
  })

});

App.Router.map(function() {
	'use strict';
    this.resource('about');
});