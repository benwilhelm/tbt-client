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

asyncTest("Authorize Account", 12, function(){
  var self = this ;
  wait().then(function(){
    equal(App.Settings.apiKey, null, "Initially, apiKey should be null");
    equal(App.Settings.apiSecret, null, "Initially, apiSecret should be null");
    equal($(".account-info .status").text().trim(), "Your account is not yet authorized.", "Initially, status message should say account is not yet authorized") ;
    equal($("#authorizeToggle").text().trim(), "Authorize Account", "Initially, toggle button text should be 'Authorize Account'") ;
    click("#authorizeToggle").then(function(){
      ok($("#accountEmail").length, "Verify email input shown") ;
      ok($("#accountPassword").length, "Verify password input shown") ;
      fillIn('#accountEmail','test@example.com') ;
      fillIn('#accountPassword','testtest') ;
      return wait() ;
    }).then(function(){
      click("#authorizeAccount") ;
      return wait() ;
    }).then(function(){
      ok(App.Settings.apiKey.match(/^[a-fA-F0-9]{24}$/), "apiKey should be gotten, 24-digit hex string") ;
      ok(App.Settings.apiSecret.match(/^[a-fA-F0-9]{48}$/), "apiSecret should be gotten, 48-digit hex string") ;
      equal($("#accountEmail").length, 0, "Verify email input hidden") ;
      equal($("#accountPassword").length, 0, "Verify password input hidden") ;
      equal($(".account-info .status").text().trim(), "Your account is authorized.", "status message should say account is authorized")
      equal($("#authorizeToggle").text().trim(), "Reset Authorization", "toggle button text should be 'Reset Authorization'") ;
      start() ;
    });
  });
});
