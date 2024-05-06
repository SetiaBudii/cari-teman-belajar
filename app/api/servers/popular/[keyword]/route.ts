import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { keyword: string } }) {
    try {
        // Mengambil semua yang paling banyak member
        const servers = await db.server.findMany({
          include: {
            members : true
          }

        });

        if (!servers) {
          return new NextResponse("Not Found", { status: 404 });
        }

        // Sort servers by total members
        servers.sort((a, b) => b.members.length - a.members.length);

        //get the first 3 servers
        const serversWithTotalMembers = servers.slice(0, 3).map(server => {
          const totalMembers = server.members.length;
          return { ...server, totalMembers };
        });
    
        return NextResponse.json({ servers: serversWithTotalMembers});
      } catch (error) {
        console.error("[SERVERS_COUNT]", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }
