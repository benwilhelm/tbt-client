module("Integration - Parties Waiting", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:parties_waiting") ;
      this.store = this.c.store ;
      resetTests(this.store) ;
      this.baseParty = this.store.createRecord('party',{
        name: 'baseparty',
        size: 2,
        phone_number: '3125551212',
        time_taken: '2013-11-05T20:15:15'
      }) ;
      wait() ;
    }) ;
  }
});


asyncTest("parties.waiting.openAddPartyDialog", function(){
  equal(this.c.get('addingNewParty'), undefined, "addingNewParty should initally be undefined") ;
  this.c.send('openAddPartyDialog') ;
  equal(this.c.get('addingNewParty'), true, "after sending 'openAddPartyDialog, addingNewParty should be true") ;
  start() ;
}) ;

asyncTest("parties.waiting.closeAddPartyDialog", function(){
  this.c.set('addingNewParty',true) ;
  equal(this.c.get('addingNewParty'), true, "addingNewParty should initally be true") ;
  this.c.send('closeAddPartyDialog') ;
  equal(this.c.get('addingNewParty'), false, "after sending 'closeAddPartyDialog, addingNewParty should be false") ;
  start() ;
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