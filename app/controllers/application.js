var moment;

App.ApplicationController = Ember.Controller.extend({

  needs: ['settings','parties','partiesWaiting','partiesCancelled', 'partiesSeated'],

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
    
    var self = this ;
    var settingsController = self.get('controllers.settings') ;
    App.Settings = settingsController.get('defaultSettings') ;
  
    return this.store.findAll('setting').then(function(settings){
      settings.forEach(function(setting){
        var name = setting.get('name') ;
        var value = setting.get('value') ;
        App.Settings[name] = value ;
      }) ;
      return App.Settings ;
    }).then(function(settings){
      return settingsController.updateSettings(settings) ;
    }) ;
  },  
  
  actions: {
    toTop: function() {
      "use strict";
      $("body").scrollTop(0) ;
    }
  },
  

  currentPathDidChange: function() {
    App.set('currentPath', this.get('currentPath'));
  }.observes('currentPath')
  
}) ;