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
  App.Party.resetFixtures() ;
  App.Setting.resetFixtures() ;

  var promises = [
    loadFixtures(store,'party'),
    loadFixtures(store,'setting')
  ];
  
  return Ember.RSVP.all(promises) ;
});

Ember.Test.registerHelper('loadFixtures', function(app,store,table){
  var promises = [] ;
  var tableKey = table.charAt(0).toUpperCase() + table.slice(1).toLowerCase() ;
  var fixtures = App[tableKey].FIXTURES ;
  
  App[tableKey].FIXTURES.forEach(function(fixture){
    var newRecord = store.createRecord(table,fixture) ;
    promises.push(newRecord.save()) ;
  }) ;
    
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
