# 作業三：使用 pm2 啟動 Node.js cluster
[實作功能]
透過 pm2 來啟動開發環境 cluster

[驗收方式]

1. 使用 pm2 啟動 4 個 application process instances, 每個 cluster 分配 1G 的 RAM
2. 透過 pm2 設定不同環境下的 environment variable(development/staging/production)
3. 能產出 log



---
### 安裝方法
1.Install PM2 
    `  npm install pm2@latest -g`
    
---
### cluster 叢集模式
* pm2 自動偵測該機器的 CPU 數量，啟動最大能負荷的 process, 適用上面的選項, -i 後面接希望啟動 instance 的數量， 0 或 max 默認自動偵測 CPU 啟動最大值
`pm2 start app.js -i max`
* 針對第一點啟動4 個 application process instances
`pm2 start -i 4 --name server index.js，-i`
4 是指跑 4 個 process(進程) 的意思，成功跑起來的話應該會看到這個畫面
![](https://i.imgur.com/tzHDE5J.png)

---
### 設定環境變數 environment variable
1. `main.ts`:
```tsm
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(process.env.NODE_ENV),
  });
  setupSwagger(app);
  await app.listen(4000);
}
```
2. `ecosystem.config.js` :
```tsm
module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-err.log',
      out_file: './logs/app-out.log',
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'staging',
      }
    }]
  }
  ```
3. 新增一個檔案 `app.logger.ts` :
```tsm
import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor(
    context: string,
  ) {
    super(context);
    /***
     * @condition to check if it is in testing mode
     */
    if (context === 'production') {
      this.setLogLevels(['error', 'warn']);
    }else{
      this.setLogLevels(['debug', 'error', 'log', 'verbose', 'warn']);
    }
    console.log(context);
  }
}
```
![](https://i.imgur.com/iW54vir.png)


---
 ### 啟動可以附加的參數
* `--name`
    指定 app 一個名字
* `--watch`
    檔案有變更時，會自動重新啟動
* `--max-memory-restart`
    Memory 使用超過這個門檻時，會自動重啟
* `--log`
    指定 log 的位址, 若要指定新位址，需將原本的 process 刪掉，再重新啟動指定
* `--output`
    指定 output log 位址
* `--error`
    指定 error log 位址
* `--log-date-format`
    指定 log 的格式
* `--basic-auth-username --basic-auth-password`
    用於靜態檔, 讓該頁面需要帳號密碼方可存取

