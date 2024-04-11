import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

    const allmembers = await db.member.findMany({
        include: {
            profile: true
        }
    });

    //remove duplicate member based profileId
    const uniqueMembers = allmembers.filter((member, index, self) => self.findIndex(m => m.profileId === member.profileId) === index);

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[250px] z-30 flex-col fixed inset-y-0">
                <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
                    <ScrollArea className="flex-1 px-3">
                        <div className="mt-3">Chat Room</div>
                        <Separator className="my-3" />
                        <div className="flex flex-col space-y-2">
                            {uniqueMembers.map((member) => (
                                <div key={member.id}>
                                    <div className="flex items-center gap-x-2">
                                    <img src={member.profile.imageUrl} alt={member.profile.name} className="h-8 w-8 rounded-full" />
                                    <a href={`http://localhost:9191/pesan/conversations/${member.id}`} className="text-white-500 hover:underline">
                                        {member.profile.name}
                                    </a>
                                    </div>
                                </div>
                            ))}
                            {/* {allProfiles
                                // Filter out duplicate profiles based on profileId
                                .filter((profile, index, self) =>
                                    index === self.findIndex(p => p.id === profile.id)
                                )
                                .map((profile) => (
                                    <div key={profile.id}>
                                        {profile.members.map((member) => (
                                            <div key={member.id}>
                                                <img src={profile.imageUrl} alt={profile.name} className="h-8 w-8 rounded-full" />
                                                <a href={`http://localhost:9191/pesan/conversations/${member.id}`} className="text-white-500 hover:underline">
                                                    {profile.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            } */}
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <main className="md:pl-[250px] h-full">{children}</main>
        </div>
    );
};

export default conversationLayout;
