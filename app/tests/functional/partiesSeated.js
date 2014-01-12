module("Functional - Parties Seated", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:parties_seated") ;
      this.pc = App.__container__.lookup("controller:parties") ;
      this.store = this.c.store ;
      resetTests(this.store).then(function(){
        return resetTestingDb() ;
      }).then(function(){
        visit("/parties/seated") ;
      }) ;
    });
  }
}) ;


asyncTest("Unseat Party", 3, function(){
  wait().then(function(){
    var $party = $(".party").first() ;
    var view_id = $party.closest('.ember-view').attr('id') ;
    var btn_selector = "#" + view_id + " .party .button.unseat" ;
    equal($(".party").length, 1, "Initially, should be one party seated") ;
    click(btn_selector).then(function(){
      equal($(".party").length, 0, "After clicking 'unseat', should be no parties seated") ;
      return visit("/parties/waiting") ;
    }).then(function(){
      equal($(".party").length, 4, "After clicking 'unseat', should be four parties waiting") ;
      start() ;
    }) ;
  });
}) ;

asyncTest("Cancel Party", 3, function(){
  wait().then(function(){
    var $party = $(".party").first() ;
    var view_id = $party.closest('.ember-view').attr('id') ;
    var btn_selector = "#" + view_id + " .party .button.cancel" ;
    equal($(".party").length, 1, "Initially, should be one party seated") ;
    click(btn_selector).then(function(){
      equal($(".party").length, 0, "After clicking 'cancel', should be no parties seated") ;
      return visit("/parties/cancelled") ;
    }).then(function(){
      equal($(".party").length, 2, "After clicking 'cancel', should be two parties cancelled") ;
      start() ;
    }) ;
  });
}) ;

