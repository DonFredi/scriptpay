import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  //   FIREBASE_PRIVATE_KEY: z.string().min(20),
  //   ENCRYPTION_SECRET: z.string().min(1),
  //   NGROK_AUTH_TOKEN: z.string().min(1),
  //   MPESA_CALLBACK_URL: z.url(),
  //   BASE_URL: z.url(),
  SENTRY_DSN: z.url(),
  SENTRY_AUTH_TOKEN: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_API_KEY: z.string().min(1),
  FIREBASE_PRIVATE_KEY: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log("Invalid Server Env variables", parsedEnv.error);
  process.exit(1);
}

export const serverEnv = parsedEnv.data;
