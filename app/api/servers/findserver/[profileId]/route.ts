import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req:Request, { params } : { params: { profileId: string } }) {
  try {
    // Mengambil server yang memiliki anggota terkait dengan profil pengguna yang ditemukan
    const serversFollowedByUser = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId: params.profileId
          }
        }
      }
    });

    // Menghitung jumlah server yang diikuti oleh pengguna
    const serverCount = serversFollowedByUser.length;

    // Mengembalikan jumlah server dalam format JSON
    return NextResponse.json({ serverCount });
  } catch (error) {
    console.error("[SERVERS_COUNT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
