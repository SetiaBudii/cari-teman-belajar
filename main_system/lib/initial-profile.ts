import { db } from "@/lib/db";
import { Profile,ProfileRole } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { cookies } from 'next/headers'
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
    return ""
  }
  return token.value;
}

export const initialProfile = async () => {
  const user_token = getUserToken();
  //Using Cookie and use ProfileId, but for now we will use the hardcoded profileId
  const profileid = "04e0ccd4-dcc7-465f-b24f-c126ba1e06db";
  console.log("token : ",user_token);
  const url = process.env.NEXT_PUBLIC_DASHBOARD_URL;
  console.log("url : ",url);
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
      Accept: 'application/json',
    },
  };
  // Check if the profile exists
  const userData = (await axios.get<Mahasiswa>(url+"/mahasiswa",config)).data;
  console.log("user data : ",userData);
  const existingProfile = await db.profile.findFirst({
      where:{
        userId : userData.id_mhs.toString()
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
