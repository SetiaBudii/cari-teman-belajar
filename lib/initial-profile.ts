import { db } from "@/lib/db";
import { Profile,ProfileRole } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

type Mahasiswa = {
  id_mhs: number;
  nama: string;
  username: string;
  email: string;
  password: string;
  tanggal_lahir: Date;
  location: string;
  about: string;
  kampus: string;
  jurusan: string;
  semester: number;
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
  console.log("url : ",url);
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
      Accept: 'application/json',
    },
  };
    const userData = (await axios.get<Mahasiswa>(url+"/mahasiswa",config)).data;
    const existingProfile = await db.profile.findFirst({
        where:{
          email : userData.email
      }
    })
    if (!existingProfile) {
      // Profile doesn't exist, create a dummy profile
      const dummyProfile = {
        userId: userData.id_mhs.toString(),
        name: userData.nama,
        imageUrl: userData.profileUrl,
        email: userData.email,
        kampus: userData.kampus,
        jurusan: userData.jurusan,
        role: ProfileRole.MAHASISWA, // Set your default role here
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    
      // Save the dummy profile to the database
      const createdProfile = await db.profile.create({
        data: dummyProfile
      });
    
      console.log("Dummy profile created:", createdProfile);
    } else {
      console.log("Profile already exists:", existingProfile);
    }  

      if (existingProfile) {
        return existingProfile;
      }
};
