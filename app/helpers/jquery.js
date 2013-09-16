$.fn.highlightFade = function(callback){
  "use strict" ;
  $(this).find('.party').addClass('highlight'); 
  $(this).fadeTo(300,0).animate({'height':0},200) ;
  Ember.run.later(function(){
    callback() ;
  },500) ;
} ;