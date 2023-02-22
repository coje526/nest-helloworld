# 作業六： 架設 Mariadb sql server

[實作功能]
於本機端透過 docker 架設 Mariadb SQL server

[驗收方式]

需透過 docker env 對 SQL server 設定連線用的帳號密碼
可透過 SQL client tool 與 SQL server 進行連線
透過 docker-compose 部署驗收環境


---
1. `docker-compose.yml` 新增：
```tsm
 db:
    image: "mariadb:10.5.3"
    ports:
      - "3306:3306"
    volumes:
      - ./db/data:/var/lib/mysql
      - ./db/initdb.d:/docker-entrypoint-initdb.d
     env_file:
      - sql.env"
```
2.  新增 `db/data` 及 `db/initdb.d/init.sql`
    ![](https://i.imgur.com/nVnCpQg.png)
3. `init.sql`:
```tsm
CREATE DATABASE IF NOT EXISTS testdb;

use testdb;

CREATE TABLE IF NOT EXISTS tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date DATE,
  due_date DATE,
  status TINYINT NOT NULL,
  priority TINYINT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;
```
4. `sql.env`:
```tsm
MYSQL_USER=test
MYSQL_PASSWORD=123456
MYSQL_DATABASE=testdb
MYSQL_ROOT_PASSWORD=123456
```
5. 執行`docker build -t app . && docker-compose up`
6. 使用 TablePlus 連線
7. ![](https://i.imgur.com/PqLngm5.png)

   ![](https://i.imgur.com/fQ4xrgD.png)
   
---
### 新增其他user

1. `test.sh`:
```tsm
#!/bin/bash
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "CREATE USER '$MYSQL_USERNAME'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, ALTER ON *.* TO '$MYSQL_USERNAME'@'%';"
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "FLUSH PRIVILEGES;"
```
2. `brew install mysql`
3. `sh test.sh`
:::success
* `CREATE USER 'nick'@'%' IDENTIFIED BY 'password';`
新增USER
* `SELECT user FROM mysql.user;`
所有user
* `GRANT ALL PRIVILEGES ON `testdb` . * TO 'nick'@'%';`
設定權限
* `DROP USER 'mike'@'%';`
刪除user
:::
![](https://i.imgur.com/buLLsp1.png)
