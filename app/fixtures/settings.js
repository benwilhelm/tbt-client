App.Setting.loadFixtures = function(){
  App.Setting.FIXTURES = [{
    "id":"1" + Date.now(),
    "name": "returnTime" ,
    "value": 5
  },{
    "id":"2" + Date.now(),
    "name": "notificationText" ,
    "value": "Your table is ready. Please do not reply; this is an automated message."
  },{
    "id":"3" + Date.now(),
    "name": "recallText" ,
    "value": "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. Please do not reply; this is an automated message."
  }];
  
};
