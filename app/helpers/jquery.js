$.fn.highlightFade = function(callback){
  $(this).find('.party').addClass('highlight'); 
  $(this).fadeTo(300,0).animate({'height':0},200) ;
  Ember.run.later(function(){
    callback() ;
  },500) ;
} ;

$.apiCall = function(method, route, data, success, error) {
  var key = App.Settings.apiKey ;
  var secret = App.Settings.apiSecret ;
  route = route[0] === '/' ? route : '/' + route ;
  var url = App.REMOTE_HOST + "/api" + route ;
  data.date = Math.floor(new Date().getTime() / 1000).toString() ;
  var hash = CryptoJS.HmacSHA256(JSON.stringify(data), secret).toString() ;
  var params = {
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Basic " + window.btoa(key + ":" + hash)) ;
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

$.hideFooterForInputs = function() {

  var types = [
    'textarea', 
    'input[type=text]', 
    'input[type=email]',
    'input[type=number]',
    'input[type=date]',
    'input[type=datetime]',
    'input[type=datetime-local]',
    'input[type=password]',
    'input[type=month]',
    'input[type=search]',
    'input[type=tel]',
    'input[type=time]',
    'input[type=url]',
    'input[type=week]'
  ] ;
  var selector = types.join(',') ;
  var $inputs = $(selector) ;
  var $footer = $("#app_footer") ;


  $inputs.each(function(idx,obj){
    var $input = $(obj) ;
    if (!$input.hasClass('hideFooter-processed')) {
      $input.focus(function(){
        $footer.hide() ;
      }) ;
    
      $input.blur(function(){
        $footer.show() ;
      }) ;
      
      $input.addClass('hideFooter-processed') ;
    }
  }) ;
};