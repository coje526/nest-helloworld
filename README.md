# 作業二：swagger API
[實作功能]
於開發環境中架設可用來說明 API 規格的說明文件

[驗收方式]
可於網頁上顯示 API 說明文件，內容須包含說明 header/body/param/response



---
### 2/7更新
要有上鎖圖示
在`app.controller.ts`加入
```tsm
@ApiBasicAuth()
```
在`main.ts`加入
```tsm
.addBasicAuth()
```
`main.ts`如下
```tsm
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('UserLogin')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, options);
}

bootstrap();
```
改成`.addApiKey(null, "token")`
![](https://i.imgur.com/0JltpWI.png)

---

* 中間有因為少call一個function 所以打了一個POST 兩個GET 出現永遠都只有兩個的狀況

*  把StockedDto放進list裡

![](https://i.imgur.com/epmSqRY.png)



在`app.controller.ts`加入`@ApiExtraModels(StockedDto)`及`$ref: getSchemaPath(StockedDto)`

要記得將`getSchemaPath` import
```tsm

list: {
          type: 'object',
          description:'可輸入入庫資料的工單清單',
          $ref: getSchemaPath(StockedDto),
        },
        
```
發現`description:'可輸入入庫資料的工單清單'`不見了
後來有找到方法 將`'object'`改成`'array'`

---
* 加入Enum
![](https://i.imgur.com/RiUHHwS.png)

建立一個 `type` 資料夾並建立一個 `priority.type.ts` 的檔案

`priority.type.ts`:
```tsm
export enum StockedPriority {
  UnProduction = 'UnProduction',
  InProduction = 'InProduction',
  Suspend = 'Suspend',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
  }
```
`stocked-detail.dto.ts` 加入
`import {  StockedRecordDto } from './stocked-record.dto';`  及 `enum: StockedPriority,`
```tsm
@ApiProperty({
        default: "0",
        enum: StockedPriority,
        description:`\n
        工單生產狀態:\n
        0 => 未開始(UnProduction)\n
        1 => 生產中(InProduction)\n
        2 => 暫停(Suspend)\n
        3 => 已完成(Completed)\n
        4 => 未完成(Incomplete)`,
      })
      productionStatus: string; StockedPriority;
```
* 將工單生產狀態改為下圖
![](https://i.imgur.com/k1fvs1p.png)
```tsm
       `<br>工單生產狀態:</br>
        <br>0 => 未開始(UnProduction)</br>
        <br>1 => 生產中(InProduction)</br>
        <br>2 => 暫停(Suspend)</br>
        <br>3 => 已完成(Completed)</br>
        <br>4 => 未完成(Incomplete)</br>`
```




---
* `product`裡再新增一個dto
![](https://i.imgur.com/0UENrEk.png)
新增一個 `stocked-detail-product.dto.ts` 至 `dto`

`stocked-detail-product.dto.ts` :
```tsm
import {  ApiProperty } from '@nestjs/swagger';

export class DetailProduct {
  
    @ApiProperty({
        example: 'WIRE38',
        description: '商品品號',
      })
      id: string;
    
      @ApiProperty({
        example: 0.5,
        description: '單位淨重',
      })
      weight: number;
    }
```
`stocked-detail.dto.ts`:
```tsm
@ApiProperty({
        description: '商品資料',
        allOf:[
            { $ref: getSchemaPath(DetailProduct) },
        ]
      })
```
