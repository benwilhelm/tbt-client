App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: App.CONSTANTS.dbNamespace,
  
  
  /**
   * totally rewriting this method to make
   * the queries AND instead of OR. Does not
   * make any call to the original method found
   * in lib/localstorage_adapter.js.
   */
  query: function(records,query){
    
    if (query.waiting) {
      delete query.waiting ;
      query.time_seated = null ;
      query.time_cancelled = null ;
    }
    
    if (query.seated) {
      delete query.seated ;
      query.time_seated = true ;
    }
    
    if (query.cancelled) {
      delete query.cancelled ;
      query.time_cancelled = true ;
    }

		var results = [];
		var id, record, property, test, push;
		for (id in records) {
			record = records[id];
			reject = false;
			for (property in query) {
				test = query[property];
				if (Object.prototype.toString.call(test) === '[object RegExp]') {
					reject = !test.test(record[property]);
				} else if (test === true) {
				  reject = !!!record[property];
				} else {
					reject = record[property] !== test;
				}
				
				if (reject)
				  break ;
			}
			
			if (!reject)
				results.push(record);

		}
		return results;

  }
  
});

App.ApplicationSerializer = DS.JSONSerializer.extend({}) ;
App.AdapterType = 'localstorage' ;
