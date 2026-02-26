import { AuthForm } from "@/modules/auth/ui/form";
import { LoginAccountInfo } from "@/components/custom/login-account-info";

export const metadata = {
  title: "Login",
  description: "Login to your account",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Delete div wrapper and component above if don't need this info */}
      <LoginAccountInfo />
      <AuthForm variant="login" />
    </div>
  );
}
