import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { profileId: string } }) {
    try {
        const idmember = await db.member.findFirst({
            where: {
                profileId: params.profileId
            },select:{
                id:true
            }
        });
        return NextResponse.json({ idmember })
    }
    catch (error) {
        console.error("[MEMBERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}