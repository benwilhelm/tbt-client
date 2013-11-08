module("Integration - Parties Waiting", {
  setup: function() {
    resetTests() ;
    this.c = App.__container__.lookup("controller:parties_waiting") ;
    this.store = this.c.store ;
  },
  
  teardown: function() {
    resetTests() ;
  }
});


test("parties.waiting.openAddPartyDialog", function(){
  equal(this.c.get('addingNewParty'), undefined, "addingNewParty should initally be undefined") ;
  this.c.send('openAddPartyDialog') ;
  equal(this.c.get('addingNewParty'), true, "after sending 'openAddPartyDialog, addingNewParty should be true") ;
}) ;

test("parties.waiting.closeAddPartyDialog", function(){
  this.c.set('addingNewParty',true) ;
  equal(this.c.get('addingNewParty'), true, "addingNewParty should initally be true") ;
  this.c.send('closeAddPartyDialog') ;
  equal(this.c.get('addingNewParty'), false, "after sending 'closeAddPartyDialog, addingNewParty should be false") ;
}) ;