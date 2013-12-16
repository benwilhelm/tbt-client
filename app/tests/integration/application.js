module("Integration - Application",{
  setup: function(){
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:application") ;
      this.store = this.c.store ;
      resetTests(this.store) ; 
    }) ;
  }
}) ;

asyncTest("App.loadSettings", 3, function(){
  App.Settings = {} ;
  Ember.run(this,function(){
    this.c.loadSettings().then(function(){
      equal(App.Settings.returnTime, 5, "Default returnTime should be 5 minutes") ;
      equal(App.Settings.notificationText, "Your table is ready. Please do not reply; this is an automated message.", "Check default notification text") ;
      equal(App.Settings.recallText, "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. Please do not reply; this is an automated message.", "Check default recall text") ;
      start() ;
    });
  }) ;
}) ;

