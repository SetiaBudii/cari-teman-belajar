import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { currentProfile } from "./current-profile";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  const profileid = await currentProfile();
  const profile = await db.profile.findUnique({
    where: {
      id: profileid?.id
    }
  });

  return profile;
}


// =======================================================
// import { NextApiRequest } from "next";
// import { getAuth } from "@clerk/nextjs/server";

// import { db } from "@/lib/db";

// export const currentProfilePages = async (req: NextApiRequest) => {
//   const { userId } = getAuth(req);

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