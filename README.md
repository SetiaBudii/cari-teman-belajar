# Colle-Community -- Deployment
### Prerequisites
**Node version 18.x.x ; Database: Mysql**
<br><br>
### Cloning the repository

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
DATABASE_URL="mysql://yourmysqlusername:password@localhost:3306/yourdatabasename"
DASHBOARD_PORT = 9090 --> Port fitur dashboard (Backend)
ALLOWED_ORIGIN="http://localhost:3000" Fitur dashboard (Frontend)
NEXT_PUBLIC_DASHBOARD_URL = "http://localhost:9090" --> Fitur dashboard (Backend)
UPLOADTHING_SECRET= ............  --> Secret untuk Uploadthing
UPLOADTHING_APP_ID= ............. --> Id untuk Uploadthing
```

### Dockerfile

```shell
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 9191

# Start the application
CMD ["sh", "-c", "npx prisma db push && npm run build &&  npm start"]
```
