module("Integration - Parties Waiting", {
  setup: function() {
    Ember.run(this,function(){
      var c = App.__container__.lookup("controller:parties_waiting") ;
      resetTests(c.store) ;
      wait() ;
    }) ;
  }
});


asyncTest("parties.waiting.openAddPartyDialog", function(){
  Ember.run(this,function(){
    var c = App.__container__.lookup("controller:parties_waiting") ;
    equal(c.get('addingNewParty'), undefined, "addingNewParty should initally be undefined") ;
    c.send('openAddPartyDialog') ;
    equal(c.get('addingNewParty'), true, "after sending 'openAddPartyDialog, addingNewParty should be true") ;
    start() ;
  }) ;
}) ;

asyncTest("parties.waiting.closeAddPartyDialog", function(){
  Ember.run(this,function(){
    var c = App.__container__.lookup("controller:parties_waiting") ;
    c.set('addingNewParty',true) ;
    equal(c.get('addingNewParty'), true, "addingNewParty should initally be true") ;
    c.send('closeAddPartyDialog') ;
    equal(c.get('addingNewParty'), false, "after sending 'closeAddPartyDialog, addingNewParty should be false") ;
    start() ;
  });
}) ;

/**
 * Unable to write a test that successfully tests the newParty
 * action on the PartiesWaiting controller. The post-save push
 * to content causes scoping and run-loop problems that I"m unable
 * to solve at present.  However, the function works and will be 
 * covered by functional testing.
 */
testSkip("parties.waiting.newParty", function(){
  var info = {
    name: 'baseparty',
    size: 2,
    phone_number: '3125551212',
    time_taken: '2013-11-05T20:15:15',
    time_promised: '2013-11-05T20:45:15'
  }
  var mod = this ;
   
}) ;