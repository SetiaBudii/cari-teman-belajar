
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { profileId: string } }) {
    /// Get following for a specific profile
    const user = await db.profile.findUnique({
        where: { id: params.profileId },
    });
    return NextResponse.json({ user: user });
}