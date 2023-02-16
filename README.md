# 作業五：架設 Redis server
[實作功能]
於本機端透過 docker 架設 Redis server

[驗收方式]

於開發環境中實作可對 Redis server 進行 SET/GET/DELETE key 功能的 API
需對 Redis server 進行帳號密碼設定
透過 docker 部署驗收環境

---
1. 新增一個 `redis.conf`
到 https://redis.io/docs/management/config/ 下載相對應版本的
2.  `docker-compose` 新增redis
```tsm
 redis:
    image: redis
    volumes:
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    container_name: myredis
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - target: 6379
        published: 6379
        protocol: tcp
    environment: 
      - ENV=develop
```
3. `docker compose up`
![](https://i.imgur.com/umFCFle.png)
4. `redis.conf` 中設定帳號密碼
![](https://i.imgur.com/FR5snbg.png)
5. 輸入`AUTH username password` 登入成功
![](https://i.imgur.com/Ck1Lnpp.png)
7. `ACL SETUSER username on allkeys +set >password`
![](https://i.imgur.com/sUr8uYY.png)
9. redis 加入 health check
```tsm
 healthcheck:
      test: ["CMD", "redis-cli","ping"]
```



![](https://i.imgur.com/zWkxfyV.png)

---
###  SET/GET/DELETE key 功能的 API
1. `app.modules.ts`:
```tsm
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
```
2. `app.service.ts`:
```tsm
import { Injectable } from '@nestjs/common';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { StockedDto } from './dto/stocked.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setKey() {
    await this.redis.set('jenny', 'add key');
    return true;
  }

  async getKey() {
    const redisData = await this.redis.get("jenny");
    return { redisData };
  }

  async deleteKey() {
    await this.redis.del('key');
    return true;
  }
}
```
3. `app.conntroller.ts`:
```tsm
@ApiBasicAuth()
@ApiTags('stock')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('api/redis')
  async setKey() {
    return this.appService.setKey();
  }
  @Get('api/redis')
  async getKey() {
    return this.appService.getKey();
  }

  @Delete('api/redis')
  async deleteKey() {
    return this.appService.deleteKey();
  }
}
```
---
* 有遇到下面狀況 後來更新node版本就解決了
![](https://i.imgur.com/DPRTlt2.png)



