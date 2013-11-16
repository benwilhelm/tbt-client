var moment;

App.ApplicationController = Ember.Controller.extend({
  init: function() {
    this.startClock() ;
    this.loadSettings() ;
  },
  
  startClock: function(){
    App.timer = window.setInterval(function(){
      var time = moment() ;
      Ember.run(function(){
        App.set('clockTime',time) ;
      });
    }, 1000) ;
  },
  
  loadSettings: function() {
    return this.store.findAll('setting').then(function(settings){
      settings.forEach(function(setting){
        var name = setting.get('name') ;
        var value = setting.get('value') ;
        App.Settings[name] = value ;
      }) ;
      return App.Settings ;
    }) ;
  },  
  
  actions: {
    toTop: function() {
      "use strict";
      $("body").scrollTop(0) ;
    }
  }
  
}) ;