import { NextResponse } from "next/server";
import { MemberRole, Server } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import pkg from "@prisma/client";
import type { Prisma as PrismaType} from '@prisma/client'

const { Prisma } = pkg;
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Extract topics from the request body
    const topics: string[] = [];
    let i = 1;
    while (body[`topic${i}`]) {
      topics.push(body[`topic${i}`]);
      i++;
    }

    const topicCreateData: Prisma.ServerTopicCreateInput[] = topics.map((topic: string) => ({
      name: topic
    }));

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
        topics: {
          create: topicCreateData
        }
        
      },
      include: {
        topics: true,      
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}