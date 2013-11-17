module("Unit - Setting",{
  setup: function(){
    resetTests() ; 
    appController = App.__container__.lookup("controller:application") ;
    this.c = App.__container__.lookup("controller:settings") ;
    this.store = appController.get('store') ;
    appController.loadSettings() ;
    return wait() ;
  },
  
  teardown: function() {
    resetTests() ;
  }
}) ;

asyncTest("Saving should update corresponding App.Setting", 3, function(){
  var mod = this ;
  equal(App.Settings.returnTime, 5, "Initially, App.Settings.returnTime should be 5") ;
  this.store.find('setting',{name:'returnTime'}).then(function(rslt){
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
}) ;