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
    return !!this.get('time_notified') ;
  }.property('time_notified'),
  
  seated: function(){
    return !!this.get('time_seated') ;
  }.property('time_seated'),
  
  cancelled: function(){
    return !!this.get('time_cancelled') ;
  }.property('time_cancelled'),
  
  waiting: function(){
    var seated = this.get('seated') ;
    var cancelled = this.get('cancelled') ;
    return (seated || cancelled) ? false : true ;
  }.property('seated','cancelled'),
  
  overdue: function(){
    var notified = moment(this.get('time_notified')) ;
    var return_time = moment(App.preferences.return_time) ;
    var clock = moment(App.clockTime);
    
    var diff = clock.diff(notified) ;
    return diff >= return_time ;
  }.property('time_notified','App.clockTime'),
  
  countdown: function(){
    var notified = moment(this.get('time_notified')) ;
    var return_time = moment(App.preferences.return_time) ;
    var clock = moment(App.clockTime);
    
    var diff = clock.diff(notified) ;    
    return Math.abs(return_time.diff(diff)) ;
    
  }.property('time_notified','App.clockTime')
}) ;