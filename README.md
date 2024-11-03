# RentHouseBK

#### Database

Diagram: https://drawsql.app/teams/renthousebk/diagrams/renthousebk

Provider: Aiven

Project ID: duong-9e8d

Service ID: mysql-renthousebk

Host: mysql-renthousebk-duong-9e8d.j.aivencloud.com

Port: 27240

Credentials user: duong204736

###### Migrate

```
# Run command at ~/server/src/
npx database:migrate
```
###### Delete all records of a table
```Truncate table renthousebk_db2.Users;```