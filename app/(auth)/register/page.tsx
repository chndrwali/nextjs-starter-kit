import { AuthForm } from "@/modules/auth/ui/form";

export const metadata = {
  title: "Register",
  description: "Register to your account",
};

export default function RegisterPage() {
  return <AuthForm variant="register" />;
}
