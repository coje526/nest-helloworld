# 作業七：使用 TypeORM 操作 SQL server
[實作功能]
於開發環境中使用 TypeORM 對 Mariadb SQL server 進行操作

[驗收方式]

可用 TypeORM 對 Mariadb SQL server 進行連線 
使用 TypeORM 建立 SQL 資料表(table name: fruit_price, column: id, name, price)
於開發環境中實作可對 fruit_price 資料表進行 insert/update/delete 的 API
透過 docker-compose 部署驗收環境

---

1. `npm install --save @nestjs/typeorm typeorm mysql2`
2. `app.module.ts`
```tsm
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entity/Fruit';


@Module({
  imports: [
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
 ]})
```
3. `Fruit.ts`
```tsm
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('fruit_price') // 指定table name
export class Fruit {
    // 每新增一筆的時候id+1
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    @Column()
    price: number;
}

```
![](https://i.imgur.com/K8Qvg7U.png)
4. `fruit.dto.ts`
```tsm
import {  ApiProperty } from '@nestjs/swagger';

export class FruitDto {
  
      @ApiProperty({
        description: 'fruit_name',
      })
      name: string;
    
      @ApiProperty({
        description: 'fruit_price',
      })
      price: number;
  
}
```

5. `app.service.ts`
```tsm
@Injectable()
export class AppService {
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
    async updateFruit(id, data: FruitDto){
    return await this.userRepo.update(id, data); 
  }

  async deleteFruit(id){
    return this.userRepo.delete(id); 
  }
}

```
6. `app.controller.ts`
```tsm
 @Post('api/fruit')
  create(@Body() fruitDTO: FruitDto){
    return this.appService.addFruit(fruitDTO); //呼叫appService對資料庫新增資料
  }
  
  @Put('api/fruit/:fruitId')
  @ApiParam({
    name: 'fruitId',
    type: 'number',
    description: 'fruit index',
    required: true,
  })
  updateUserById(@Param('fruitId') id, @Body() fruitDTO: FruitDto){
    return this.appService.updateFruit(id, fruitDTO);
  }

  @Delete('api/fruit/:fruitId')
  @ApiParam({
    name: 'fruitId',
    type: 'number',
    description: 'fruit index',
    required: true,
  })
  delete(@Param('fruitId') id){
    return this.appService.deleteFruit(id);
  }
  
```
---
#### 實際操作
1. POST `name:'lemon'` `price:500`
![](https://i.imgur.com/gjmMQKV.png)
![](https://i.imgur.com/Fxjdy2c.png)
2.  PUT `id:3` `name:'lemon'` `price:50`
![](https://i.imgur.com/GTPrauG.png)
![](https://i.imgur.com/2hBZLjr.png)
3. delete `id:3`
![](https://i.imgur.com/Xup1y6j.png)
![](https://i.imgur.com/WXcP40P.png)

---
#### createQueryBuilder
1. SelectQueryBuilder
```tsm
  async getFruitsById(){
    const fruit = await this.userRepo
                      .createQueryBuilder()
                      .select("fruit")
                      .from(Fruit, "fruit")
                      .where("fruit.id = :id", { id: 4 })
                      .getOne()
    return fruit
  }
```
![](https://i.imgur.com/3ZhSWSX.png)
2. InsertQueryBuilder
```tsm
 async getFruitsById(){
    const fruit = await this.userRepo
                      .createQueryBuilder()
                      .insert()
                      .into(Fruit)
                      .values([
                          { name: "papaya", price: 30 },
                          { name: "orange", price: 50 },
                      ])
                      .execute()
    return fruit
  }
```
![](https://i.imgur.com/GTQCZte.png)
3. UpdateQueryBuilder
```tsm
  async getFruitsById(){
    const fruit = await this.userRepo
                      .createQueryBuilder()  
                      .update(Fruit)
                      .set({ name: "mango", price: 300})
                      .where("id = :id", { id: 6 })
                      .execute()
    return fruit
  }
```
![](https://i.imgur.com/RFJ1Bq2.png)
4. DeleteQueryBuilder
```tsm
  async getFruitsById(){
    const fruit = await this.userRepo
                      .createQueryBuilder()  
                      .delete()
                      .from(Fruit)
                      .where("id = :id", { id: 5 })
                      .execute()
    return fruit
  }
```
![](https://i.imgur.com/OrMdBhP.png)

---
在執行`typeorm init --database mariadb`遇到
所以把`@nestjs-modules/ioredis`換成`@liaoliaots/nestjs-redis`
![](https://i.imgur.com/oZV8B8s.png)

