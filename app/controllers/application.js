var moment;

App.ApplicationController = Ember.Controller.extend({
  init: function() {
    "use strict" ;
    App.timer = this.runClock() ;
  },
  
  runClock: function(){
    "use strict" ;
    var time = moment() ;
    App.set('clockTime',time) ;
    
    var controller = this ;
    Ember.run.later(function(){
      controller.runClock() ;
    },1000) ;
  }
  
}) ;