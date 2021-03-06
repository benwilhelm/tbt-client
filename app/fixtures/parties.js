App.Party.loadFixtures = function(){
  App.Party.FIXTURES = [{
    "name": "Wilhelm" ,
    "size": 3,
    "phone_number": "8476449168",
    "time_notified": null,
    "time_seated": null,
    "time_cancelled": null,
    "time_taken": moment().subtract('minute',25).format('YYYY-MM-DDTHH:mm:ss'),
    "time_promised": moment().add('minute',5).format('YYYY-MM-DDTHH:mm:ss')
  },{
    "name": "Gadda" ,
    "size": 4,
    "phone_number": "7737267272",
    "time_notified": null,
    "time_seated": null,
    "time_cancelled": null,
    "time_taken": moment().subtract('minute',15).format('YYYY-MM-DDTHH:mm:ss'),
    "time_promised": moment().add('minute',17).format('YYYY-MM-DDTHH:mm:ss')
  },{
    "name": "Morken" ,
    "size": 2,
    "phone_number": "3125551212",
    "time_notified": null,
    "time_seated": null,
    "time_cancelled": null,
    "time_taken": moment().subtract('minute',15).format('YYYY-MM-DDTHH:mm:ss'),
    "time_promised": moment().add('minute',17).format('YYYY-MM-DDTHH:mm:ss')
  },{
    "name": "Hug" ,
    "size": 2,
    "phone_number": "2165095709",
    "time_notified": null,
    "time_seated": null,
    "time_cancelled": moment().subtract('minute',9).format('YYYY-MM-DDTHH:mm:ss'),
    "time_taken": moment().subtract('minute',12).format('YYYY-MM-DDTHH:mm:ss'),
    "time_promised": moment().add('minute',13).format('YYYY-MM-DDTHH:mm:ss')
  },{
    "name": "Plevin" ,
    "size": 4,
    "phone_number": "8479248096",
    "time_notified": null,
    "time_seated": moment().subtract('minute',3),
    "time_cancelled": null,
    "time_taken": moment().subtract('minute',30).format('YYYY-MM-DDTHH:mm:ss'),
    "time_promised": moment().subtract('minute',5).format('YYYY-MM-DDTHH:mm:ss')
  }];
};