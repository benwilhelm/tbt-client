module("Integration - Party", {
  setup: function() {
    resetTests() ;
    this.c = App.__container__.lookup("controller:parties") ;
    this.store = this.c.store ;
  },
  
  teardown: function() {
    resetTests() ;
  }
});


asyncTest("parties.actions.notify", 2, function(){
  var mod = this ;
  var party, stamp ;
  getPartyLists(mod.store).then(function(parties){
    party = parties.waiting[0] ;
    equal(party.get('time_notified'), null, "time_notified should initially be null") ;
    stamp = moment() ;
    return mod.c.send('notify',party) ;
  }).then(function(){
    Ember.run.later(function(){
      equal(party.get('time_notified'), stamp.format("YYYY-MM-DDTHH:mm:ss"), "time_notified should reflect time sent") ;
      start() ;
    }, 2000) ;
  }) ;
})

asyncTest("parties.actions.recall", 2, function(){
  var mod = this ;
  var party, stamp ;
  getPartyLists(mod.store).then(function(parties){
    party = parties.waiting[0] ;
    return mod.c.send('notify',party) ;
  }).then(function(){
    ok(party.get('time_notified'), "initially time_notified should not be null") ;
    return mod.c.send('recall', party) ;
  }).then(function(){
    equal(party.get('time_notified'), null, "time_notified should be null after recalling party") ;
    start() ;
  }) ;
}) ;

asyncTest("parties.actions.seat", 7, function(){
  var mod = this ;
  var time_seated, party ;
  getPartyLists(mod.store).then(function(parties){

    equal(parties.waiting.length, 3, "should initially be three parties waiting") ;
    equal(parties.seated.length,  1, "should initially be one party seated") ;
    equal(parties.cancelled.length, 1, "should initially be one party cancelled") ;
    party = parties.waiting[0] ;
    time_seated = moment() ;
    return mod.c.send('seat',party) ;
    
  }).then(function(){
    return getPartyLists(mod.store) ;
  
  }).then(function(parties){
    equal(party.get('time_seated'), time_seated.format("YYYY-MM-DDTHH:mm:ss"), "party.time_seated should reflect time of action." )
    equal(parties.waiting.length, 2, "after seating one party, should be two parties waiting") ;
    equal(parties.seated.length,  2, "after seating one party, should be two parties seated") ;
    equal(parties.cancelled.length, 1, "after seating one party, should still be one party cancelled") ;

    start() ;
  }) ;
}) ;


asyncTest("parties.actions.unseat", 7, function(){
  var mod = this ;
  var party ;
  getPartyLists(mod.store).then(function(parties){

    equal(parties.waiting.length, 3, "should initially be three parties waiting") ;
    equal(parties.seated.length,  1, "should initially be one party seated") ;
    equal(parties.cancelled.length, 1, "should initially be one party cancelled") ;
    party = parties.seated[0] ;
    
    return mod.c.send('unseat',party) ;
    
  }).then(function(){
    return getPartyLists(mod.store) ;
  
  }).then(function(parties){
    equal(parties.waiting.length, 4, "after unseating one party, should be four parties waiting") ;
    equal(parties.seated.length,  0, "after unseating one party, should be zero parties seated") ;
    equal(parties.cancelled.length, 1, "after unseating one party, should still be one party cancelled") ;
    equal(party.get('time_seated'), null, "after unseating, party.time_seated should be null") ;
    start() ;
  }) ;
}) ;

asyncTest("parties.actions.cancel", 7, function(){
  var mod = this ;
  var time_cancelled, party
  getPartyLists(mod.store).then(function(parties){

    equal(parties.waiting.length, 3, "should initially be three parties waiting") ;
    equal(parties.seated.length,  1, "should initially be one party seated") ;
    equal(parties.cancelled.length, 1, "should initially be one party cancelled") ;
    party = parties.waiting[0] ;
    time_cancelled = moment() ;
    return mod.c.send('cancel',party) ;
    
  }).then(function(){
    return getPartyLists(mod.store) ;
  
  }).then(function(parties){
    equal(party.get('time_cancelled'), time_cancelled.format("YYYY-MM-DDTHH:mm:ss"), "party.time_cancelled should reflect time of action") ;
    equal(parties.waiting.length, 2, "after cancelling one party, should be two parties waiting") ;
    equal(parties.seated.length,  1, "after cancelling one party, should still be one party seated") ;
    equal(parties.cancelled.length, 2, "after cancelling one party, should be two parties cancelled") ;

    start() ;
  }) ;
}) ;

asyncTest("parties.actions.restore", 7, function(){
  var mod = this ;
  var party ;
  getPartyLists(mod.store).then(function(parties){

    equal(parties.waiting.length, 3, "should initially be three parties waiting") ;
    equal(parties.seated.length,  1, "should initially be one party seated") ;
    equal(parties.cancelled.length, 1, "should initially be one party cancelled") ;
    party = parties.cancelled[0] ;
    return mod.c.send('restore',party) ;
    
  }).then(function(){
    return getPartyLists(mod.store) ;
  
  }).then(function(parties){
    equal(party.get('time_cancelled'), null, "after restoring party, party.time_cancelled should equal null") ;
    equal(parties.waiting.length, 4, "after restoring one party, should be four parties waiting") ;
    equal(parties.seated.length,  1, "after restoring one party, should still be one party seated") ;
    equal(parties.cancelled.length, 0, "after restoring one party, should be zero parties cancelled") ;

    start() ;
  }) ;
}) ;
