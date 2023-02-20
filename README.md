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
    let lock = await this.redis.set('lock.foo', 1, 'EX', 10, 'NX');
    if (lock == 'OK'){
      const redisData = parseInt(await this.redis.get('treasure')) + 1;
      await this.redis.set('treasure', redisData );
      await this.redis.del('lock.foo'); 
      return redisData;
    } 
      return 'error';
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
4. 使用`sh script/for_curl.sh`來連續打api
