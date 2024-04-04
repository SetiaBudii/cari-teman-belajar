import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

import { db } from "@/lib/db";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  memberSatu?: string;
  memberDua?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  memberSatu,
  memberDua
}: ChatHeaderProps) => {

  const progress = 50;

  const renderProgressBar = () => {
    if (type === "conversation" && typeof progress === 'number') {
      return (
        <div className="flex items-center ml-5 relative">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              <span className="absolute left-0 ml-1 text-xs">Friend {memberDua}</span>
              <span className="absolute right-0 mr-1 text-xs text-black ">Close Friend {memberSatu} </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar 
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white mx-2">
        {name}
      </p>
      <div className="flex items-center">
      {type === "conversation" && (
        renderProgressBar()
      )}
      </div>
      {/* <div className="ml-auto flex items-center">
        {type === "conversation" && (
          <ChatVideoButton />
        )}
        <SocketIndicator />
      </div> */}
    </div>
  )
}
