import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userid = req.cookies.get('userid');
    if (!userid) {
        return NextResponse.json({ "status": "none" });
    }
    return NextResponse.json({ "status": "logged", "userid": userid });
}