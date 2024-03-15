import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

//follow a user
export async function POST(req: Request) {
    const body = await req.json();
    // Check if both users exist
    console.log(body);
    const follower = await db.profile.findFirst({
        where: { userId: body["follower_user_id"] },
    });
    console.log("follower", follower);
    const following = await db.profile.findFirst({
        where: { userId: body["following_user_id"] },
    });
    console.log("following", following);
    if (!follower) {
        console.error('follower do not exist');
        return NextResponse.json({ "status": "failed", "message": "follower do not exist" });
    }
    if (!following) {
        console.error('following do not exist');
        return NextResponse.json({ "status": "failed", "message": "following do not exist" });
    }

    // Check if the follow relationship already exists
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: follower.id,
            followingId: following.id,
        },
    });
    console.log(existingFollow);
    if (existingFollow) {
        console.error('Follow relationship already exists');
        return NextResponse.json({ "status": "failed", "message": "already following" });
    }

    // Create a new follow relationship
    const newFollow = await db.follow.create({
        data: {
            followerId: follower.id,
            followingId: following.id,
        },
    });

    console.log('Successfully followed user');
    return NextResponse.json({ "status": "success" });
}