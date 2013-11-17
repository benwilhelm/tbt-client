module("Integration - Settings", {
  setup: function() {
    resetTests() ;
    this.appController = App.__container__.lookup("controller:application") ;
    this.c = App.__container__.lookup("controller:settings") ;
    this.store = this.c.store ;
    wait() ;
  },
  
  teardown: function() {
    resetTests() ;
  }
});

asyncTest("Update Settings", 9, function(){
  equal(App.Settings.returnTime, 5, "Default returnTime should be 5 minutes") ;
  equal(App.Settings.notificationText, "Your table is ready. Please do not reply; this is an automated message.", "Check default notification text") ;
  equal(App.Settings.recallText, "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. Please do not reply; this is an automated message.", "Check default recall text") ;
  
  var newSettings = {
    returnTime: '10',
    notificationText: 'foo',
    recallText: 'bar'
  }
  
  this.c.send('updateSettings',newSettings) ;
  var mod = this ;
  wait().then(function(){
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
  
    // check that saving sets App.Settings
    equal(App.Settings.returnTime, 10, "New returnTime setting should be 10") ;
    equal(App.Settings.notificationText, 'foo', "New notificationText setting should be 'foo'") ;
    equal(App.Settings.recallText, 'bar', "New recallText setting should be 'bar'") ;
  
    start() ;
  }) ;  
  
}) ;


