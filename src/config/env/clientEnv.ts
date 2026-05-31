import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_SENTRY_DSN: z.url(),

  //   FIREBASE_CLIENT_EMAIL: z.string().min(1),
  //   FIREBASE_PRIVATE_KEY: z.string().min(5),
  //   MPESA_SANDBOX_CONSUMER_KEY: z.string().min(5),
  //   MPESA_SANDBOX_CONSUMER_SECRET: z.string().min(5),
  //   MPESA_SANDBOX_PASSKEY: z.string().min(1),
  //   MPESA_SHORTCODE: z.string().min(1),
  //   MPESA_PASSKEY: z.string().min(1),
  //   MPESA_CONSUMER_KEY: z.string().min(1),
  //   MPESA_CONSUMER_SECRET: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  //   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1),
});

const parsedEnv = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  //   FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  //   FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  //   MPESA_SANDBOX_CONSUMER_KEY: process.env.MPESA_SANDBOX_CONSUMER_KEY,
  //   MPESA_SANDBOX_CONSUMER_SECRET: process.env.MPESA_SANDBOX_CONSUMER_SECRET,
  //   MPESA_SANDBOX_PASSKEY: process.env.MPESA_SANDBOX_PASSKEY,
  //   MPESA_SHORTCODE: process.env.MPESA_SHORTCODE,
  //   MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
  //   MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
  //   MPESA_PASSKEY: process.env.MPESA_PASSKEY,
  //   AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  //   MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

if (!parsedEnv.success) {
  console.log("Invalid Client Env variables", parsedEnv.error);
  throw new Error("Invalid Client Env variables");
}

export const clientEnv = parsedEnv.data;
