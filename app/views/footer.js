App.Views.FooterView = Ember.View.extend({

  templateName: 'views/footer',

  actions: {
    clearLists: function(){
      var view = this ;
      var msg = "This will delete ALL parties from ALL lists. Continue?" ;
      if (window.confirm(msg)){
        this.get('controller.controllers.parties').send('deleteAll') ;
        if (App.get('currentPath').substr(0,7) === 'parties') {
          var a = App.get('currentPath').split('.') ;
          var slug = 'parties' + a[1].charAt(0).toUpperCase() + a[1].slice(1) ;
          var ctr = view.get('controller.controllers.' + slug) ;
          
          ctr.set('content',null) ;
        }
      }
    }
  }
}) ;