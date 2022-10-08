import '../styles/globals.css'
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://fc63e4f4072b4d9faee3f5ab4a1983dc@o4503947196956672.ingest.sentry.io/4503947201609731",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}

export default MyApp
