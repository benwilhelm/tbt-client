module("Functional - Settings", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:settings") ;
      this.store = this.c.store ;
      resetTests(this.store).then(function(){
        visit("/settings") ;
      }) ;
    });
  }
}) ;


asyncTest("test of saved settings", 11, function(){
  var mod = this ;

  equal($("#returnTime").val(), 5, "Default returnTime should be 5 minutes") ;
  equal($("#notificationText").val(), "Your table is ready. Please do not reply; this is an automated message.", "Check default notification text") ;
  equal($("#recallText").val(), "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. Please do not reply; this is an automated message.", "Check default recall text") ;
  equal($("#settings_status").html(),'&nbsp;', "initially, settings_status should be empty space") ;
  
  fillIn('#returnTime',10)
  .fillIn('#notificationText','foo')
  .fillIn('#recallText','bar')
  .click('#saveSettings').then(function(){
    // check that saving sets App.Settings
    equal($("#returnTime").val(), 10, "returnTime input value should be 10") ;
    equal($("#notificationText").val(), "foo", "Notification Text input should be 'foo'") ;
    equal($("#recallText").val(), "bar", "Recall Text input should be 'bar'") ;
    equal($("#settings_status").text(),'Saved', "settings_status should be 'Saved'") ;
    return mod.store.findAll('setting') ;
  }).then(function(settings){
    settings.forEach(function(setting){
      var name = setting.get('name') ;
      if (name === 'returnTime') 
        equal(setting.get('value'), 10, "Store's updated returnTime setting should be 10") ;
      
      if (name === 'notificationText') 
        equal(setting.get('value'), 'foo', "Store's updated notificationText setting should be 'foo'") ;
    
      if (name === 'recallText') 
        equal(setting.get('value'), 'bar', "Store's updated recallText setting should be 'bar'") ;
    }) ;
  
  
    start() ;
  }) ;  
}) ;
