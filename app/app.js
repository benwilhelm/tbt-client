var window, FastClick;
window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

var App = Ember.Application.create({
//  LOG_TRANSITIONS:true,
//  LOG_VIEW_LOOKUPS:true,
//  LOG_ACTIVE_GENERATION:true
  currentPath: '',

  errorHandler: function(e) {

    var msg = '' ;
    
    if (e.name) msg += e.name + '\n' ;
    if (e.message) msg += e.message + '\n' ;
    if (e.stack) msg += e.stack ;
    
    // this should probably only be done in a debug build
    console.log(msg) ;
    
    // use for debugging
    throw e ;
  },
  Settings: {}
});


App.rootElement = "#application";
App.Views = {} ;
App.CONSTANTS = {
  dbNamespace: 'text-to-table'
};

App.Router.map(function() {
  this.resource('parties',function(){
    this.route('new');
    this.route('waiting');
    this.route('seated');
    this.route('cancelled');
  });
  this.resource('settings');
});



Ember.onerror = App.errorHandler ;
Ember.RSVP.configure('onerror', App.errorHandler) ;
App.ApplicationRoute = Ember.Route.extend({
  actions: { error: App.errorHandler }
});
window.onerror = App.errorHandler ;
