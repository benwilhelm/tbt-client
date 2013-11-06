var window, FastClick;
window.addEventListener('load', function() {
  "use strict" ;
  FastClick.attach(document.body);
}, false);



var App = Ember.Application.create({
//  LOG_TRANSITIONS:true,
//  LOG_VIEW_LOOKUPS:true,
//  LOG_ACTIVE_GENERATION:true
  currentPath: ''
});
App.rootElement = "#application";
App.Views = {} ;
var DS;
var moment;

App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter.extend({
    queryFixtures: function(fixtures,query,type){
      return fixtures.filter(function(fxtr){
        for (var key in query) {
          var val = query[key] ;
          switch (key) {
            case 'waiting':
              if (val === true && (fxtr.time_seated !== null || fxtr.time_cancelled !== null)) {
                return false;
              }
              break;
              
            case 'seated': 
              if (val === true && fxtr.time_seated === null) {
                return false;
              }
              break;
            
            case 'cancelled': 
              if (val === true && fxtr.time_cancelled === null) {
                return false;
              }
              break;
            
            default:
              if (fxtr[key] !== val) {
                return false ;
              }
              break;
          }
        }
        return true ;
      }) ;
    }
  })

});

App.Router.map(function() {
	'use strict';
  this.resource('parties',function(){
    this.route('waiting');
    this.route('seated');
    this.route('cancelled');
  });
  this.route('setup');
});


App.preferences = {
  return_time: 5 * 60 * 1000 
} ;