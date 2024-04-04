import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const conversationLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const allProfiles = await db.profile.findMany({
        include: {
            members: {
                select: {
                    id: true
                }
            }
        }
    });

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[250px] z-30 flex-col fixed inset-y-0">
                <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
                    <ScrollArea className="flex-1 px-3">
                        <div className="mt-3">
                            Chat Room
                        </div>
                        <Separator className="my-3" />
                        <div className="flex flex-col space-y-2">
                            {allProfiles.map((profile) => (
                                <div key={profile.id}>
                                    <img src={profile.imageUrl} alt={profile.name} className="h-8 w-8 rounded-full" />
                                        <a href={`http://localhost:9191/conversations/${profile.id}`} className="text-white-500 hover:underline">
                                            {profile.name}
                                        </a>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <main className="md:pl-[250px] h-full">
                {children}
            </main>
        </div>
    );
}

export default conversationLayout;