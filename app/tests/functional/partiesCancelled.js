module("Functional - Parties Cancelled", {
  setup: function() {

    Ember.run(this, function(){
      this.c = App.__container__.lookup("controller:parties_cancelled") ;
      this.pc = App.__container__.lookup("controller:parties") ;
      this.store = this.c.store ;
      resetTests(this.store).then(function(){
        return resetTestingDb() ;
      }).then(function(){
        visit("/parties/cancelled") ;
      }) ;
    }) ;
  }
}) ;


asyncTest("Restore Party", 3, function(){
  wait().then(function(){
    var $party = $(".party").first() ;
    var view_id = $party.closest('.ember-view').attr('id') ;
    var btn_selector = "#" + view_id + " .party .button.restore" ;
    equal($(".party").length, 1, "Initially, should be one party seated") ;
    click(btn_selector).then(function(){
      equal($(".party").length, 0, "After clicking 'restore', should be no parties cancelled") ;
      return visit("/parties/waiting") ;
    }).then(function(){
      equal($(".party").length, 4, "After clicking 'restore', should be four parties waiting") ;
      start() ;
    }) ;
  });
}) ;

