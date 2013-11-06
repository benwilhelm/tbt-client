module("Unit Module",{
  setup: function(){
    App.reset() ;
  },
  
  tearDown: function() {
    clearInterval(App.timer) ;
  }
}) ;

test("Unit Test", function() {
	ok(1 == "1", "Basic test example ");
});