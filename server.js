const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', (socket) => {
    console.log('A user has just recently connected !');

    socket.on('disconnect', () => console.log('A user has just recently disconnected !'))
});

http.listen(port, () => console.log(`Server is started on server ${port}`));