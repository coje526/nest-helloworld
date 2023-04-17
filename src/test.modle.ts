import { Module } from '@nestjs/common';
import { TestService } from './mqtt.publish';

@Module({
  providers: [TestService],
})
export class TestServiceModule {}