App.Setting = DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string'),
  
  save: function(){
    var self = this ;
    return this._super().then(function(){
      var idx = self.get('name') ;
      var val = self.get('value') ;
      App.Settings[idx] = val ;
    },function(){
      // failed saving
    }) ;    
  }
}) ;