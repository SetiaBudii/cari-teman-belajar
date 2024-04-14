
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// Define an interface for the community object with the totalMember property

interface CommunityServer {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    description: string;
    departement: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    totalMember: number; // Add the totalMember property here
}

export async function GET(req: Request, { params }: { params: { profileId: string } }) {
    /// Get list server by profileId
    const community = await db.server.findMany({
        where: { members: { some: { profileId: params.profileId } } },
    });

    // Count total member of each server and add the totalMember property to each server
    for (let i = 0; i < community.length; i++) {
        const totalMember = await db.member.count({
            where: { serverId: community[i].id }
        });

        // Cast the element to the CommunityServer interface to add the totalMember property
        (community[i] as CommunityServer).totalMember = totalMember;
    }
    
    return NextResponse.json({ community: community });
}