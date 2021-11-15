
## INSTALL PROJECT
git clone https://github.com/Lozyne/test-project.git

install node
https://nodejs.org/en/

for the project test we use postgres
https://www.pgadmin.org/

There is a config file for db in the project with these parameters:
```
{
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'tahina',
  database: 'projectTest',
  entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
}
```

install NestJs
```
npm i -g @nestjs/cli
```
## RUN PROJECT
```
npm start: dev
```
## SWAGGER
http://localhost:8000/api

