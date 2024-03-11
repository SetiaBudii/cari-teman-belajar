// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function seed() {
    const profiles = [];
    const numProfiles = 100;

    // Create 100 profiles
    for (let i = 1; i <= numProfiles; i++) {
        const profile = await prisma.profile.create({
            data: {
                userId: `user${i}`,
                name: `User ${i}`,
                imageUrl: `user${i}.jpg`,
                email: `user${i}@example.com`,
                kampus: `Kampus ${i}`,
                jurusan: `Jurusan ${i}`,
                role: 'MAHASISWA',
            },
        });

        profiles.push(profile);
    }

    // Create random follows
    for (let i = 0; i < numProfiles; i++) {
        const followerIndex = i;
        let followingIndex;

        do {
            followingIndex = Math.floor(Math.random() * numProfiles);
        } while (followerIndex === followingIndex);

        await prisma.follow.create({
            data: {
                followerId: profiles[followerIndex].id,
                followingId: profiles[followingIndex].id,
            },
        });
    }
    console.log('Seeding completed');
}

seed()
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
