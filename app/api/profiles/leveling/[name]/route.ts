
import { db } from "@/lib/db";
import { profile } from "console";
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

//get hightest level 
const leveling = await db.friendship.findMany({
    where: {
      OR: [
        { profileIdOne: user.id },
        { profileIdTwo: user.id }
      ]
    },
    orderBy: {
      level: 'desc'
    },
    take: 1
  });

  //if user has no friends
    if (leveling.length === 0) {
        return NextResponse.json({ level: 0 });
    }

return NextResponse.json({ level: leveling});

}