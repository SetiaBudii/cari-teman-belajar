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
![image](https://github.com/SetiaBudii/cari-teman-belajar/assets/95162227/cedfc8fe-2cfb-4c3d-8da2-c22c7a4c09fc)

![image](https://github.com/SetiaBudii/cari-teman-belajar/assets/95162227/78acfff6-403f-45e0-9335-f6dd821ac472)

## Struktur Project
```bash
C:.
├───app
│   ├───(invite)
│   │   └───(routes)
│   │       └───invite
│   │           └───[inviteCode]
│   ├───(main)
│   │   └───(routes)
│   │       ├───conversations
│   │       │   └───[memberId]
│   │       └───servers
│   │           └───[serverId]
│   │               ├───channels
│   │               │   └───[channelId]
│   │               └───conversations
│   │                   └───[memberId]
│   ├───(setup)
│   └───api
│       ├───channels
│       │   └───[channelId]
│       ├───direct-messages
│       ├───followers
│       │   └───[userId]
│       ├───following
│       │   └───[userId]
│       ├───livekit
│       ├───members
│       │   ├───findid
│       │   │   └───[profileId]
│       │   ├───totalDm
│       │   │   └───[profileId]
│       │   └───[memberId]
│       ├───messages
│       ├───profiles
│       │   ├───achievement
│       │   │   └───[name]
│       │   ├───findallserver
│       │   │   └───[profileId]
│       │   ├───findidbyemail
│       │   │   └───[email]
│       │   ├───leveling
│       │   │   └───[name]
│       │   └───[profileId]
│       ├───servers
│       │   ├───allserver
│       │   │   └───[keyword]
│       │   ├───findallserver
│       │   │   └───[keyword]
│       │   ├───findallservers
│       │   ├───findserver
│       │   │   └───[profileId]
│       │   ├───findtopicserver
│       │   │   └───[serverId]
│       │   ├───popular
│       │   │   └───[keyword]
│       │   └───[serverId]
│       │       ├───invite-code
│       │       └───leave
│       ├───status
│       └───uploadthing
├───components
│   ├───chat
│   ├───modals
│   ├───navigation
│   ├───providers
│   ├───server
│   └───ui
├───hooks
├───lib
├───pages
│   └───api
│       └───socket
│           ├───direct-messages
│           └───messages
├───prisma
│   └───migrations
│       └───20240304231028_init
└───public
```

Folder penting untuk pengembangan: 
- app/api : Menyimpan file-file API yang digunakan dalam project.
- app/components : Menyimpan file-file keperluan segi frontend
- app/hooks : Menyimpan file-file hook yang digunakan dalam project.
- app/lib : Menyimpan file-file library yang digunakan dalam project.
- app/prisma : Menyimpan file-file Prisma yang digunakan untuk menghubungkan project dengan database


## API Documentation
Link : https://documenter.getpostman.com/view/34515247/2sA3JNazqv


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


## Troubleshooting Guide
Bug pada saat pengguna pertama kali mengakses atau membuka fitur komunitas pengguna akan diminta untuk membuat komunitas.

![image](https://github.com/SetiaBudii/cari-teman-belajar/assets/99375480/32a1102e-22c3-4dd2-90f5-ad11bd860d24)

Solusi: Kembali ke dashboard dengan menggunakan url dashboard atau klik icon back pada browser. Setelah itu buka kembali fitur komunitas.
Bug achievement terkadang  tidak muncul pada gambar yang dilingkari merah berikut:

![image](https://github.com/SetiaBudii/cari-teman-belajar/assets/99375480/07e38845-75c0-43ef-ac70-509ee2b1c383)

Solusi: Agar achievement ini berjalan dengan lancar untuk sementara solusi yang tersedia adalah dengan memastikan bahwa setiap mahasiswa yang sudah pernah membuka fitur komunitas harus mengikuti minimal 1 komunitas maka bug ini bisa teratasi.


## Referensi tambahan
Discord Clone : https://github.com/AntonioErdeljac/next13-discord-clone

## Dokumentasi Teknis Project Colle
Link Dokumentasi Teknis : [Dokumentasi Teknis Colle](https://docs.google.com/document/d/1clwglUYdCa6ZWRkjjRdvLvvB21qm29-mBxFCpNwynfk/edit)

   
