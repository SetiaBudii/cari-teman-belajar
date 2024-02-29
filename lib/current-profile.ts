import { db } from "@/lib/db";

export const currentProfile = async () => {
  const profileid = "bcc3ff96-9b11-4584-ac73-0c2be9e48a1d";

  const profile = await db.profile.findUnique({
    where: {
      id: profileid
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