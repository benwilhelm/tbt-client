module("Integration - Party", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:parties") ;
      this.store = this.c.store ;
      this.apiSpy = sinon.spy(jQuery,'ajax') ;
      resetTests(this.store) ;
      this.server = sinon.fakeServer.create() ;
      this.server.autoRespond = true ;
      this.server.respondWith("POST", App.REMOTE_HOST + "/api/notifications",
                              [200, { "Content-Type": "application/json" },
                              '{"error":null,"errorMsg":null,"payload":{"__v":0,"timeLogged":"2013-12-29T22:06:39.000Z","from":"52acfaa15633d90200000001","to":"8476449168","timeSent":"2013-12-14T18:14:16.000Z","timeTaken":"2013-12-14T17:34:16.000Z","timePromised":"2013-12-14T18:16:16.000Z","type":"tableReady","message":"testmessage","_id":"52c09cef7170370200000001","billed":false}}']);
      wait() ;
    }) ;
  },
  
  teardown: function(){
    this.apiSpy.restore() ;
    this.server.restore() ;
  }
});


asyncTest("parties.actions.notify", 5, function(){
  var mod = this ;
  var party, stamp ;
  App.Settings.apiKey = 'afafafafafafafafafafafaf' ;
  App.Settings.apiSecret = 'afafafafafafafafafafafafafafafafafafafafafafafaf' ;
  Ember.run(function(){
    getPartyLists(mod.store).then(function(parties){
      party = parties.waiting[0] ;
      equal(party.get('time_notified'), null, "time_notified should initially be null") ;
      stamp = moment() ;
      mod.c.send('notify',party) ;
      return wait() ;
    }).then(function(){
      var call = jQuery.ajax.getCall(0) ;
      var args = call.args[0] ;
      ok(mod.apiSpy.calledOnce, "Should make ajax call to API") ;
      equal("POST", args.type, "Request type should be POST");
      equal(App.REMOTE_HOST + "/api/notifications", args.url, "check URL");
      equal(party.get('time_notified'), stamp.format("YYYY-MM-DDTHH:mm:ss"), "time_notified should reflect time sent") ;
      start() ;
    }) ;
  });
})

asyncTest("parties.actions.recall", 5, function(){
  var mod = this ;
  var party, stamp ;
  App.Settings.apiKey = 'afafafafafafafafafafafaf' ;
  App.Settings.apiSecret = 'afafafafafafafafafafafafafafafafafafafafafafafaf' ;
  Ember.run(this,function(){
    getPartyLists(mod.store).then(function(parties){
      party = parties.waiting[0] ;
      mod.c.send('notify',party) ;
      return wait() ;
    }).then(function(){
      mod.apiSpy.reset() ;
      ok(party.get('time_notified'), "initially time_notified should not be null") ;
      mod.c.send('recall', party) ;
      return wait() ;
    }).then(function(){
      var call = jQuery.ajax.getCall(0) ;
      var args = call.args[0] ;
      ok(mod.apiSpy.calledOnce, "Should make ajax call to API") ;
      equal("POST", args.type, "Request type should be POST");
      equal(App.REMOTE_HOST + "/api/notifications", args.url, "check URL");
      equal(party.get('time_notified'), null, "time_notified should be null after recalling party") ;
      start() ;
    }) ;
  });
}) ;

asyncTest("parties.actions.seat", 7, function(){
  var mod = this ;
  var time_seated, party ;
  Ember.run(this,function(){
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
}) ;


asyncTest("parties.actions.unseat", 7, function(){
  var mod = this ;
  var party ;
  Ember.run(this,function(){
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
  });
}) ;

asyncTest("parties.actions.cancel", 7, function(){
  var mod = this ;
  var time_cancelled, party
  Ember.run(this,function(){
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
}) ;

asyncTest("parties.actions.restore", 7, function(){
  var mod = this ;
  var party ;

  Ember.run(this,function(){
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
}) ;

asyncTest("parties.actions.deleteAll", 7, function(){
  var self = this ;
  Ember.run(this,function(){
    getPartyLists(self.store).then(function(parties){
      equal(parties.waiting.length, 3, "should initially be three parties waiting") ;
      equal(parties.seated.length,  1, "should initially be one party seated") ;
      equal(parties.cancelled.length, 1, "should initially be one party cancelled") ;
      self.c.send('deleteAll') ;
      return wait() ;
    }).then(function(){
      return getPartyLists(self.store) ;
    }).then(function(parties){
      equal(parties.waiting.length, 0, "waiting list should be empty") ;
      equal(parties.seated.length,  0, "seated list should be empty") ;
      equal(parties.cancelled.length, 0, "cancelled list should be empty") ;
      
      return self.store.findAll('party') ;
    }).then(function(parties){
      equal(parties.get('content.length'), 0, "should be no parties in store") ;
      start() ;
    }) ;
  });
})
