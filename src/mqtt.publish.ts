import { Inject, Injectable } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class TestService {
  constructor(
    @Inject(MqttService) private readonly mqttService: MqttService,
  ) {}
  @WebSocketServer()
  server: Server;

  toggleLampColor(data: string): void {
    const params = {
      params: {
        stream: "DO",
        type: "bool",
        data: true
      }
    };
    for (let index = 0; index <= 3; index++) {
      if(data.charAt(index) === '1'){
        const topic = `SUNIX/26:00:01_EZG1300/9a:00:c5_EZR5002/SET/DO_INTERFACE/CH_0${index+1}`;
        this.mqttService.publish(topic, params);
      }
    }
  }

  getColor(data: number): string {
    const LampSwitch = {
      red: '1000',
      green: '0100',
      blue: '0010',
      yellow: '1100',
      redbuzz: '1001',
      default: '0000'
    };
    let lampColor = LampSwitch.default;
    if (data <= 4.0) {
      lampColor = LampSwitch.yellow;
    } else if (4.1 <= data && data <= 6.0) {
      lampColor = LampSwitch.green;
    } else if (6.1 <= data && data <= 9.0) {
      lampColor = LampSwitch.red;
    } else if (data >= 9.1) {
      lampColor = LampSwitch.redbuzz;
    }
    return lampColor;
  }
 
  @Subscribe({
    topic: 'SUNIX/26:00:01_EZG1300/97:00:fb_EZR5231/GET/AI_INTERFACE/CH_01',
    share: 'group2',
  })
  setRGB(@Payload() payload) {
    //this.server.emit('temperature', payload);
    const data = Math.round(parseFloat(payload.params.data) * 10) / 10;
    let lampColor = this.getColor(data);
    this.toggleLampColor(lampColor);
}

@Subscribe({
  topic: 'SUNIX/26:00:01_EZG1300/93:01:36_DPAD02HTP/GET/UART_INTERFACE/CH_01',
  share: 'group2',
})
getPV(@Payload() payload) {
  //this.server.emit('temperature', payload);
  console.log(payload);
  console.log(payload.params.data);
  return payload.params.data;
  
}
}