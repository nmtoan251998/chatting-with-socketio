const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

app.use(express.static(__dirname + '/public'));


let connectCounter = 0;

io.on('connection', (socket) => {
    connectCounter++;
    console.log(`A user has just connected, total ${connectCounter} connection!`);

    socket.on('chat message', msg => {          
        io.emit('chat message', msg);
    });

    socket.on('online users', data => {        
        io.emit('online user', connectCounter);
        console.log(connectCounter);
    })

    socket.on('disconnect', (data) => {        
        connectCounter--;       
        console.log(`A user has just disconnected, total ${connectCounter} connection left!`);
    });
});

http.listen(port, () => console.log(`Server is started on server ${port}`));