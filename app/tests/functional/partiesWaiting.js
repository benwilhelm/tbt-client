module("Functional - Parties Waiting", {
  setup: function() {
    resetTests() ;
    this.c = App.__container__.lookup("controller:parties_waiting") ;
    this.pc = App.__container__.lookup("controller:parties") ;
    this.store = this.c.store ;
    visit("/parties/waiting") ;
  },
  
  teardown: function() {
    resetTests() ;
  }
}) ;

test("Test of initial state", function() {
  equal(find(".party").length, 3, 'should be three parties waiting') ;
});

asyncTest("Notify Waiting Party", 6, function(){
  var $party = $(".party").first() ;
  var view_id = $party.closest('.ember-view').attr('id') ;
  var btn_selector = "#" + view_id + " .party .button.notify" ;
  var spy = sinon.spy(this.pc._actions,"notify") ;
  equal($(btn_selector).hasClass('notified'), false, "Initially, notify button should not have class 'notified'") ;
  equal($(btn_selector).text(), "Notify (847) 644-9168", "Initially, button text should be 'notify'") ;
  click(btn_selector).then(function(){
    ok($(btn_selector).hasClass('notified'), "After clicking, button should have class 'notified'") ;
    ok($(btn_selector).text(), "Notified 4:59", "Clicking notify button should start timer") ;
    ok(spy.calledOnce, "party.notify should be called once") ;
    Ember.run.later(function(){
      ok($(btn_selector).text(), "Notified 4:58", "Timer should run") ;
      start() ;
    },1000) ;
    spy.restore() ;
  }) ;
}) ;

asyncTest("Recall Notified Party", 5, function(){
  var $party = $(".party").first() ;
  var view_id = $party.closest('.ember-view').attr('id') ;
  var btn_selector = "#" + view_id + " .party .button.notify" ;
  var spyRecall = sinon.spy(this.pc._actions,"recall") ;
  var stubConfirm = sinon.stub(window, 'confirm', function(){return true}) ;
  click(btn_selector).then(function(){
    ok($(btn_selector).hasClass('notified'), "Verifying that party has been notified first.") ;
    
    return click(btn_selector) ;
  }).then(function(){
    ok(spyRecall.calledOnce, "Recall action should be called once.") ;
    ok(stubConfirm.calledOnce, "window.confirm should be called when recalling") ;
    equal($(btn_selector).hasClass('notified'), false, "After recalling, notify button should not have class 'notified'") ;
    equal($(btn_selector).text(), "Notify (847) 644-9168", "After recalling, button text should be 'notify'") ;
    start() ;
  }) ;  
}) ;

asyncTest("Seat Party", 4, function(){
  var $party = $(".party").first() ;
  var view_id = $party.closest('.ember-view').attr('id') ;
  var btn_selector = "#" + view_id + " .party .button.seat" ;
  var now = moment() ;
  equal($(".party").length, 3, "Initially, should be three parties waiting") ;
  click(btn_selector).then(function(){
    equal($(".party").length, 2, "After clicking 'seat', should be two parties waiting") ;
    return visit("/parties/seated") ;
  }).then(function(){
    equal($(".party").length, 2, "After clicking 'seat', should be two parties seated") ;
    var time_seated = "Time Seated: " + now.format("h:mm") ;
    equal($(".party").eq(1).find(".time-seated").text(), time_seated, "Should show time seated");
    start() ;
  }) ;
}) ;

asyncTest("Cancel Party", 4, function(){
  var $party = $(".party").first() ;
  var view_id = $party.closest('.ember-view').attr('id') ;
  var btn_selector = "#" + view_id + " .party .button.cancel" ;
  var now = moment() ;
  equal($(".party").length, 3, "Initially, should be three parties waiting") ;
  click(btn_selector).then(function(){
    equal($(".party").length, 2, "After clicking 'cancel', should be two parties waiting") ;
    return visit("/parties/cancelled") ;
  }).then(function(){
    equal($(".party").length, 2, "After clicking 'cancel', should be two parties cancelled") ;
    var time_cancelled = "Time Cancelled: " + now.format("h:mm") ;
    equal($(".party").eq(0).find(".time-cancelled").text(), time_cancelled, "Should show time cancelled");
    start() ;
  }) ;
}) ;

asyncTest("Add New Party", 5, function(){
  var now = moment() ;
  click("#open_add_party_dialog")
  .fillIn("#party_name", 'newparty')
  .fillIn("#party_size", 3)
  .fillIn("#party_phone", 3125551212)
  .fillIn("#party_wait", 35)
  .click("#add_party_button")
  .then(function(){
    var $party = $(".party").eq(3) ;
    equal($party.find('.name').text(), "newparty", "New Party's name should show in the name field") ;
    equal($party.find('.party-size').text(), "3", "New Party's size should show in the size field") ;
    var time_taken = "Time Taken: " + now.format("h:mm") ;
    var time_promised = "Time Promised: " + now.add('m',35).format("h:mm") ;
    equal($party.find('.time-taken').text(), time_taken, "New Party's time_taken should be now") ;
    equal($party.find('.time-promised').text(), time_promised, "New Party's time promised show in the name field") ;
    equal($party.find('.button.notify').text(), "Notify (312) 555-1212", "New party's notify button should include phone number")
    start() ;
  }) ;
})