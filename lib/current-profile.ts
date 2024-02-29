import { db } from "@/lib/db";
import { Profile } from "@prisma/client";
export const currentProfile = async () => {
  const email = 'teresnahati11@gmail.com';

  const profile = await db.profile.findFirst({
    where: {
      email:email
    }
  });
  return profile;
}


// =======================================================
// import { auth, useUser } from "@clerk/nextjs";
// import { db } from "@/lib/db";

// export const currentProfile = async () => {
//   const { userId } = auth();
//   if (!userId) {
//     return null;
//   }

//   const profile = await db.profile.findUnique({
//     where: {
//       userId
//     }
//   });
//   return profile;
// }