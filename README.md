# 作業八：實作 Websocket 功能
[實作功能]
於開發環境中使用 socket.io library 實作 Websocket 功能

[驗收方式]

使用 postman 測試 Websocket 連線
前端可與後端透過 websocket 連線
後端可推送資料至前端，讓前端接收並顯示推送的資料
需搭配 pm2 建立多個 instance 環境
透過 docker 部署驗收環境

---
WebSocket 是一種基於 TCP 協議的通信協議，它可以在客戶端和服務器之間建立一個持久化的連接，實現雙向通信。在建立 WebSocket 連接後，客戶端和服務器可以隨時互相傳送數據，並且不需要每次傳送數據時都重新建立連接。WebSocket 是一種純粹的協議，它只能夠實現數據的傳輸，而不能夠實現更高層次的功能，例如房間管理、事件發佈等等。

Socket.IO 是一個基於 WebSocket 的庫，它提供了許多 WebSocket 沒有的高級功能，例如房間管理、事件發佈等等。Socket.IO 支持多種瀏覽器和服務器端的實現方式，包括 Node.js、Python、Ruby、Java 等等。


---
1. `npm i --save @nestjs/websockets @nestjs/platform-socket.io`

2. `gateway.ts`:
```tsm
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

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
}
```
3. 新增 `gateway.module.ts`:
```tsm
import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';

@Module({
  providers: [MyGateway],
})
export class GatewayModule {}
```
4. `main.ts`:
```tsm
@Module({
  imports: [GatewayModule]
    })
    
```

* 使用postman
![](https://i.imgur.com/CFcdBpD.png)
![](https://i.imgur.com/3aFwiW6.png)
![](https://i.imgur.com/NyB4zyB.png)


---
新增room功能
1. `gateway.ts`新增:
```tsm
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
```
2. `main.ts`:
```tsm
const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
```
3. `redis.adapter.ts`:
```tsm
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: `redis://localhost:6379`, password: `password` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
```
![](https://i.imgur.com/k7vrSWp.png)
![](https://i.imgur.com/G8yWNBe.png)
![](https://i.imgur.com/YdUSuY7.png)

---

![](https://i.imgur.com/eMJ868Y.png)
https://github.com/redis/node-redis/issues/1841
更新redis版本

![](https://i.imgur.com/xcZIvi5.png)
119少寫password