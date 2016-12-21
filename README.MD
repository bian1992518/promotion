###CMY activity

install dependencies

```
npm install or cnpm install
```

entry

```
app.js
```
run app

```
node ./bin/www or npm run start
```

###environment config

1.test environment [http://localhost:3000/](http://localhost:3000/)

```
npm run test or node ./init/testConfig.js && webpack -w
```
2.development environment [http://localhost:3000/](http://localhost:3000/)

```
npm run dev or node ./init/devConfig.js && webpack -w
```
3.publish environment [http://localhost:3000/](http://localhost:3000/)

```
npm run build or webpack --config webpack.prod.config.js && node ./init/prodConfig.js && pm2 start ./bin/www --name 'cq'
```

###webpack config

1.development (webpack.config.js)

```
webpack
```
2.publish (webpack.prod.config.js)

```
webpack --config webpack.prod.config.js
```
###API config
1.test API (testConfig.js)

```
node ./init/testConfig.js
```

2.dev API (devConfig.js)

```
node ./init/devConfig.js
```
3.publish API (prodConfig.js)

```
node ./init/prodConfig.js
```




