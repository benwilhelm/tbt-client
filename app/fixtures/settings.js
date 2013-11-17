App.Setting.resetFixtures = function(){
  App.Setting.FIXTURES = [{
    "id":1,
    "name": "returnTime" ,
    "value": 5
  },{
    "id":2,
    "name": "notificationText" ,
    "value": "Your table is ready. Please do not reply; this is an automated message."
  },{
    "id":3,
    "name": "recallText" ,
    "value": "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. Please do not reply; this is an automated message."
  }];
};
App.Setting.resetFixtures() ;