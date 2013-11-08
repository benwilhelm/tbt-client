module("Functional - Parties Waiting", {
  setup: function() {
    resetTests() ;
    visit("/parties/waiting") ;
  },
  
  teardown: function() {
    resetTests() ;
  }
})

test("Functional Test", function() {
  equal(find(".party").length,3,'should be three parties waiting') ;
});
