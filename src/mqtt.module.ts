import { Module } from '@nestjs/common';
import { MqttService } from './mqtt';
import { TestService } from './mqtt.publish';

@Module({
  providers: [MqttService, TestService],
})
export class MqttServiceModule {}