### 建立環境

1. 先到 [https://nodejs.org/en/](https://nodejs.org/en/) 下載LTS版
2. 在終端機中輸入 `node -v"`，以確認安裝是否成功並顯示Node.js版本。
![](https://i.imgur.com/O7VYDsX.jpg)
3. 安裝 Nest CLI：在終端機中輸入 `npm install -g @nestjs/cli`以安裝Nest CLI
4. 輸入後出現
![](https://i.imgur.com/VogEtl0.jpg)
5. 查詢後應該是資料夾的問題 （[https://gratch.tw/nodejs-npm-err-code-eacces/](https://gratch.tw/nodejs-npm-err-code-eacces/)）
6. 解決方法如下
    
    ```jsx
    sudo chown -R `whoami` ~/.npm
    sudo chown -R `whoami` /usr/local/lib/node_modules
    ```
    
7. 重複步驟三輸入 `npm install -g @nestjs/cli`以安裝Nest CLI
8. 裝完遇到以下
    ![](https://i.imgur.com/FrEM9xF.jpg)
9. 終端機步驟

```tsx
  147  sudo find / -name nest
  //找有nest檔名的
  148  sudo find /usr -name nest
  //找在usr裡檔名有nest的
  149  sudo find ~ -name nest
  //找/Users/jennyhsu檔名有nest的->下圖
  150  /Users/jennyhsu/jenny/node_modules/.bin/nest\n
  //再次確認
  151  ln -s /Users/jennyhsu/jenny/node_modules/.bin/nest /usr/local/bin/nest
  //建立新路徑(但沒有權限)
  152  sudo ln -s /Users/jennyhsu/jenny/node_modules/.bin/nest /usr/local/bin/nest
  //使用sudo來建立新路徑
  153  nest

```

- 149 步驟出現以下
![](https://i.imgur.com/7FounwF.jpg)


- 151、152步驟
![](https://i.imgur.com/Syq7XpW.jpg)


---

### 使用 4000 port 作為後端 server port

找到 main.ts (載入點)後 app.listen(3000改成4000)

以非同步的 `bootstrap` 函式做為載入函式，透過 `NestFactory.create(AppModule)` 產生一個 Nest App 的實例 (Instance)，並透過呼叫該實例的 `listen(PORT)` 將其架設起來。

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
```

---
### 實作 (get) helloworld API

在`src`中新增`main.ts`
```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
```
在`src`中新增`app.controller.ts`
```tsx
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
```
在`src`中新增`app.service.ts`
```tsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World~~~~~';
  }
}
```

在`src`中新增`app.module.ts`
```tsx
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
---
### 輸入上述 ngrok_url/helloworld 後顯示 hello world
1. 註冊ngrok後產生token
2. 終端機輸入`./ngrok authtoken <YOUR_AUTH_TOKEN>`
3. 終端機輸入`./ngrok http 4000`
4. `app.controller.ts`修改
```tsx
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get('helloworld')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getHello2(): string {
    return this.appService.getHello2();
  }

}
```
5. app.service.ts修改
```tsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World~~~~~';
  }
  getHello2(): string {
    return 'Hello World!!';
  }
}
```