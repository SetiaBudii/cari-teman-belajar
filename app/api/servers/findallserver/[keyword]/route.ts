import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { keyword: string } }) {
  try {
    // Search for all servers based on the keyword
    const servers = await db.server.findMany({
      where: {
        OR: [
          {
            name: {
              contains: params.keyword,
            },
          },
          {
            topics: {
              some: {
                name: {
                  contains: params.keyword,
                },
              },
            },
          },
        ],
      },
      include: {
        topics: true,
        members: true,
      },
    });

    //add total member
// Calculate total members for each server and add to the response
const serversWithTotalMembers = servers.map(server => {
  const totalMembers = server.members.length;
  return { ...server, totalMembers };
});

if (serversWithTotalMembers.length === 0) {
  return new NextResponse("Server not found", { status: 404 });
}

return NextResponse.json({ servers: serversWithTotalMembers });
} catch (error) {
console.error("[SERVERS]", error);
return new NextResponse("Internal Error", { status: 500 });
}
}
