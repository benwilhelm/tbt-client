App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: App.CONSTANTS.dbNamespace,
  
  query: function(records,query){
    
    if (query.waiting) {
      delete query.waiting ;
      query.time_seated = null ;
      query.time_cancelled = null ;
    }
    
    if (query.seated) {
      delete query.seated ;
      query.time_seated = /.+/ ;
    }
    
    if (query.cancelled) {
      delete query.cancelled ;
      query.time_cancelled = /.+/ ;
    }
    
    return this._super(records,query) ;
  }
  
});

App.ApplicationAdapter.reopen({
  truncateTable: function(table) {
    console.log(table) ;
  }  
}) ;

App.ApplicationSerializer = DS.JSONSerializer.extend({}) ;
App.AdapterType = 'localstorage' ;
