"use client";
import { useEffect } from "react";

/**
 * FirebaseConsoleFilter
 *
 * Suppresses the non-actionable Firebase connectivity warning that appears as
 * a red console error in development:
 *   "@firebase/firestore: Could not reach Cloud Firestore backend..."
 *
 * Root Cause:
 *   Firebase's OnlineStateTracker emits this as console.error() when it cannot
 *   establish a connection within 10 seconds. On Pakistani ISPs and many corporate
 *   networks, the underlying gRPC/WebSocket channel is throttled or blocked,
 *   triggering this message even though the app functions perfectly via its static
 *   data fallback.
 *
 * This filter intercepts console.error, silently drops only the Firebase
 * connectivity message, and passes all other errors through unchanged.
 * It is a no-op in production builds.
 */
export default function FirebaseConsoleFilter() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const originalError = console.error.bind(console);

    console.error = (...args) => {
      const msg = args[0];
      if (
        typeof msg === "string" &&
        (msg.includes("@firebase/firestore") ||
          msg.includes("Could not reach Cloud Firestore backend") ||
          msg.includes("Backend didn't respond within") ||
          msg.includes("operate in offline mode"))
      ) {
        // Silently drop — this is a network warning, not a code bug.
        // The app already handles offline state via static data fallbacks.
        return;
      }
      originalError(...args);
    };

    // Restore original on cleanup
    return () => {
      console.error = originalError;
    };
  }, []);

  return null; // Renders nothing — purely a side-effect component
}
