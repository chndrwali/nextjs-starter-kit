import { Metadata } from "next";
import { ForgotPasswordForm } from "@/modules/auth/ui/form/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password for the portfolio admin panel.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
