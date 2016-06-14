var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var question,name;

app.get('/', function(req, res){
	res.sendfile('index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
var questionArr =[];
var qid = 0;
var uploadArr;

io.on('connection', function(socket){
	socket.on('username', function(msg){
		name=msg;		
	});
	socket.on('question message', function(msg){
		question=msg;
		questionArr.push({
	        N:name,
	        Q:question,
	        ID:qid,
	        vote:0
    	});		
    	io.emit('send',questionArr);
    	qid++;
		});
	 socket.on('vote', function(msg){
	 	questionArr[msg.ID].vote++;
	 	questionArr.sort();
	 	io.emit('send',questionArr);			
	});
	 io.emit('send',questionArr);
	
});
questionArr.sort(function(a, b){
 return a.vote-b.vote;
})