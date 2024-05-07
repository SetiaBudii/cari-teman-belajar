# Colle-Community
Cari teman Belajar merupakan salah satu fitur yang ada pada platform Colle. Fitur ini ditujukan untuk pengguna untuk mencari teman belajar dan saling berinteraksi didalam komunitas pada platform Colle.

<b> Teknologi yang dipakai : </b><br><br>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white">

## Prasyarat
1. Sudah menginstall Node versi 18 keatas
2. Sudah menginstall Mysql
   
## Langkah install (Development)
### Clone Repository
1. Clone dan install Dashboard (Link: https://github.com/farizibnu/collaborative-learning.git )
2. Clone repository Cari Teman Belajar
```shell
git clone https://github.com/SetiaBudii/cari-teman-belajar.git
```
### Buat file .env pada folder root dari project
```js
DATABASE_URL="mysql://yourmysqlusername:password@localhost:3306/yourdatabasename" #Mengatur koneksi database
DASHBOARD_PORT = 9090 #Port fitur dashboard (Backend)
ALLOWED_ORIGIN="http://localhost:3000"  #Url Fitur dashboard (Frontend)
NEXT_PUBLIC_DASHBOARD_URL = "http://localhost:9090"  #Url Fitur dashboard (Backend)
UPLOADTHING_SECRET= ............  --> #Masukan Secret untuk Uploadthing
UPLOADTHING_APP_ID= ............. --> #Masukan Id untuk Uploadthing
#Note: untuk UPLOADTHING_SECRET dan UPLOADTHING_APP_ID bisa didapat melalui https://uploadthing.com
```
### Jalankan Fitur
1. Buka folder project melalui IDE (Disarankan menggunakan VSCode)
2. Buka terminal
3. Install paket-paket yang dibutuhkan menggunakan perintah:
```shell
npm i
```
4. Generate prisma
```shell
npx prisma generate
```
5. Push skema database dengan prisma
```shell
npx prisma db push
```
6. Buat akun melalui dashboard (Link penjelasan: https://github.com/farizibnu/collaborative-learning.git )
7. Buka halaman fitur Cari Teman Belajar ( Komunitas ) menggunakan url: http://localhost:9191
8. Selain langkah no 7, Fitur Cari Teman Belajar bisa dibuka melalui button "open" pada dashboard
   
