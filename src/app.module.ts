import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entity/Fruit';
import { GatewayModule } from './gateway.module';
@Module({
  imports: [
    GatewayModule,
    TypeOrmModule.forFeature([
      Fruit,
    ]),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "db",
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
