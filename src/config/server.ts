import { serverEnv } from "./env/serverEnv";

export const serverConfig = {
  app: {
    env: serverEnv.NODE_ENV,
    // callbackUrl: serverEnv.MPESA_CALLBACK_URL,
    // baseUrl: serverEnv.BASE_URL,
    sentryDsn: serverEnv.SENTRY_DSN,
  },
  keys: {
    privateKey: serverEnv.FIREBASE_PRIVATE_KEY,
    // ngokAuthToken: serverEnv.NGROK_AUTH_TOKEN,
    // encryptionSecret: serverEnv.ENCRYPTION_SECRET,
    resendApiKey: serverEnv.RESEND_API_KEY,
    emailApiKey: serverEnv.EMAIL_API_KEY,
    sentryAuthToken: serverEnv.SENTRY_AUTH_TOKEN,
  },
};
