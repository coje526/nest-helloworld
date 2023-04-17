import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entity/Fruit';
import { GatewayModule } from './gateway.module';
import { MqttServiceModule } from './mqtt.module';
import { MqttModule } from 'nest-mqtt';

@Module({
  imports: [
    GatewayModule,
    MqttServiceModule,
    MqttModule.forRoot({
      host: '61.220.168.17',
      username: 'smms',
      password: '2ojujiru',
      port: 1883,
      share:'group1',
      keepalive: 30000,
      reconnectPeriod: 0,
    }),
    TypeOrmModule.forFeature([
      Fruit,
    ]),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "123456",
      database: "testdb",
      synchronize: true,
      logging: false,
      entities: [Fruit],
      migrations: [],
      subscribers: [],
  }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://127.0.0.1:6379',
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
