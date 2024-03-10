import { db } from "@/lib/db";

export const initialProfile = async () => {
  //Using Cookie and use ProfileId, but for now we will use the hardcoded profileId
  const profileid = "ccb99845-cd58-4047-b947-0a5da3432ea7";
  const profile = await db.profile.findUnique({
    where: {
      id: profileid
    }
  });

  if (profile) {
    return profile;
  }
};
