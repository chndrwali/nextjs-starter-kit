import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
// import { Resend } from "resend";
import prisma from "@/lib/prisma";
import config from "@/lib/config-env";

const isProduction = process.env.NODE_ENV === "production";
// const resend = new Resend(config.env.resendApiKey);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [config.env.nextPublicUrl],
  secret: config.env.betterAuth.secret,
  baseURL: config.env.betterAuth.url,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
    autoSignIn: false,
    // sendResetPassword: async ({ user, url }) => {
    //   await resend.emails.send({
    //     from: "Candra<no-reply@resend.dev>",
    //     to: user.email,
    //     subject: "Reset Password Kamu",
    //     html: `
    //       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 8px;">
    //         <h2 style="margin: 0 0 16px; font-size: 20px; color: #111;">Reset Password</h2>
    //         <p style="margin: 0 0 24px; color: #555; line-height: 1.6;">
    //           Hai <strong>${user.name || "User"}</strong>, kami menerima permintaan untuk mengatur ulang password akun kamu. Klik tombol di bawah untuk melanjutkan:
    //         </p>
    //         <a href="${url}" style="display: inline-block; padding: 12px 28px; background: #e84535; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 600;">
    //           Reset Password
    //         </a>
    //         <p style="margin: 24px 0 0; font-size: 13px; color: #999; line-height: 1.5;">
    //           Jika kamu tidak meminta reset password, abaikan email ini. Link ini akan kedaluwarsa dalam 1 jam.
    //         </p>
    //       </div>
    //     `,
    //   });
    // },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 1 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  // Rate limiting configuration
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds window
    max: 100, // Default max requests per window
    // Custom rules for auth endpoints
    customRules: {
      // Stricter limit for sign-in (brute force protection)
      "/login/*": {
        window: 60,
        max: 5, // 5 attempts per minute
      },
      // Stricter limit for sign-up (spam protection)
      "/register/*": {
        window: 60,
        max: 3, // 3 attempts per minute
      },
      // Stricter limit for password reset
      "/forgot-password": {
        window: 60,
        max: 3,
      },
      "/reset-password": {
        window: 60,
        max: 3,
      },
    },
    storage: "memory", // Use in-memory storage (for single instance)
  },
  // Advanced security options
  advanced: {
    // Use secure cookies in production
    useSecureCookies: isProduction,
    // Default cookie attributes for XSS protection
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      path: "/",
    },
  },
  plugins: [admin()],
});
