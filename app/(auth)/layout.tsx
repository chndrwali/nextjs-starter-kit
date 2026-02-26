import { getSession } from "@/hooks/get-session";
import { AuthLayout } from "@/modules/auth/ui/layout/auth-layout";
import { redirect } from "next/navigation";

export default async function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return <AuthLayout>{children}</AuthLayout>;
}
