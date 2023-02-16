import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://localhost:6379',
          password: 'mypassword'
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {
}
