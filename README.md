# Colle-Community
Cari teman belajar merupakan salah satu fitur yang ada pada colle. Tujuan dibuatnya fitur ini adalah untuk memungkin kan user untuk menemukan teman dalam belajar. Selain itu dalam fitur ini dimungkinkan user untuk mengakses suatu komunitas dimana dalam komunitas tersebut bisa digunakan sebagai tempat untuk sharing mengenai pembelajaran. User yang spesifik yang terlibat dari fitur ini adalah semua role user (Mahasiswa, Dosen, dan Praktisi)  dapat mencari user lain dalam platform namun ada beberapa batasan dalam fitur komunitas dimana pada fitur ini hanya mahasiswa lah yang dapat mengakses fitur komunitas. 

Proyek ini melibatkan tim yang terdiri dari:
- Adinda Faayza Malika (System Analyst)
- Cintia Ningsih (Tester)
- Dhafin Rizqi Fadillah (Frontend Developer)
- M Dyfan Ramadhan (Frontend Developer)
- Raihan Fuad Syakir (Backend Developer)
- Raihan Shidqi Pangestu (System Analyst)
- Yayang Setia Budi (Backend Developer)



<b> Teknologi yang dipakai : </b><br><br>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white">

## Prasyarat
1. Sudah menginstall Node versi 18 keatas
2. Sudah menginstall Mysql

## Arsitektur Sistem


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
6.Jalankan fitur
```shell
npm run dev
```
7. Buat akun melalui dashboard (Link penjelasan: https://github.com/farizibnu/collaborative-learning.git )
8. Buka halaman fitur Cari Teman Belajar ( Komunitas ) menggunakan url: http://localhost:9191
9. Selain langkah no 8, Fitur Cari Teman Belajar bisa dibuka melalui button "open" pada dashboard
   
