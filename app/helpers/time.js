var moment;

Ember.Handlebars.registerBoundHelper('hourMinute',function(date){
  "use strict";
  return moment(date).format("h:mm");
}) ;

Ember.Handlebars.registerBoundHelper('clockDisplay',function(date){
  "use strict";
  var mom = moment(date) ;
  var sec = mom.format("s") ;
  var odd = (parseInt(sec,10) % 2) ;
  var format = odd ? "h:mm" : "h mm" ;
  return moment(date).format(format);
}) ;


Ember.Handlebars.registerBoundHelper('minuteSecond',function(date){
  "use strict";
  return moment(date).format("m:ss");
}) ;