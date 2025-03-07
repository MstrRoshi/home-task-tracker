import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextResponse } from 'next/server';

// Define the socket.io server instance
let io: ServerIO | undefined;

// This is needed to handle the WebSocket upgrade
export async function GET(req: Request) {
  // Get the raw Node.js request and response objects
  const res = new NextResponse();
  const requestHeaders = new Headers(req.headers);
  const socketUrl = new URL(req.url);

  // Check if the socket server is already initialized
  if (!io) {
    // Create a new socket.io server
    const httpServer: NetServer = (res as any).socket?.server;
    
    if (!httpServer) {
      return NextResponse.json(
        { error: 'Failed to initialize socket server' },
        { status: 500 }
      );
    }

    io = new ServerIO(httpServer, {
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
  }

  return NextResponse.json({ success: true });
} 