import { Injectable } from '@nestjs/common';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { StockedDto } from './dto/stocked.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  
  createStockedRecord(data: CreateStockedRecord) {
    return data;
  }
 
  StockedDto(data: StockedDto) {
    return data;
  }

  getStocksList() {
      return;
  }

  getStocks() {
    return ;
  }

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

