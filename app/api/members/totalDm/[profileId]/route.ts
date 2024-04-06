import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: Request, { params }: { params: { profileId: string } }) {
    const profile = await currentProfile();

    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const idmember1 = await db.member.findFirst({
            where: {
                profileId: profile.id
            }, select: {
                id: true
            }
        });

        const idmember2 = await db.member.findFirst({
            where: {
                profileId: params.profileId
            }, select: {
                id: true
            }
        });

        console.log(idmember1, idmember2);
        // Gunakan Prisma untuk menghitung total pesan langsung antara dua anggota
        const totalDirectMessages1 = await db.directMessage.findMany({
            where: {

                memberId: idmember1?.id,
                conversation: {
                    memberTwoId: idmember2?.id
                }
            }, select: {
                content: true
            }
        });

        const totalDirectMessages2 = await db.directMessage.findMany({
            where: {
                memberId: idmember2?.id,
                conversation: {
                    memberTwoId: idmember1?.id
                }
            }, select: {
                content: true
            }
        });

        return NextResponse.json({totalDirectMessages1, totalDirectMessages2});
    } catch (error) {
        console.error("[DIRECT-MESSAGES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

