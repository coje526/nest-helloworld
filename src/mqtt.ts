import { Inject,Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Subscribe, Payload } from 'nest-mqtt';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class MqttService {

  @WebSocketServer()
  server: Server;

  @Subscribe({
    topic: 'SUNIX/99:00:41_EZG1300/97:01:24_EZR5231/GET/AI_INTERFACE/CH_02',
    share: 'group1',
  })
  test(@Payload() payload) {
    this.server.emit('temperature', payload);
    
  }

  @Subscribe({
    topic: 'SUNIX/99:00:41_EZG1300/97:01:24_EZR5231/GET/AI_INTERFACE/CH_01',
    share: 'group1',
  })
  test2(@Payload() payload) {
    this.server.emit('Humidity', payload);
  }

  

  @Subscribe({
    topic: 'SUNIX/26:00:01_EZG1300/97:00:fb_EZR5231/GET/AI_INTERFACE/CH_02',
    share: 'group1',
  })
  test4(@Payload() payload) {
    this.server.emit('Humidity', payload);
  }
  
  
}
