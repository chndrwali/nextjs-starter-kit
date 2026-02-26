import { AuthForm } from "@/modules/auth/ui/form";

export const metadata = {
  title: "Login",
  description: "Login to your account",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthForm variant="login" />;
}
