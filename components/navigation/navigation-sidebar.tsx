import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

import { MessageCircle } from "lucide-react";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  });

  //find first member 
  const member = await db.member.findFirst({});
  if (!member) {
    return redirect("/");
  }
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <div className="flex items-center gap-x-2">
      <a href="http://localhost:3000">
      <img src="https://utfs.io/f/4fd5de1b-4c72-4cd3-9e57-e6b99a441226-zalnry.png" alt="logo" className="h-8 w-8 rounded-full" />
      </a>
      </div>
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <NavigationAction />
        <div className="flex items-center gap-x-2">
          <img src={profile.imageUrl} alt={profile.name} className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}