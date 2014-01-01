Ember.Test.registerHelper('getPartyLists', function(app,store){

  var promises = [
    store.find('party',{waiting:true}),
    store.find('party',{seated:true}),
    store.find('party',{cancelled:true})
  ]
  
  return Ember.RSVP.all(promises).then(function(p){
    var w = p[0] ;
    var s = p[1] ;
    var c = p[2] ;
    
    return {
      waiting: w.get('content') ,
      seated: s.get('content'),
      cancelled: c.get('content')
    }
  })

}) ;

Ember.Test.registerHelper('resetTests', function(app,store){

  App.reset() ;
  App.Settings = {} ;
  App.Party.loadFixtures() ;
  App.Setting.loadFixtures() ;

  var promises = [
    resetFixtures(store,'party'),
    resetFixtures(store,'setting')
  ];
  
  return Ember.RSVP.all(promises) ;
});

Ember.Test.registerHelper('resetFixtures', function(app,store,table){

  clearLSTable(table) ;

  var promises = [] ;
  var tableKey = table.charAt(0).toUpperCase() + table.slice(1).toLowerCase() ;
  var fixtures = App[tableKey].FIXTURES ;
  
  if (fixtures) {
    fixtures.forEach(function(fixture){
      var newRecord = store.createRecord(table,fixture) ;
      var p = newRecord.save()
      promises.push(p) ;
    }) ;
  }
  
  return Ember.RSVP.all(promises) ;
}) ;

Ember.Test.registerHelper('destroy', function(){
  Ember.run(function(){
    for (var i=0; i<arguments.length; i++){
      var arg = arguments[i] ;
      arg.destroy() ;
    }
  });
}) ;

Ember.Test.registerHelper('clearLSTable', function(app,table){
  var key = 'App.' + table.charAt(0).toUpperCase() + table.slice(1) ;
  var ns = App.CONSTANTS.dbNamespace ;
  
  var data = localStorage.getItem(ns) ;
  var obj  = data ? JSON.parse(data) : {} ;
  
  obj[key] = { records: {} } ;
  data = JSON.stringify(obj) ;
  
  localStorage.setItem(ns,data) ;

  // load data into adapter
  var adapter = App.__container__.lookup('adapter:application') ;
  adapter._loadData() ;
  
}) ;




Ember.Test.registerHelper('fetchSavedSettings',function(app,store){
  return store.filter('setting',function(s){
    if (s.get('currentState.stateName') === 'root.loaded.saved') {
      return true ;
    }
    return false ;
  }) ;
}) ;


QUnit.testSkip = function() {
  QUnit.test(arguments[0] + ' (SKIPPED)', function() {
    ok(true) ;
    var li = document.getElementById(QUnit.config.current.id);
    QUnit.done(function() {
      li.style.background = '#FFFF99';
    });
  });
};
testSkip = QUnit.testSkip;


App.rootElement = "#qunit" ;
App.setupForTesting() ;
App.injectTestHelpers() ;
