import { db } from "@/lib/db";
import { getUserToken, initialProfile } from "@/lib/initial-profile";
import { cookies } from "next/headers";


export const currentProfile = async () => {
  //cookies email
  const user = cookies().get("email");

  if (!user) {
    return null;
  }
  
  const profile = await db.profile.findFirst({
    where: {
      email: user.value,
    }
  });

  return profile;
}