# Images app

### start
copy over ```.env.dist``` file to ```.env```
```
cp .env.dist .env
cp client/.env.dist client/.env
```
and
start service
```
docker-compose up -d
```
after that start front
```
cd client && PORT=3001 npm start
```
