import { Injectable } from '@nestjs/common';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { StockedDto } from './dto/stocked.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AppService {
  private key = 'jenny';
  private date = new Date();
  constructor(@InjectRedis() private readonly redis: Redis) {}
  
  
  StockedDto(data: StockedDto) {
    return data;
  }

  getStocksList() {
      return;
  }

  async getStocks(dispatchId: string, token: string) {
    await this.redis.get('stocks');
    return true;
  }

  async createStockedRecord(obj: string) {
    await this.redis.set('stocks',obj);
    
    return true;
  }
  
  getHealthy() {
    return ;
  }
  async setKey() {
    await this.redis.set(this.key, 'add key', 'EX', 60);
    return true;
  }

  async getKey() {
    const redisData = await this.redis.get(this.key);
    return { redisData };
  }

  async treasure() {
    let lock = await this.redis.set('lock.foo', 1, 'EX', 10, 'NX');
    if (lock == 'OK'){
      const redisData = parseInt(await this.redis.get('treasure')) + 1;
      await this.redis.set('treasure', redisData );
      await this.redis.del('lock.foo'); 
      return redisData;
    } 
      return 'error';
  }

  async deleteKey() {
    await this.redis.del(this.key);
    return true;
  } 
}

