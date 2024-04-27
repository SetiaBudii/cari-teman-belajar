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
