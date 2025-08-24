export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });
  });
};
