App.Setting.resetFixtures = function(){
  App.Setting.FIXTURES = [{
    "id":1,
    "name": "returnTime" ,
    "value": 5
  },{
    "id":2,
    "name": "notificationText" ,
    "value": "Your table is ready. This is an automated message. Please do not reply to it."
  },{
    "id":3,
    "name": "recallText" ,
    "value": "We're sorry, but we mistakenly notified you that your table is ready. It is not yet ready. This is an automated message. Please do not reply to it."
  }];
};
App.Setting.resetFixtures() ;