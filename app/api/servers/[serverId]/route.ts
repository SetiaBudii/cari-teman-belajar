import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    console.log("profile", profile);
    if (!profile) {
      return new NextResponse("Unauthorizjkjkjked", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    console.log("profile", profile);
    const { name, imageUrl, description, departement, location, topic1, topic2, topic3 } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthokjkjkjkrized", { status: 401 });
    }

    let allTopic = [];
    //Not using topic=none
    for (const topic of [topic1, topic2, topic3]) {
      if (topic !== "none") {
        allTopic.push(topic);
      }
    }

    // Find all server topics associated with the specified serverId
    const allTopics = await db.serverTopic.findMany({
      where: { serverId: params.serverId },
    });

    // Update each server topic
    for (const topic of allTopics) {
      await db.serverTopic.update({
        where: { id: topic.id },
        //use allTopic to update the name of the topics
        data: { name: allTopic.shift() || "none" },
      });
    }

    //update server and its topics
    const server = await db.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        name,
        imageUrl,
        description,
        departement,
        location,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}