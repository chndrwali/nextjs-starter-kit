const config = {
  env: {
    nextPublicUrl: process.env.NEXT_PUBLIC_URL! || "http://localhost:3000",
    databaseUrl: process.env.DATABASE_URL!,
    betterAuth: {
      url: process.env.BETTER_AUTH_URL! || "http://localhost:3000",
      secret: process.env.BETTER_AUTH_SECRET!,
    },
    resendApiKey: process.env.RESEND_API_KEY!,
    uploadthingToken: process.env.UPLOADTHING_TOKEN!,
  },
};

export default config;
