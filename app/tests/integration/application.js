module("Integration - Application",{
  setup: function(){
    resetTests() ; 
    this.c = App.__container__.lookup("controller:application") ;
    this.store = this.c.store ;
    return wait() ;
  },
  
  teardown: function() {
    resetTests() ;
  }
}) ;

asyncTest("App.loadSettings", 3, function(){
  App.Settings = {} ;
  this.c.loadSettings().then(function(){
    equal(App.Settings.returnTime, 5, "Default returnTime should be 5 minutes") ;
    equal(App.Settings.notificationText, "Your table is ready. This is an automated message. Please do not reply to it.", "Check default notification text") ;
    equal(App.Settings.recallText, "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. This is an automated message. Please do not reply to it.", "Check default recall text") ;
    start() ;
  });
}) ;

