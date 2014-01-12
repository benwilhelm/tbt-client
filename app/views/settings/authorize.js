App.Views.SettingsAuthorizeView = Ember.View.extend({
  templateName: 'views/settings/authorize',
  actions: {
    authorizeAccount: function(){
      $(".account-info").removeClass('authorized unauthorized').addClass('authorizing') ;
      var controller = this.get('controller') ;
      var email = $("#accountEmail").val() ;
      var password = $("#accountPassword").val() ;
      return new Ember.RSVP.Promise(function(resolve,reject){
        controller.authorizeAccount(email, password).then(function(){
          $(".account-info").removeClass('authorizing').addClass('authorized') ;
          controller.set('accountAuthorized',true) ;
          controller.set('showPassword',false) ;
          resolve() ;
        },function(err){
          $(".account-info").removeClass('authorizing').addClass('unauthorized') ;
          console.log(err) ;
          reject(err);
        }) ;
      }) ;
    }            
  }              
});