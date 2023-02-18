import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://redis:6379',
          password: 'password'
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {
}
