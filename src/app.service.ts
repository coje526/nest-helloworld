import { Injectable } from '@nestjs/common';
import { StockedDto } from './dto/stocked.dto';
import { FruitDto } from './dto/fruit.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Cluster } from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './entity/Fruit';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  private key = 'apple';
  private date = new Date();
  constructor(
    @InjectRedis() private readonly redis: Cluster,
    @InjectRepository(Fruit) private readonly userRepo: Repository<Fruit>
  ) {}

  async addFruit(data: FruitDto){
    const fruit = new Fruit();
    fruit.name = data.name;
    fruit.price = data.price;
    return await this.userRepo.save(fruit);
  }
  async getFruitsById(){
    const fruit = await this.userRepo
                      .createQueryBuilder()  
                      .delete()
                      .from(Fruit)
                      .where("id = :id", { id: 6 })
                      .execute()
    return fruit
  }
  async updateFruit(id, data: FruitDto){
    return await this.userRepo.update(id, data); 
  }

  async deleteFruit(id){
    return this.userRepo.delete(id); 
  }
  
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

  async getFruitCache() {
    let redisData = await this.redis.get('kiwi');
    if(redisData === null){
      const fruit = await this.userRepo
                  .createQueryBuilder()
                  .select('fruit_price')
                  .from(Fruit, 'fruit_price')
                  .where("fruit_price.name = :name", { name: 'kiwi' })
                  .getOne()  
      await this.redis.set('kiwi',  JSON.stringify(fruit), 'EX', 3, 'NX');
      console.log('cache missing');
      return fruit
    }
    redisData = await this.redis.set('kiwi', 1, 'EX', 3, 'NX');
    console.log('cache hit')
    return redisData
  }

  async updateFruitCache() {
    const fruit = await this.userRepo
                  .createQueryBuilder()  
                  .update(Fruit)
                  .set({ name: 'kiwi', price: 30})
                  .where('id = :id', { id: 4 })
                  .execute()
  }


  async deleteKey() {
    await this.redis.del(this.key);
    return true;
  } 
}

