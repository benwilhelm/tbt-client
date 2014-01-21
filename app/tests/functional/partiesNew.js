module("Functional - Create New Party", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:parties_new") ;
      this.pc = App.__container__.lookup("controller:parties") ;
      this.store = this.c.store ;
      resetTests(this.store).then(function(){
        return resetTestingDb() ;
      }).then(function(){
        visit("/parties/new") ;
      }) ;
    });
  }
}) ;

asyncTest("Add New Party", 7, function(){
  var now = moment() ;
  wait()
  .fillIn("#party_name", 'newparty')
  .fillIn("#party_size", 3)
  .fillIn("#party_phone", 3125551212)
  .fillIn("#party_wait", 35)
  .click("#add_party_button")
  .then(function(){
    var $parties = $(".party") ;
    equal($parties.length, 4, "Should be 4 parties waiting after saving new party") ;
    var $party = $parties.eq(3) ;
    equal($party.find('.name').text(), "newparty", "New Party's name should show in the name field") ;
    equal($party.find('.party-size').text(), "3", "New Party's size should show in the size field") ;
    var time_taken = "Time Taken: " + now.format("h:mm") ;
    var time_promised = "Time Promised: " + now.add('m',35).format("h:mm") ;
    equal($party.find('.time-taken').text(), time_taken, "New Party's time_taken should be now") ;
    equal($party.find('.time-promised').text(), time_promised, "New Party's time promised show in the name field") ;
    ok($party.find('.button.notify').text().indexOf("(312) 555-1212") !== -1, "New party's notify button should include phone number") ;
    equal(App.get('currentPath'), "parties.waiting", "Should redirect to parties/waiting after successful save") ;
    start() ;
  }) ;
}) ;

