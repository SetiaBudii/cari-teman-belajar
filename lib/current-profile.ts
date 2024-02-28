import { db } from "@/lib/db";

export const currentProfile = async () => {
  const profileid = "5665c9b3-e74c-46f8-97cd-dc6a7a8009fc";

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