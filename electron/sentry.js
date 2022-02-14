import * as Sentry from "@sentry/electron";

Sentry.init({
  onError: (e) => {
    console.log(e);
  },
  debug: true,
});
