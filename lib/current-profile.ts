import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export const currentProfile = async () => {
  const user = await initialProfile();

  if (!user) {
    return null;
  }

  const profile = await db.profile.findFirst({
    where: {
      email: user.email
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