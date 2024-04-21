import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { min } from "date-fns";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  memberSatu?: string;
  memberDua?: string;
  levelFriendship?: number;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  memberSatu,
  memberDua,
  levelFriendship,
}: ChatHeaderProps) => {

  const renderProgressBar = () => {
    if (type === "conversation" && typeof levelFriendship === 'number') {

      let leftLabel = "";
      let rightLabel = "";
      let minusPoint = 0;
      let kaliPoint = 1;

      // Tentukan label kiri dan kanan berdasarkan level pertemanan
      if (levelFriendship >= 0 && levelFriendship < 50) {
        leftLabel = "Stranger";
        rightLabel = "Acquaintance";
        kaliPoint = 2;
      } else if (levelFriendship >= 50 && levelFriendship < 150) {
        leftLabel = "Acquaintance";
        rightLabel = "Friend";
        minusPoint = 50;
      } else if (levelFriendship >= 150 && levelFriendship < 250) {
        leftLabel = "Friend";
        rightLabel = "Close Friend";
        minusPoint = 150;
      } else if (levelFriendship >= 250 && levelFriendship <= 350) {
        leftLabel = "Close Friend";
        rightLabel = "BFF";
        minusPoint = 250;
      }
      return (
        <div className="flex items-center ml-5 relative">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${levelFriendship * kaliPoint - minusPoint}%` }}>
              <span className="absolute left-0 ml-1 text-xs text-black">{leftLabel}</span>
              <span className="absolute right-0 mr-1 text-xs text-black ">{rightLabel}</span>
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
