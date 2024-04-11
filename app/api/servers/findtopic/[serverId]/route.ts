import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, { params } : { params: { serverId: string } }) {
  try {
    //mencari topic server berdasarkan serverId
    const servers = await db.serverTopic.findMany({
      where: {
        serverId: params.serverId
      }
    });
    
    return NextResponse.json({ servers });
  } catch (error) {
    console.error("[SERVERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
