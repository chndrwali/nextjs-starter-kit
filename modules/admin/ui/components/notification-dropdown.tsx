"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// import { useRouter } from "next/navigation";
// import { useTRPC } from "@/trpc/client";
// import { formatDistanceToNow } from "date-fns";
// import {
//   useMutation,
//   useQueryClient,
//   useSuspenseQuery,
// } from "@tanstack/react-query";

export const NotificationDropdown = () => {
  //   const router = useRouter();
  const [open, setOpen] = useState(false);
  //   const trpc = useTRPC();

  // Fetch stats for the badge count
  //   const { data: stats } = useSuspenseQuery(
  //     trpc.contactAdmin.getStats.queryOptions(),
  //   );

  // Fetch latest unread messages for the dropdown
  // Only fetch when dropdown is open or to prefetch?
  // We'll fetch always for now to keep it simple, or we can use enabled: open
  //   const { data: latestMessages } = useSuspenseQuery(
  //     trpc.contactAdmin.getAll.queryOptions(
  //       {
  //         limit: 3,
  //         isRead: false,
  //         sortBy: "createdAt",
  //         sortOrder: "desc",
  //       },
  //       {
  //         // Refetch interval could be added here for real-time-ish updates
  //         refetchInterval: 30000,
  //       },
  //     ),
  //   );

  //   const queryClient = useQueryClient();

  //   const { mutate: markAsRead } = useMutation(
  //     trpc.contactAdmin.markAsRead.mutationOptions({
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({
  //           queryKey: trpc.contactAdmin.getAll.queryKey(),
  //         });
  //         queryClient.invalidateQueries({
  //           queryKey: trpc.contactAdmin.getStats.queryKey(),
  //         });
  //       },
  //     }),
  //   );

  //   const unreadCount = stats?.unreadCount ?? 0;
  //   const messages = latestMessages?.data ?? [];

  //   const handleMessageClick = (id: string) => {
  //     markAsRead({ id });
  //     setOpen(false);
  //     router.push("/admin/inbox");
  //   };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          {/* {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-background">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )} */}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* You have {unreadCount} unread messages */}
              You have 1 unread messages
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* {messages.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        ) : (
          <div className="flex flex-col gap-1 p-1">
            {messages.map((message) => (
              <DropdownMenuItem
                key={message.id}
                className="flex cursor-pointer flex-col items-start gap-1 p-3 focus:bg-muted/50"
                onClick={() => handleMessageClick(message.id)}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{message.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {message.subject || "(No Subject)"}
                </p>
              </DropdownMenuItem>
            ))}
          </div>
        )} */}

        <div className="py-6 text-center text-sm text-muted-foreground">
          No new notifications
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer justify-center text-center font-medium text-primary focus:text-primary"
        >
          <Link href="/admin/inbox">Read all messages</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
