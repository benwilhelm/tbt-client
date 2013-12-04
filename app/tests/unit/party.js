module("Unit - Party",{
  setup: function(){
    var mod = this;
    Ember.run(this,function(){
      var appController = App.__container__.lookup("controller:application") ;
      mod.appC = appController ;
      mod.store = appController.store ;
      resetTests(mod.store).then(function(){
        appController.loadSettings() ;
        mod.baseParty = mod.store.createRecord('party',{
          name: 'baseparty',
          size: 2,
          phone_number: '3125551212',
          time_taken: '2013-11-05T20:15:15'
        }) ;
      }) ; 
    }) ;
    return wait() ;
  },
  
  teardown: function(){
    destroy(this.store, this.appC) ;
    return wait() ;
  }
  
}) ;

test("party.notified", 2, function() {
  var party = this.baseParty;
  equal(false, party.get('notified'), "initially, party.notified should be false") ;
  Ember.run(function(){
    party.set('time_notified', '2013-11-05T20:35:15') ;
    equal(true, party.get('notified'), "after setting time_notified, party.notified should be true") ;
  });
});

test("party.seated", 2, function() {
  var party = this.baseParty;
  equal(false, party.get('seated'), "initially, party.seated should be false") ;
  Ember.run(function(){
    party.set('time_seated', '2013-11-05T20:35:15') ;
    equal(true, party.get('seated'), "after setting time_seated, party.seated should be true") ;
  });
});

test("party.waiting depends on party.time_seated", 3, function() {
  var party = this.baseParty;
  equal(true, party.get('waiting'), "initially, party.waiting should be true") ;
  Ember.run(function(){

    party.set('time_seated', '2013-11-05T20:35:15') ;
    equal(false, party.get('waiting'), "after setting time_seated, party.waiting should be false") ;

    party.set('time_seated', null) ;
    equal(true, party.get('waiting'), "after setting time_seated to null, party.waiting should be true") ;
  });
});

test("party.waiting depends on party.time_cancelled", function() {
  var party = this.baseParty;
  equal(party.get('waiting'), true, "initially, party.waiting should be true") ;
  Ember.run(function(){

    party.set('time_cancelled', '2013-11-05T20:35:15') ;
    equal(party.get('waiting'), false, "after setting time_cancelled, party.waiting should be false") ;

    party.set('time_cancelled', null) ;
    equal(party.get('waiting'), true, "after setting time_cancelled to null, party.waiting should be true") ;
  });
});

test("party.waiting depends on party.time_cancelled and party.time_seated", function() {
  var party = this.baseParty;
  equal(party.get('waiting'), true, "initially, party.waiting should be true") ;
  Ember.run(function(){

    party.set('time_seated', '2013-11-05T20:35:15') ;
    equal(party.get('waiting'), false, "after setting time_seated, party.waiting should be false") ;

    party.set('time_cancelled', '2013-11-05T20:40:15') ;
    equal(party.get('waiting'), false, "after setting time_cancelled, party.waiting should still be false") ;

    party.set('time_cancelled', null) ;
    equal(party.get('waiting'), false, "after setting time_cancelled to null, party.waiting should still be false") ;

    party.set('time_seated', null) ;
    equal(party.get('waiting'), true, "after setting time_seated and time_cancelled to null, party.waiting should be true") ;
  });
});

test("party.countdown should count down seconds", function(){
  var party = this.baseParty ;
  var now = moment() ;

  Ember.run(function(){
    party.set('time_notified',now.subtract('minute',1).format("YYYY-MM-DDTHH:mm:ss")) ;  
    var rem = Math.round(party.get('countdown')/1000) ;
    console.log(rem) ;
    ok(Math.abs(rem-(4*60)) <= 1, "countdown should equal 4 min give or take a second") ;
  });
  
}) ;

test("party.countdown should count up if negative", function(){
  var party = this.baseParty ;

  Ember.run(function(){
    var now = moment() ;
    party.set('time_notified',now.subtract('minute',7).format("YYYY-MM-DDTHH:mm:ss")) ;  
    var rem = Math.round(party.get('countdown')/1000) ;
    ok(Math.abs(rem-(2*60)) <= 1, "countup should equal 2 min give or take a second") ;
  });
  
  Ember.run(function(){
    var now = moment() ;
    party.set('time_notified',now.subtract('minute',9).format("YYYY-MM-DDTHH:mm:ss")) ;
    var rem = Math.round(party.get('countdown')/1000) ;
    ok(Math.abs(rem-(4*60)) <= 1, "countup should equal 4 min give or take a second") ;
  });
  
}) ;

test("party.overdue", function(){
  var party = this.baseParty ;
  var now = moment() ;

  equal(party.get('overdue'), false, "Party should not be initially overdue") ;

  Ember.run(function(){
    party.set('time_notified',now.subtract('minute',3).format("YYYY-MM-DDTHH:mm:ss")) ;  
    equal(party.get('overdue'), false, "Party should not be overdue at 3 min") ;
  });

  Ember.run(function(){
    party.set('time_notified',now.subtract('minute',7).format("YYYY-MM-DDTHH:mm:ss")) ;  
    equal(party.get('overdue'), true, "Party should be overdue at 7 min") ;
  });
}) ;

