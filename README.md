# Colle-Community
### Prerequisites
**Node version 18.x.x ; Database: Mysql**
<br><br>

## 1. Cloning the repository
### Cloning the repository-Dashboard

```shell
git clone https://github.com/farizibnu/collaborative-learning.git
```

### OR
### Cloning the repository on specific branch on Dashboard (Recommended)
```shell
git clone -b Budi https://github.com/farizibnu/collaborative-learning.git
```
### Cloning the repository-Cari Teman Belajar
```shell
git clone https://github.com/SetiaBudii/cari-teman-belajar.git
```

## 2. Setup database
### Create Database for Dashboard with name cole
### Import sql schemas for cole
### Create Database for Cari Teman Belajar with name ctb

## 3. Setup
### Install packages on directory cari teman belajar
```shell
npm i
```
### Install packages on directory frontend dashboard
```shell
npm i
```


### Setup .env file on cari teman belajar
```js
DATABASE_URL="mysql://yourmysqlusername:password@localhost:3306/ctb"
DASHBOARD_PORT = 9090 --> Port fitur dashboard (Backend)
ALLOWED_ORIGIN="http://localhost:3000" Fitur dashboard (Frontend)
NEXT_PUBLIC_DASHBOARD_URL = "http://localhost:9090" --> Fitur dashboard (Backend)
UPLOADTHING_SECRET= ............  --> Secret untuk Uploadthing
UPLOADTHING_APP_ID= ............. --> Id untuk Uploadthing
```

## Running Project
### Running backend dashboard
```shell
mvn spring-boot:run
```

### Running frontend dashboard
```shell
npm start
```

### Running cari teman belajar
```shell
npx prisma generate
npx prisma db push
```
```shell
npm run dev
```
