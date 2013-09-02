Ember.Handlebars.registerBoundHelper('formatPhone',function(digits){
  "use strict";
  
  var d = digits.split('') ;
  if (d.length===11 && d[0] === "1") {
    d.shift() ;
  }
  
  var a = d.slice(0,3) ;
  var b = d.slice(3,6) ;
  var c = d.slice(6) ;
  
  var area_code = a.join('') ;
  var exchange = b.join('') ;
  var remainder = c.join('') ;
  
  return "(" + area_code + ") " + exchange + "-" + remainder ;
  
}) ;