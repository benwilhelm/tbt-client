var moment;

App.Party.FIXTURES = [{
  "id":1,
  "name": "Wilhelm" ,
  "size": 3,
  "time_notified": null,
  "time_seated": null,
  "time_cancelled": null,
  "time_taken": moment().subtract('minute',5),
  "time_promised": moment().add('minute',20)
},{
  "id":2,
  "name": "Gadda" ,
  "size": 4,
  "time_notified": null,
  "time_seated": null,
  "time_cancelled": null,
  "time_taken": moment().subtract('minute',8),
  "time_promised": moment().add('minute',17)
},{
  "id":3,
  "name": "Morken" ,
  "size": 2,
  "time_notified": null,
  "time_seated": null,
  "time_cancelled": moment().subtract('minute',10),
  "time_taken": moment().subtract('minute',8),
  "time_promised": moment().add('minute',17)
},{
  "id":4,
  "name": "Hug" ,
  "size": 2,
  "time_notified": null,
  "time_seated": null,
  "time_cancelled": null,
  "time_taken": moment().subtract('minute',8),
  "time_promised": moment().add('minute',17)
},{
  "id":5,
  "name": "Plevin" ,
  "size": 4,
  "time_notified": null,
  "time_seated": moment().subtract('minute',3),
  "time_cancelled": null,
  "time_taken": moment().subtract('minute',30),
  "time_promised": moment().subtract('minute',5)
}];