import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, { params } : { params: { keyword: string } }) {
    try{
        //Mecari user yang kampus, nama, atau jurusannya mengandung keyword
        const users = await db.profile.findMany({
            where: {
                OR: [
                    {
                        kampus: {
                            contains: params.keyword
                        }
                    },
                    {
                        name: {
                            contains: params.keyword
                        }
                    },
                    {
                        jurusan: {
                            contains: params.keyword
                        }
                    }
                ]
            }
        });

        if (users.length === 0) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json({ users });
    }catch (error) {
        console.error("[USERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}