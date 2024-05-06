
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// Define an interface for the community object with the totalMember property

export async function GET(req: Request, { params }: { params: { name: string } }) {
//get user by name
    const user = await db.profile.findFirst({
    where: {
        name: params.name
    }
});

if (!user) {
    return new NextResponse("Not Found", { status: 404 });
}

//get user total community
const community = await db.server.findMany({
    where: {
        members: {
            some: {
                profileId: user.id
            }
        }
    }
});


return NextResponse.json({ community: community.length});

}