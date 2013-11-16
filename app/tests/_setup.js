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

Ember.Test.registerHelper('resetTests', function(){
  App.reset() ;
  App.Party.resetFixtures() ;
});


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
