module("Unit - Setting",{
  setup: function(){
    var mod = this ;
    Ember.run(this,function(){
      mod.store = App.__container__.lookup("controller:settings").store ;
      resetTests(mod.store)
      wait() ;
    }) ; 
  },
  
  teardown: function() {
    destroy(this.c, this.store, this.appC) ;
  }
}) ;

asyncTest("Saving should update corresponding App.Setting", 3, function(){
  var mod = this ;
  Ember.run(this,function(){
    equal(App.Settings.returnTime, 5, "Initially, App.Settings.returnTime should be 5") ;
    mod.store.find('setting',{name:'returnTime'}).then(function(rslt){
      var setting = rslt.objectAt(0) ;
      setting.set('value', 10) ;
      return setting.save() ;
    }).then(function(){
      return mod.store.find('setting',{name:'returnTime'}) ;
    }).then(function(rslt){
      var setting = rslt.objectAt(0) ;
      equal(App.Settings.returnTime, 10, "After updating, App.Settings.returnTime should be 10") ;
      equal(setting.get('value'), 10, "After updating, setting.value should be 10") ;
      
      start() ;
    }) ;
  });
}) ;