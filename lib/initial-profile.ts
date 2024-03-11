import { db } from "@/lib/db";

export const initialProfile = async () => {
  //Using Cookie and use ProfileId, but for now we will use the hardcoded profileId
  const profileid = "04e0ccd4-dcc7-465f-b24f-c126ba1e06db";
  const profile = await db.profile.findUnique({
    where: {
      id: profileid
    }
  });

  if (profile) {
    return profile;
  }
};
