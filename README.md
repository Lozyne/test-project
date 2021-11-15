
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
There is a swagger, run application and go to this link
http://localhost:8000/api

## API
You can't test jwt authent with swagger
This is a short documentation:

get token (with body):
http://localhost:8000/auth/login
```
{"username": "A", "password": "test"}
```

get token (with body):
http://localhost:8000/auth/login
```
{"username": "A", "password": "test"}
```
get profile with generated token:
http://localhost:8000/auth/profile
don't forget the token: 
```
"Authorization: Bearer ${TOKEN}"
```


