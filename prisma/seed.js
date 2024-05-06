// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid');


const prisma = new PrismaClient();

async function seed() {
    const profiles = [];

    // create 6 users
    const profile1 = await prisma.profile.create({
        data: {
            userId: '1001',
            name: 'Budi',
            imageUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLC6kt_t_vy4QMlTDXz1Sfq1EUzPYjFHL6FvQwhAOU=s96-c',
            email: 'Budi@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    const profile2 = await prisma.profile.create({
        data: {
            userId: '1002',
            name: 'Alika',
            imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gg7g8J9w2Vl3K9q6L7Z5U6pBv7JF5g9QbX9KQY=s96-c',
            email: 'Alika@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    const profile3 = await prisma.profile.create({
        data: {
            userId: '1003',
            name: 'Fuad',
            imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gg7g8J9w2Vl3K9q6L7Z5U6pBv7JF5g9QbX9KQY=s96-c',
            email: 'Fuad@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    const profile4 = await prisma.profile.create({
        data: {
            userId: '1004',
            name: 'Dyfan',
            imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gg7g8J9w2Vl3K9q6L7Z5U6pBv7JF5g9QbX9KQY=s96-c',
            email: 'Dyfan@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    const profile5 = await prisma.profile.create({
        data: {
            userId: '1005',
            name: 'Dhafin',
            imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gg7g8J9w2Vl3K9q6L7Z5U6pBv7JF5g9QbX9KQY=s96-c',
            email: 'Dhafin@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    const profile6 = await prisma.profile.create({
        data: {
            userId: '1006',
            name: 'Ehan',
            imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gg7g8J9w2Vl3K9q6L7Z5U6pBv7JF5g9QbX9KQY=s96-c',
            email: 'Ehan@gmail.com',
            kampus: 'Polban',
            jurusan: 'Infomatika',
            role: 'MAHASISWA',
        },
    });

    profiles.push(profile1, profile2, profile3, profile4, profile5, profile6);
            
    //create 3 servers
    const server = [];
    const server1 = await prisma.server.create({
        data: {
          profileId: profile1.id,
          name: "Komunitas1",
          imageUrl: "https://uploadthing.com/f/e5e578ec-c090-448a-a9c6-1bbf5fb87e15-jlo1ag.png",
          description: "Komunitas 1",
          departement: "Teknik Informatika",
          location: "Bandung",
          inviteCode: uuidv4(),
          channels: {
            create: [
              { name: "general", profileId: profile1.id },
            ]
          },
          members: {
            create: [
              { profileId: profile1.id, role: "ADMIN" },
              { profileId: profile2.id, },
              { profileId: profile3.id, }
            ]
          }
        }
      });

      const server2 = await prisma.server.create({
        data: {
          profileId: profile2.id,
          name: "Komunitas2",
          imageUrl: "https://uploadthing.com/f/e5e578ec-c090-448a-a9c6-1bbf5fb87e15-jlo1ag.png",
          description: "Komunitas 2",
          departement: "Teknik Informatika",
          location: "Bandung",
          inviteCode: uuidv4(),
          channels: {
            create: [
              { name: "general", profileId: profile2.id },
            ]
          },
          members: {
            create: [
              { profileId: profile2.id, role: "ADMIN" },
              { profileId: profile3.id },
              { profileId: profile4.id }
            ]
          }
        }
      });

    //create Topics
      const topics = [];
        const topic1 = await prisma.serverTopic.create({
            data: {
            serverId: server1.id,
            name: "Javascript",
            }
        });

        const topic2 = await prisma.serverTopic.create({
            data: {
            serverId: server2.id,
            name: "Python",
            }
        });


    topics.push(topic1, topic2);
    server.push(server1, server2);

    console.log('Seeding completed');
}

seed()
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
