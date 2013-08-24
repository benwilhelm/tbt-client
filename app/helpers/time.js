var moment;

Ember.Handlebars.registerBoundHelper('hourMinute',function(date){
  "use strict";
  return moment(date).format("h:mm");
}) ;