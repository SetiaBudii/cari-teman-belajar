# Colle-Community -- Deployment
### Prerequisites
**Node version 18.x.x ; Database: Mysql**
<br><br>
### Cloning the repository

```shell
git clone -b testdeployment https://github.com/SetiaBudii/cari-teman-belajar.git
```

### Setup .env file


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
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Push Prisma changes
RUN npx prisma db push

# Build the application
RUN npm run build

# Expose port
EXPOSE 9191

# Start the application
CMD ["npm", "start"]
```

### docker-compose.yml

```shell
version: '3'

services:
  caritemanbelajar:
    build:
      context: cariTemanBelajar
    ports:
      - "9191:9191"
    environment:
     -  DATABASE_URL=mysql://root:1@databasecariteman:3306/discord
    depends_on:
     - databasecariteman

  databasecariteman:
    container_name: databasecariteman
    image: mysql:latest
    ports:
      - "9192:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 1
      MYSQL_DATABASE: discord
```
