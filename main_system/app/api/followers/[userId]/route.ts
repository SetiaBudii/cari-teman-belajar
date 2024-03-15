
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    // Get followers for a specific profile
    console.log(params.userId);
    const followers = await db.profile.findUnique({
        where: { userId: params.userId },
    }).followers();
    console.log(followers);
    return NextResponse.json({ followers: followers });
}