App.ApplicationAdapter = DS.FixtureAdapter.extend({
  queryFixtures: function(fixtures,query,type){
    return fixtures.filter(function(fxtr){
      for (var key in query) {
        var val = query[key] ;
        switch (key) {
          case 'waiting':
            if (val === true && (fxtr.time_seated !== null || fxtr.time_cancelled !== null)) {
              return false;
            }
            break;
            
          case 'seated': 
            if (val === true && fxtr.time_seated === null) {
              return false;
            }
            break;
          
          case 'cancelled': 
            if (val === true && fxtr.time_cancelled === null) {
              return false;
            }
            break;
          
          default:
            if (fxtr[key] !== val) {
              return false ;
            }
            break;
        }
      }
      return true ;
    }) ;
  }

});
App.ApplicationSerializer = DS.JSONSerializer.extend({}) ;
App.Party.resetFixtures() ;
