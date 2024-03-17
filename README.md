# Colle-Community
### Prerequisites
**Node version 18.x.x ; Database: Mysql**
<br><br>
### Cloning the repository

```shell
git clone https://github.com/SetiaBudii/cari-teman-belajar.git
```

### Install packages

```shell
npm i
```
### Create Database on mysql/Xampp


### Setup .env file


```js
DATABASE_URL="mysql://yourmysqlusername:password@localhost:3306/yourdatabasename"
DASHBOARD_PORT = 8089
ALLOWED_ORIGIN="http://localhost:3000"
NEXT_PUBLIC_DASHBOARD_URL = "http://localhost:9090"
```

### Setup Prisma

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```
