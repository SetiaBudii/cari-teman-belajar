
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { profileId: string } }) {

    /// Get list server by profileId
    const community = await db.server.findMany({
        where: { profileId: params.profileId },
    });

    //count total member of each server
    for (let i = 0; i < community.length; i++) {
        const totalMember = await db.member.count({
            where: { serverId: community[i].id }
        });
        //add total member column to each server
        community[i].totalMember = totalMember;
        
    }
    
    return NextResponse.json({ community: community});
}