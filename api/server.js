// import express from 'express';
// import { createServer } from 'node:http';
// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
const io = require('socket.io')(3000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});



// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on("message", (msg) => {
      io.emit("message", msg)
      console.log('message: ' + msg);
    })
    
  });

console.log("Hello")

// server.listen(3001, () => {
//   console.log('server running at http://localhost:3001');
// });