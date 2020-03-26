# crawler-mercado-livre
Search products information inside mercado livre

## Tools
Node.JS, NPM 
```sh
$ sudo apt-get install nodejs npm 
```

#### Start
```sh
$ npm install
$ npm start
```

#### Using
You can make a post requisition using POSTMAN to this end-point:
```console
http://localhost:3000/crawler/list
```
On Requisiton body:
```console
{
    "search":"Palavra-chave",
    "limit":"5"
}
```

## Environment
crawler-mercado-livre uses dotenv for environment parameters.
Create a file named `.env`, like below:

```console
APP_NAME='Crawler'
NODE_ENV=development
PORT_EXPRESS = 3000
```