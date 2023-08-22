const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// New code snippet for emoji mappings
const emojiMappings = {
  react: "⚛️",
  woah: "😮",
  hey: "👋",
  lol: "😂",
  like: "🤍",
  congratulations: "🎉"
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (msg) => {
    // Replace words with emojis
    const replacedMsg = msg.replace(
      /\b(?:react|woah|hey|lol|like|congratulations)\b/gi,
      matched => emojiMappings[matched.toLowerCase()]
    );

    io.emit('chat message', replacedMsg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
