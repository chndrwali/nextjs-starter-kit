import { AuthForm } from "@/modules/auth/ui/form";

export const metadata = {
  title: "Register",
  description: "Register to your account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthForm variant="register" />;
}
