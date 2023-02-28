import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entity/Fruit';


@Module({
  imports: [
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
