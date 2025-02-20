// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2e9d18c0ea7113fea5a43ac2fa127a60@o4508834301804544.ingest.de.sentry.io/4508834304819280",
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
