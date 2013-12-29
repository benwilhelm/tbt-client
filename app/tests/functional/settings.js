module("Functional - Settings", {
  setup: function() {
    Ember.run(this,function(){
      var self = this ;
      self.c = App.__container__.lookup("controller:settings") ;
      this.store = this.c.store ;
      resetTests(this.store).then(function(){
        visit("/settings") ;
        wait() ;
      }) ;
    });
  }
}) ;


asyncTest("test of saved settings", 11, function(){
  var mod = this ;

  equal($("#returnTime").val(), 5, "Default returnTime should be 5 minutes") ;
  equal($("#notificationText").val(), "Your table is ready.", "Check default notification text") ;
  equal($("#recallText").val(), "We apologize, but your table is not ready.", "Check default recall text") ;
  equal($("#settings_status").html(),'&nbsp;', "initially, settings_status should be empty space") ;
  
  fillIn('#returnTime',10)
  .fillIn('#notificationText','foo')
  .fillIn('#recallText','bar')
  .click('#saveSettings').then(function(){
    // check that inputs are displaying new values
    equal($("#returnTime").val(), 10, "returnTime input value should be 10") ;
    equal($("#notificationText").val(), "foo", "Notification Text input should be 'foo'") ;
    equal($("#recallText").val(), "bar", "Recall Text input should be 'bar'") ;
    equal($("#settings_status").text(),'Saved', "settings_status should be 'Saved'") ;

    for (var name in App.Settings) {
      // check that saving updates App.Settings
      var value = App.Settings[name] ;

      if (name === 'returnTime') 
        equal(value, 10, "App.Settings's updated returnTime setting should be 10") ;
      
      if (name === 'notificationText') 
        equal(value, 'foo', "App.Settings's updated notificationText setting should be 'foo'") ;
    
      if (name === 'recallText') 
        equal(value, 'bar', "App.Settings's updated recallText setting should be 'bar'") ;
      
    }
    
    start() ;
  }) ;  
}) ;
