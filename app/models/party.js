var DS, moment;

App.Party = DS.Model.extend({
  name: DS.attr('string') ,
  size: DS.attr('integer'),
  phone_number: DS.attr('string') ,
  time_notified: DS.attr('string'),
  time_seated: DS.attr('string'),
  time_cancelled: DS.attr('string'),
  time_taken: DS.attr('string'),
  time_promised: DS.attr('string'),
  
  
  notified: function(){
    "use strict";
    return (this.get('time_notified') === null) ? false : true ;
  }.property('time_notified'),
  
  seated: function(){
    "use strict";
    return (this.get('time_seated') === null) ? false : true ;
  }.property('time_seated'),
  
  cancelled: function(){
    "use strict";
    return (this.get('time_cancelled') === null) ? false : true ;
  }.property('time_cancelled'),
  
  waiting: function(){
    "use strict";
    var seated = this.get('seated') ;
    var cancelled = this.get('cancelled') ;
    return (seated || cancelled) ? false : true ;
  }.property('seated','cancelled'),
  
  countdown: function(){
    "use strict" ;
    var notified = moment(this.get('time_notified')) ;
    var return_time = moment(App.preferences.return_time) ;
    var clock = moment(App.clockTime);
    
    var diff = clock.diff(notified) ;    
    return return_time.diff(diff) ;
    
  }.property('model.notified','App.clockTime')
}) ;