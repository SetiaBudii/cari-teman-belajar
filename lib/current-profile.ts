import { db } from "@/lib/db";
import {initialProfile } from "@/lib/initial-profile";

export const currentProfile = async () => {
  //cookies email
  const user = await initialProfile();
  // const user = cookies().get("email");

  if (!user) {
    return null;
  }
  
  const profile = await db.profile.findFirst({
    where: {
      email: user.email,
    }
  });

  return profile;
}