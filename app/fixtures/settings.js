App.Setting.loadFixtures = function(){
  var ctr = App.__container__.lookup("controller:settings") ;
  var defaultSettings = ctr.get('defaultSettings') ;
  App.Setting.FIXTURES = [] ;
  
  for (var key in defaultSettings) {
    var val = defaultSettings[key] ;
    var o = {
      name: key,
      value: val 
    };
    App.Setting.FIXTURES.push(o) ;
  }
};
