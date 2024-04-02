
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    /// Get following for a specific profile
    const following = await db.profile.findUnique({
        where: { userId: params.userId },
    }).following();
    return NextResponse.json({ following: following });
}
