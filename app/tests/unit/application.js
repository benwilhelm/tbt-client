module("Unit - Application") ;

asyncTest("Text of API Call helper", 5, function(){
  var spy = sinon.spy(jQuery,'ajax') ;
  var server = sinon.fakeServer.create() ;
  server.autoRespond = true ;
  server.respondWith("POST", App.REMOTE_HOST + "/api/notifications",
                     [200, { "Content-Type": "application/json" }, '{"status":"ok"}']);
  
  var time = moment() ;
  var ntfn = {
    to: '5005550006',
    message: 'testmessage',
    timeSent: moment().format(),
    timeTaken: moment().subtract('minute',10).format(),
    timePromised: moment().add('minute',5).format(),
    type: 'tableReady'
  };
  App.Settings.apiKey = '9a8cb2f78e2cbfff84ddaf13' ;
  App.Settings.apiSecret = '49597bf8bcf62aa6dc160c104bc95aca29b43ebcfed418b6' ;

  $.apiCall('POST','notifications',ntfn, function(data, status, jqxhr){
    var request = server.requests[0] ;
    var hdr = request.requestHeaders['Authorization'] ;
    credString = window.atob(hdr.replace('Basic ','')) ;
    var a = credString.split(':') ;
    var key = a[0] ;
    var hash = a[1] ;
    var sentData = parseQueryString(request.requestBody) ;
    var now = Math.floor(new Date().getTime() / 1000) ;
    
    ok(spy.calledOnce) ;
    equal(key, App.Settings.apiKey, 'cred identifier should be api key') ;
    equal(64, hash.length, 'cred password should be 64-character sha256 hash') ;
    equal(now, sentData.date, "Sent data should contain timestamp") ;
    equal(ntfn.to, sentData.to, "Send data should contain notification data") ;
    
    spy.restore() ;
    server.restore() ;
    start() ;
  }) ;
}) ;