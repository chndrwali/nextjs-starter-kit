"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/form-schema";
import { resetPassword } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PasswordInput } from "@/components/custom/password-input";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { appToast } from "@/components/custom/app-toast";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      setError("Token not found. Please request a new password reset link.");
      return;
    }

    setError(undefined);

    await resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          appToast.success("Password successfully changed!");
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message);
          appToast.error(`${ctx.error.message}`);
        },
        onSettled: () => setLoading(false),
      },
    );
  };

  // No token in URL
  if (!token) {
    return (
      <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-xl font-bold">Token Not Found</CardTitle>
          <CardDescription className="text-base">
            The reset password link is invalid or has expired. Please request a
            new link.
          </CardDescription>
          <Button asChild className="mt-2">
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Success state
  if (success) {
    return (
      <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl font-bold">
            Password Changed Successfully!
          </CardTitle>
          <CardDescription className="text-base">
            Your password has been reset. Please login with your new password.
          </CardDescription>
          <Button className="mt-2" onClick={() => router.push("/login")}>
            Sign In Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-bold">RESET PASSWORD</CardTitle>
        <CardDescription>Enter a new password for your account</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter new password"
                      required
                      showRules
                      showStrength
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Re-enter new password"
                      required
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : "Change Password"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary cursor-pointer hover:underline"
              >
                Back to login
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
