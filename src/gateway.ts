import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cluster } from 'ioredis';
import { Server, Socket} from 'socket.io';

@WebSocketGateway({ cors: true, transports: ['websocket']})
@Injectable()
export class MyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    @InjectRedis() private readonly redis: Cluster,
  ) {}
  @WebSocketServer()
  server: Server;

  //when server runs
  afterInit() {
    console.log('Websocket Server Started');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    console.log(client.handshake.query.name);
    console.log(`Client ${client.handshake.query.name} connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, payload: { room: string, name: string}): Promise<void> {
    client.join(payload.room);
    const online = this.server.in(payload.room).fetchSockets();
    const numOfUser: Promise<number> =
      online.then((sockets) => {
        const count = sockets.length;
        client.emit('onlineUsersCount', count);
        console.log('onlineUsersCount:'+ count);
        return count;
      });
  
    const emitData = {
      type: `welcome`,
      message: `Client ${payload.name} have joined room "${payload.room}".`,
      numOfUser: await numOfUser,
      clientid: client.id,
      name: payload.name,
      room: payload.room
    }
    client.to(payload.room).emit('msgToClient', emitData);
    console.log(payload.name + ' have joined room ' + payload.room);
  }
​
  @SubscribeMessage('msgToServer')
  public async handleMessage(client: Socket, payload: any) {
    const emitData = {
      type: `message`,
      message: `Client ${payload.name} says: ${payload.message}.`,
      clientid: client.id,
      name: payload.name,
    }
    console.debug(`receive massage from client : ${JSON.stringify(payload)}`);
    client.to(payload.room).emit('msgToClient', emitData);
  }

  //@SubscribeMessage('getOnlineUsers')
  //handleGetOnlineUsers(client: Socket, data: { room: string, name: string}): void {
   // const online = this.server.in(data.room).fetchSockets();
    //online.then((sockets) => {
     // const count = sockets.length;
     // client.emit('onlineUsersCount', count);
     // console.log('onlineUsersCount:'+ count);
  // });
 // }

 // @SubscribeMessage('broadcastToRoom')
 // handleBroadcastToRoom(client: Socket, data: { room: string, name: string, message: string }): void {
 //   client.to(data.room).emit('messageToRoom', `Client  ${data.name} says: ${data.message}`);
 //   console.log(data.name + ' broadcastToRoom: ' + data.message);
 //  }
  
 // @SubscribeMessage('broadcastToUser')
 // async handlemessageoUser(client: Socket, data: { name: string, message: string ,toUserName: string}): Promise<void> {
 //   client.join(data.toUserName);
 //   const emitData = {
 //     message: `Client ${data.name} says: "${data.message}".`,
 //     clientid: client.id,
 //     name: data.name,
 //     toUserName: data.toUserName
 //   }
 //   client.to(toUserNameId).emit('messageToUser', emitData);
 //   console.log(data.name +' say: '+ data.message + ' to ' + data.toUserName);
 //   console.log(toUserNameId);
 // }
  
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, data: { name: string, room: string }): Promise<void> {
    client.leave(data.room);
    client.emit('msgToClient', `You have left room "${data.room}".`);
    const online = this.server.in(data.room).fetchSockets();
    const numOfUser: Promise<number> =
      online.then((sockets) => {
        const count = sockets.length;
        client.emit('onlineUsersCount', count);
        console.log('onlineUsersCount:'+ count);
        return count;
      });
      const emitData = {
        type:`left`,
        message: `Client ${data.name} have left room "${data.room}".`,
        numOfUser: await numOfUser,
        clientid: client.id,
        name: data.name,
        room: data.room
      }
      client.to(data.room).emit('msgToClient', emitData);
      console.log(data.name +' have left room');

  }

  getServer(): Server {
    return this.server;
  }
 
}