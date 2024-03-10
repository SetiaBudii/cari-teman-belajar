import { db } from "@/lib/db";

export const initialProfile = async () => {
  //Using Cookie and use ProfileId, but for now we will use the hardcoded profileId
  const profileid = "003c1b5c-7e12-4e8e-9ae4-2d67679ba226";
  const profile = await db.profile.findUnique({
    where: {
      id: profileid
    }
  });

  if (profile) {
    return profile;
  }
};
