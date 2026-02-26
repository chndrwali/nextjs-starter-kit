import { AuthForm } from "@/modules/auth/ui/form";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return <AuthForm variant="login" />;
}
