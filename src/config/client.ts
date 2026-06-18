import { clientEnv } from "./env/clientEnv";

export const clientConfig = {
  app: {
    env: clientEnv.NODE_ENV,
    siteUrl: clientEnv.NEXT_PUBLIC_SITE_URL,
    sentryClientDsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
    // clientEmail: clientEnv.FIREBASE_CLIENT_EMAIL,
    // consumerKey: clientEnv.MPESA_SANDBOX_CONSUMER_KEY,
    // consumerSecret: clientEnv.MPESA_SANDBOX_CONSUMER_SECRET,
    // passKey: clientEnv.MPESA_SANDBOX_PASSKEY,
    // shortcode: clientEnv.MPESA_SHORTCODE,
    // authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: clientEnv.PROJECT_ID,
    apiKey: clientEnv.API_KEY,
    storageBucket: clientEnv.STORAGE_BUCKET,
    senderId: clientEnv.SENDER_ID,
    appId: clientEnv.APP_ID,
    measurementId: clientEnv.MEASUREMENT_ID,
  },
  api: {
    apiUrl: clientEnv.NEXT_PUBLIC_API_URL,
    // clientEmail: clientEnv.FIREBASE_CLIENT_EMAIL,
    // consumerKey: clientEnv.MPESA_SANDBOX_CONSUMER_KEY,
    // consumerSecret: clientEnv.MPESA_SANDBOX_CONSUMER_SECRET,
    // sandboxPasskey: clientEnv.MPESA_SANDBOX_PASSKEY,
  },
};
