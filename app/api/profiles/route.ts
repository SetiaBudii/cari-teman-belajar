import { NextResponse } from "next/server";
import { db } from "@/lib/db";

//Create a new profile
export async function POST(req: Request) {
  try {
    const newprofile = await req.json();

    const profile = await db.profile.create({
        data: {
            userId: newprofile.userId,
            name: newprofile.name,
            imageUrl: newprofile.imageUrl,
            email: newprofile.email,
            kampus: newprofile.kampus,
            jurusan: newprofile.jurusan,
            role: newprofile.role,
          }
    });

    //add status 201 created
    return NextResponse.json(profile, { status: 201 });

    // return NextResponse.json(profile);
  } catch (error) {
    console.log("PROFILE_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}