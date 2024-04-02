import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const profileCurrent = async (req: NextApiRequest) => {
  //cookies email
 // const profileid = await currentProfile();
 console.log("req : ",req.headers);

 const email = "aaaa";

 console.log("email : ",email);
 if (!email) {
   return null;
 }
 
 const profile = await db.profile.findFirst({
   where: {
     email: email
   }
 });
 
 console.log("profile : ",profile);
 return profile;
}