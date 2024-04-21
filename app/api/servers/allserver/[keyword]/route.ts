import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { keyword: string } }) {
    try {
        // Mengambil semua server yang ada
        const servers = await db.server.findMany({
          include: {
            topics : true,
            members : true
          }
      });
    
      // Calculate total members for each server and add to the response
    const serversWithTotalMembers = servers.map(server => {
      const totalMembers = server.members.length;
      return { ...server, totalMembers };
    });
        
        return NextResponse.json({ servers: serversWithTotalMembers});
      } catch (error) {
        console.error("[SERVERS_COUNT]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }
