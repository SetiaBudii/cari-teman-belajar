import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, { params } : { params: { email: string } }) {
    try{
        console.log(params.email);
        const user = await db.profile.findFirst({
            where: {
                email: params.email
            }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json({ user });
    }catch (error) {
        console.error("[USER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
  