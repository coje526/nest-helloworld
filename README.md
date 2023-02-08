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
1. 先新增一個`ecosystem.config.js`
```tsm
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```
2. run `pm2 start ecosystem.config.js --env production`

* 因為要設置 development/staging/production
* 所以新增3個檔案 
`ecosystem.development.config.js` 
`ecosystem.production.config.js`
`ecosystem.staging.config.js`
```tsm
module.exports = {
    apps : [{
      name   : 'app',
      script : 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      error_file: './logs/app-development-err.log',
      out_file: './logs/app-development-out.log',
      log: './logs/app-development.log',
      env_development: {
        NODE_ENV: 'development'
      },
    }]
  }
```
* 一開始檔案名稱少`.config`
![](https://i.imgur.com/TcUOhvg.png)
3. run `pm2 start ecosystem.development.config.js --env development`
![](https://i.imgur.com/msfvEfu.png)
![](https://i.imgur.com/QRgqBMd.png)
4. run `pm2 start ecosystem.staging.config.js --env staging`
![](https://i.imgur.com/rOwEwiA.png)
5. run `pm2 start ecosystem.production.config.js --env production`
![](https://i.imgur.com/OLOPwvE.png)



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

