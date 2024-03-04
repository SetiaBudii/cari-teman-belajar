
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    /// Get following for a specific profile
    const following = await db.profile.findUnique({
        where: { userId: params.userId },
    }).following();
    return NextResponse.json({ following: following });
}

//follow a user
export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    // Check if both users exist
    const follower = await db.profile.findUnique({
        where: { userId: body.followerUserId },
    });

    const following = await db.profile.findUnique({
        where: { userId: body.followingUserId },
    });

    if (!follower || !following) {
        console.error('One or both users do not exist');
        return null;
    }

    // Check if the follow relationship already exists
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: follower.id,
            followingId: following.id,
        },
    });

    if (existingFollow) {
        console.error('Follow relationship already exists');
        return null;
    }

    // Create a new follow relationship
    const newFollow = await db.follow.create({
        data: {
            followerId: follower.id,
            followingId: following.id,
        },
    });

    console.log('Successfully followed user');
    return newFollow;
}