import { db } from "@/lib/db";
import { Profile,ProfileRole } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

type users = {
  id_user: number;
  nama: string;
  username: string;
  email: string;
  password: string;
  tanggal_lahir: Date;
  location: string;
  about: string;
  token: string;
  profileUrl: string;
}
export function getUserToken(){
  const cookieStore = cookies();
  const token = cookieStore.get("user_token");
  
  if(!token){
    //hapus cookies email
    return redirect('http://localhost:3000/dashboard');
  }
  return token.value;
}

export const initialProfile = async () => {
  const user_token = getUserToken();
  const url = process.env.NEXT_PUBLIC_DASHBOARD_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
      Accept: 'application/json',
    },
  };
    const userData = (await axios.get<users>(url+"/user",config)).data;
    const existingProfile = await db.profile.findFirst({
        where:{
          email : userData.email
      }
    })
    if (!existingProfile) {
      // Profile doesn't exist, create a dummy profile
      const dummyProfile = {
        userId: userData.id_user.toString(),
        name: userData.username,
        imageUrl: userData.profileUrl,
        email: userData.email,
        role: ProfileRole.MAHASISWA, // Set your default role here
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    
      // Save the dummy profile to the database
      const createdProfile = await db.profile.create({
        data: dummyProfile
      });
    
    } else {
      if(existingProfile.name != userData.username){
        await db.profile.update({
          where: {
            id: existingProfile.id
          },
          data: {
            name: userData.username
          }
        });
      }
      console.log("Profile already exists");
    }  

      if (existingProfile) {
        return existingProfile;
      }
};
