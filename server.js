const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

// Only use the custom server in development
// In production, Vercel will handle the serving of the Next.js app
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This function is used in development only
const startCustomServer = () => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.IO
  const io = new Server(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Handle task completion events
    socket.on('task:complete', (data) => {
      // Broadcast to all clients except the sender
      socket.broadcast.emit('task:complete', data);
    });

    // Handle new task events
    socket.on('task:add', (data) => {
      // Broadcast to all clients except the sender
      socket.broadcast.emit('task:add', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A client disconnected:', socket.id);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

// Start the app
app.prepare().then(() => {
  // In development, use the custom server with Socket.IO
  if (dev) {
    startCustomServer();
  } else {
    // In production on Vercel, we don't need to start a custom server
    // as Vercel handles that for us
    console.log('Running in production mode - custom server not started');
  }
}); 