var moment;

App.ApplicationController = Ember.Controller.extend({
  init: function() {
    "use strict" ;
    this.startClock() ;
  },
  
  startClock: function(){
    App.timer = window.setInterval(function(){
      var time = moment() ;
      Ember.run(function(){
        App.set('clockTime',time) ;
      });
    }, 1000) ;
  },
  
  actions: {
    toTop: function() {
      "use strict";
      $("body").scrollTop(0) ;
    }
  }
  
}) ;