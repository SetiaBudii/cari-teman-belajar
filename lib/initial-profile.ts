import { db } from "@/lib/db";

export const initialProfile = async () => {
  //Using Cookie and use ProfileId, but for now we will use the hardcoded profileId
  const profileid = "00bae4e4-1c50-4c31-ba3d-f91be50a615c";
  const profile = await db.profile.findUnique({
    where: {
      id: profileid
    }
  });

  if (profile) {
    return profile;
  }
};
