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
    const LOCK_TIMEOUT = 10 ;
    let lock = "0" ;
    let lock_timeout = 0 ;
    const locke_key = 'lock.foo';
    while (lock != 'OK'){
      const now = Math.floor(Date.now() / 1000);
      lock_timeout = now + LOCK_TIMEOUT;
      lock = await this.redis.set(locke_key,lock_timeout, 'EX', 10, 'NX');
      console.log(lock);
      if (lock == 'OK' || (now > parseInt(await this.redis.get(locke_key)) && now > parseInt(await this.redis.getset(locke_key, lock_timeout)))){
        break ;
      }else{
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
    const redisData = await this.redis.get('treasure');
    const redisAdd = parseInt(redisData) +  1;
    await this.redis.set('treasure', redisAdd );
   
    return redisAdd;
  }

  async deleteKey() {
    await this.redis.del(this.key);
    return true;
  }
}

