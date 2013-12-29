module("Integration - Application",{
  setup: function(){
    Ember.run(this, function(){
      var c = App.__container__.lookup("controller:settings") ;
      this.store = c.store ;
      resetTests(this.store) ;
    });
  }
}) ;

asyncTest("AppController.init", 7, function(){

  Ember.run(this,function(){
    this.store.findAll('setting').then(function(settings){
      equal(App.Settings.returnTime, 5, "Default returnTime should be 5 minutes") ;
      equal(App.Settings.notificationText, "Your table is ready.", "Check default notification text") ;
      equal(App.Settings.recallText, "We apologize, but your table is not ready.", "Check default recall text") ;
  
      settings.forEach(function(s){
        var name = s.get('name') ;
        var value = s.get('value') ;
        
        if (name === 'returnTime')
          equal(value, 5, "store's returnTime Setting should be 5") ;
        
        if (name === 'notificationText')
          equal(value, "Your table is ready.", "check store's notificationText setting") ;
        
        if (name === 'recallText')
          equal(value, "We apologize, but your table is not ready.", "check store's recallText setting") ;
      });
      
      ok(App.timer, "Check App.timer started") ;
      start() ;
    });
  });  
}) ;

