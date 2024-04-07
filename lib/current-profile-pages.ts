import { NextApiRequest } from "next";
// import { currentProfile } from "./current-profile";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
  // const profileid = await currentProfile();
  const cookies = req.headers.cookie; // Access cookies from headers
  const emailEncoded = cookies?.split('; ').find(row => row.startsWith('email='))?.split('=')[1]; // Extract email value from cookies
  const email = emailEncoded ? decodeURIComponent(emailEncoded.replace(/\+/g, ' ')) : null; // Decode and replace %40 with @

  if (!email) {
    return null;
  }
  
  const profile = await db.profile.findFirst({
    where: {
      email: email
    }
  });
  return profile;
}
