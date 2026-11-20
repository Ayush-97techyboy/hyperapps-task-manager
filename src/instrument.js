import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    // Enables automatic browser tracing/performance monitoring
    Sentry.browserTracingIntegration(),
    // Enables Session Replay
    Sentry.replayIntegration(),
    // Enables User Feedback widget
    Sentry.feedbackIntegration({
      colorScheme: "dark",
      autoInject: false,
    }),
  ],

  // Tracing configuration
  // Set to 1.0 in development; reduce in production
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

  // Session Replay configuration
  // Capture 10% of sessions, and 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
