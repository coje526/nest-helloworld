# Redis SET NX 建立互斥鎖
[描述]
透過 Redis SET NX 來建立互斥鎖，以避免資料的 race condition

[驗收方式]

於 Redis 中先建立 {"treasure": 100}。
寫一隻可用來改變 treasure 的 api (假設行為是 value += 1)
連續呼叫 api
treasure 在十秒內只能被改變一次

---
1. `app.service.ts`:
```tsm
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

```
2. `app.controller.ts`
```tsm
  @Get('api/treasure')
  async treasure() {
    return this.appService.treasure();
  }
```
3. 新增一個 `script` 資料夾加入 `for_crul.ts`
```tsm
for i in {1..5}; do
  curl 'http://localhost:3000/api/treasure'
done
```
使用`sh script/for_curl.sh`來連續打api
![](https://i.imgur.com/oNvWUgH.png)

![](https://i.imgur.com/LJSjFPm.png)

![](https://i.imgur.com/UpGkgfs.png)