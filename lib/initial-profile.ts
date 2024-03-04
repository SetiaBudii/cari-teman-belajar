import { db } from "@/lib/db";

export const initialProfile = async () => {
  const userId = "user1";

  const profile = await db.profile.findUnique({
    where: {
      userId: userId
    }
  });

  console.log(profile);
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: "aaa",
      name: "aaa",
      imageUrl: "aaa",
      email: "aaa"
    }
  });

  return newProfile;
};


// =====================================
// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

// import { db } from "@/lib/db";

// export const initialProfile = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return redirectToSignIn();
//   }

//   const profile = await db.profile.findUnique({
//     where: {
//       userId: user.id
//     }
//   });

//   if (profile) {
//     return profile;
//   }

//   const newProfile = await db.profile.create({
//     data: {
//       userId: user.id,
//       name: `${user.firstName} ${user.lastName}`,
//       imageUrl: user.imageUrl,
//       email: user.emailAddresses[0].emailAddress
//     }
//   });

//   return newProfile;
// };
