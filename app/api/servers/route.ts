import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("autorized");
    const server = await db.server.create({
      data: {
        profileId: profile?.id,
        name: body["name"],
        imageUrl: body["imageUrl"],
        description: body["description"],
        departement: body["departement"],
        location: body["location"],
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general" , profileId: profile?.id}
          ]
        },
        members: {
          create: [
            { profileId: profile?.id, role: MemberRole.ADMIN }
          ]
        },
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}