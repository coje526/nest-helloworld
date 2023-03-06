import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: ['*'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
 
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { room: string }): void {
    client.join(data.room);
    client.emit('joinedRoom', `You have joined room "${data.room}".`);
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, data: { room: string }): void {
    client.leave(data.room);
    client.emit('leftRoom', `You have left room "${data.room}".`);
  }
  @SubscribeMessage('broadcastToRoom')
  handleBroadcastToRoom(client: Socket, data: { room: string, message: string }): void {
    client.to(data.room).emit('messageToRoom', `Client ${client.id} says: ${data.message}`);
  }
}