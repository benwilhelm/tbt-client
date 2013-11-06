module("Functional Module", {
  setup: function() {
    App.reset() ;
  },
  
  tearDown: function() {
    clearInterval(App.timer) ;
  }
})

asyncTest("Functional Test", function() {
  equal(1,1,'wtf????') ;
  visit("/parties/waiting").then(function(){
    equal(1,1,'please?') ;
    equal(find(".party").length,3,'should be three parties waiting') ;
    start() ;
  });
});
