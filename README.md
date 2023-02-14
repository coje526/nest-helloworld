# 作業四 ： 透過 docker 部署開發環境
[實作功能]
於本機安裝 docker 與 docker-compose，並將開發環境透過 docker 部署

[驗收方式]
撰寫 dockerfile
使用 docker-compose 啟動開發環境


## 為什麼要使用Docker?
由於Docker的虛擬化，是不需要虛擬化硬件及完整的操作系統。因此在資源利用方面會更有效率。不論在讀寫速度，運算速度及記憶體效率，都會比傳統的部署方式更優異，服務啟動的速度亦會更快捷。
Docker的容器配置到不同的環境時，可以保持著運行環境的一致性。減少環境因素引致的運行出錯的問題。
而很多不同的團隊亦提供了很多不同的Docker映像檔，方便用戶在原有的服務上，按需要建構自己的Docker映像檔，大大降低了開發成本。


### Docker
* 應用程式
* 一種容器化技術
### dockerfile
* 用來描述 image，產生客製化的 image
* Dockerfile 是一個設定檔，專門管理單一 Container
### docker-compose
* 用來描述 container，也就是管理一個以上的 container
* 它的基本指令很簡單，其原理是撰寫 docker-compose.yml 來設定你的 services 該指向哪些 image、Port 對應、該走哪些任務
---
## 撰寫 dockerfile
1. `vim Docker file`
2. #### Base image
    `FROM node:latest`
    #### Create app directory
    `WORKDIR /usr/src/app`

    #### Install app dependencies
    `COPY package.json /usr/src/app/`
    `RUN npm install`

    #### Bundle app source
    `COPY . /usr/src/app`

    #### Declaring PROT in containers
    `EXPOSE 8080`
    `CMD [ "npm", "start" ]`
:::info
FROM : 使用的 image 名稱。
WORKDIR : container 運行的資料夾位置。
COPY : 要複製的位置 container運行的資料夾位置
其中 COPY . /usr/src/app，意思是將當前位置所有的東西複製到 /usr/src/app 位置
:::
:::success
-d ： 在後台執行
-p ： 對應的port 
--name： container 名稱
--rm：容器停止後，自動刪除(測試用)
-t : 開啟終端機
-i : 可以輸入
:::
3. `docker build -t 專案名稱 .`
![](https://i.imgur.com/VtkBSML.png)
4. `docker images`
![](https://i.imgur.com/N2pxG73.png)
### 啟動 image
最後就可以執行 image 囉！其中 -d 的功用就是能夠背景執行並吐出一串 container ID，並且將內部監聽的 8080 PORT 是放到我們本機端的 3000 PORT，意思是在 Docker 容器中是跑 8080 原本程式所設定的，然而我們外部本機端用 3000 PORT 來監聽內部容器內容。

5. `docker run -p 3000:8080 -d  專案名稱`

* 如果想看 log 可以拿剛取得的 container ID 來查看 log (記住有s)。
 `docker logs <container ID>`

* 若忘記 container ID 的話可以使用下列指令查詢目前所有專案的 container ID，此指令是查詢執行中的 container。
`docker ps`
## 使用 docker-compose 啟動開發環境
1. 新增一個`docker-compose.yml`
```tsm
version: '3.6'
services:
  docker-nodejs-tutorial:
    image: docker-nodejs-tutorial
    build: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:8080
    volumes:
      - .:/usr/src/app
```
:::info

**version** : 為 docker-compose API 的版本。
**services** : 提供了哪些服務。
**app** : service-name 為一個 container ， 裡面為此 container 的配置資訊。
**image** : 要使用的 image 名稱。我們目前只有一個 image 在後面寫上此 image 的標籤名稱以利於辨認
**ports** : 為 -p 的配置。PORT:PORT 前者 3000 為映射出來我們電腦實際跑的 PORT 後者 8080 代表 docker container 服務裡面所執行的 PORT
**volumes** : 為 -v 的配置。會判斷你的專案是否有變動修改若有系統會自動幫你重建image 而不需手動 docker build
**container_name**: 為 --name的配置。
**restart**: --restart= 的配置。
:::


2. ` docker-compose up`
![](https://i.imgur.com/3IAU0c8.png)

3. 多新增一個container
```tsm
version: '3.6'
services:
  docker-swagger:
    image: docker-swagger
    build: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
    volumes:
      - .:/usr/src/app
  docker-swagger-2:
    image: docker-swagger
    build: .
    environment:
      NODE_ENV: production
    ports:
      - 8000:3000
    volumes:
      - .:/usr/src/app
```
![](https://i.imgur.com/WJVnOHl.png)

---
* 有遇到下面狀況
![](https://i.imgur.com/99IWigI.png)
1. 先`docker-compose down -v`再`docker-compose up`就可以了
![](https://i.imgur.com/r9nJ5Pb.png)

---
### 新增health check
1. 在 `docker-compose.yml` 新增
```tsm
 healthcheck:
      test: curl -fs http://localhost:3000/ || exit 1
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 30s
```
:::info
interval: Health check 時間間隔
timeout: 當 Health check 超過此設定的時間，則會視為失敗
retries: 當 Health check 連續失敗次數超過此設定時，則會將狀態更改為 unhealthy
start_period: 啟動時間
:::

* docker exec 則是使用正在運行中的容器 (running container) 來執行指令，因此透過指定的 container name 來呼叫特定的 container。

---
### 加入pm2
1. `npm run build`
2. `docker build -t app .`
![](https://i.imgur.com/0OXUYoG.png)

3. `docker-compose up`
![](https://i.imgur.com/wNNASGe.png)

4. `docker ps`
![](https://i.imgur.com/0V4PIW0.png)

5. `docker exec 5503cb6dff41 pm2 ls`
![](https://i.imgur.com/1F66coN.png)



:::success
* `docker exec -it <container-id> pm2 monit`
Monitoring CPU/Usage of each process
*  `docker exec -it <container-id> pm2 list`	
Listing managed processes
*  `docker exec -it <container-id> pm2 show`	
Get more information about a process
*  `docker exec -it <container-id> pm2 reload all`
0sec downtime reload all applications 
:::
