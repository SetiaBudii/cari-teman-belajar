import { db } from "@/lib/db";
import { getUserToken, initialProfile } from "@/lib/initial-profile";

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