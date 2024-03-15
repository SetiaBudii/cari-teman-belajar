import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, { params } : { params: { keyword: string } }) {
  try {
    //Mencari semua server berdasarkan keyword
    const servers = await db.server.findMany({
      where: {
        topics: {
          some: {
            name: {
              contains: params.keyword,
            },
          },
        }
      },
    include: {
        topics: true,
    },
    });

    if (servers.length === 0) {
      return new NextResponse("Server not found", { status: 404 });
    }
    
    return NextResponse.json({ servers });
  } catch (error) {
    console.error("[SERVERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
