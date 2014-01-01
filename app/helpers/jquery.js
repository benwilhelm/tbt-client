$.fn.highlightFade = function(callback){
  $(this).find('.party').addClass('highlight'); 
  $(this).fadeTo(300,0).animate({'height':0},200) ;
  Ember.run.later(function(){
    callback() ;
  },500) ;
} ;

$.apiCall = function(method, route, data, success, error) {
  var u = App.Settings.accountEmail ;
  var p = App.Settings.accountPassword ;
  route = route[0] === '/' ? route : '/' + route ;
  var url = "https://tablebytext.com/api" + route ;
  var params = {
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Basic " + window.btoa(u + ":" + p)) ;
    },
    url: url,
    data: data,
    type: method,
    dataType: 'json',
    success: success,
    error: error
  } ;
  
  $.ajax(params) ;
} ;