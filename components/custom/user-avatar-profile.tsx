import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  name: string;
  imageUrl?: string;
  email: string;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  name,
  imageUrl,
  email,
}: UserAvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={className}>
        <AvatarImage src={imageUrl || ""} alt={name || ""} />
        <AvatarFallback className="rounded-lg">
          {getInitials(name) || "CN"}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name || ""}</span>
          <span className="truncate text-xs">{email || ""}</span>
        </div>
      )}
    </div>
  );
}
