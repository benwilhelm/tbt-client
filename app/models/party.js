var DS;

App.Party = DS.Model.extend({
  name: DS.attr('string') ,
  size: DS.attr('integer'),
  time_notified: DS.attr('string'),
  time_seated: DS.attr('string'),
  time_cancelled: DS.attr('string'),
  time_taken: DS.attr('string'),
  time_promised: DS.attr('string'),
  
  notified: function(){
    "use strict";
    return (this.get('time_notified') === false) ? false : true ;
  }.property('time_notified'),
  
  seated: function(){
    "use strict";
    console.log('called seated') ;
    return (this.get('time_seated') === false) ? false : true ;
  }.property('time_seated'),
  
  cancelled: function(){
    "use strict";
    return (this.get('time_cancelled') === false) ? false : true ;
  }.property('time_cancelled'),
  
  waiting: function(){
    "use strict";
    console.log('called waiting') ;
    var seated = this.get('seated') ;
    var cancelled = this.get('cancelled') ;
    return (seated || cancelled) ? false : true ;
  }.property('seated','cancelled')
}) ;