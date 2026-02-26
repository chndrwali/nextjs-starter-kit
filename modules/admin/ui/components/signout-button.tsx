"use client";

import { DeleteConfirmationDialog } from "@/components/custom/alert-dialog-custom";
import { appToast } from "@/components/custom/app-toast";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const SignoutButton = () => {
  const router = useRouter();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogoutClick = (e: React.MouseEvent) => {
    // Prevent the dropdown from closing immediately which would unmount this component
    e.preventDefault();
    setShowLogoutAlert(true);
  };

  const handleLogoutConfirm = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            appToast.success("Logout successfully");
            router.push("/login");
          },
          onError: (ctx) => {
            appToast.error(ctx.error.message);
          },
        },
      });
      setShowLogoutAlert(false);
    });
  };

  return (
    <>
      <DropdownMenuItem
        onClick={handleLogoutClick}
        className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20"
      >
        <LogOutIcon className="mr-2 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>

      <DeleteConfirmationDialog
        open={showLogoutAlert}
        onOpenChange={setShowLogoutAlert}
        title="Sign out of your account?"
        description="You will need to sign in again to access the dashboard."
        onConfirm={handleLogoutConfirm}
        isDeleting={isPending}
        confirmationKeyword="SIGNOUT"
        confirmationText="Sign out"
      />
    </>
  );
};
