module("Integration - Settings", {
  setup: function() {
    Ember.run(this,function(){
      this.c = App.__container__.lookup("controller:settings") ;
      this.store = this.c.store ;

      this.apiSpy = sinon.spy(jQuery,'ajax') ;
      this.apiKey = 'siejvk3sk3j2k59wl3kj4kwl' ;
      this.apiSecret = 'siejvk3sk3j2k59wl3kj4kwlsiejvk3sk3j2k59wl3kj4kwl' ;
      this.server = sinon.fakeServer.create() ;
      this.server.autoRespond = true ;
      this.server.respondWith("GET", App.REMOTE_HOST + "/api/credentials",
                              [200, { "Content-Type": "application/json" },
                              '{"error":null,"errorMsg":null,"payload":{"apiKey":"'+ this.apiKey +'","apiSecret":"'+ this.apiSecret +'"}}']);

      resetTests(this.store) ;
      wait() ;
    }) ;
  },
  
  teardown: function() {
    this.apiSpy.restore() ;
    this.server.restore() ;
  }
});

asyncTest("Update Settings", 9, function(){
  equal(App.Settings.returnTime, 5, "Default returnTime should be 5 minutes") ;
  equal(App.Settings.notificationText, "Your table is ready.", "Check default notification text") ;
  equal(App.Settings.recallText, "We apologize, but your table is not ready.", "Check default recall text") ;
  
  var newSettings = {
    returnTime: '10',
    notificationText: 'foo',
    recallText: 'bar'
  }
  
  var mod = this ;

  Ember.run(this,function(){
  
    this.c.updateSettings(newSettings).then(function(){
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
}) ;


asyncTest("Get Api Credentials", 6, function(){
  var mod = this ;
  equal(App.Settings.apiKey, null, "API Key should initially be null") ;
  equal(App.Settings.apiSecret, null, "API Secret should initially be null") ;
  Ember.run(this,function(){
    this.c.authorizeAccount('test@example.com','testtest').then(function(){
      return mod.store.findAll('setting') ;
    }).then(function(settings){
      settings.forEach(function(setting){
        var name = setting.get('name') ;
        if (name === 'apiKey') 
          equal(setting.get('value'), mod.apiKey, "Store's updated API Key setting should be " + mod.apiKey) ;
      
        if (name === 'apiSecret') 
          equal(setting.get('value'), mod.apiSecret, "Store's updated API Secret setting should be " + mod.apiSecret) ;
      });
      
      // check that saving sets App.Settings
      equal(App.Settings.apiKey, mod.apiKey, "New apiKey setting should be " + mod.apiKey) ;
      equal(App.Settings.apiSecret, mod.apiSecret, "New apiSecret setting should be " + mod.apiSecret) ;
      start() ;
    }) ;
  })
})


