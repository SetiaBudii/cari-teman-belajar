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
            email: newprofile.email
          }
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log("PROFILE_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}