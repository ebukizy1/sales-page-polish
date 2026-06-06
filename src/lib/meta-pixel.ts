/**
 * Utility functions for tracking Meta (Facebook) Pixel events.
 *
 * The pixel is initialised in src/routes/__root.tsx via an inline <script>
 * injected server-side, so fbq is available as soon as the browser parses
 * the <head> — before React hydrates. These helpers are safe to call from
 * any client-side event handler; they no-op on the server (SSR).
 */

type FbqFn = (...args: unknown[]) => void;

function getFbq(): FbqFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: FbqFn }).fbq;
}

export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  const fbq = getFbq();
  if (!fbq) return;
  if (params) {
    fbq("track", eventName, params);
  } else {
    fbq("track", eventName);
  }
}

export function trackCustomMetaEvent(eventName: string, params?: Record<string, unknown>) {
  const fbq = getFbq();
  if (!fbq) return;
  if (params) {
    fbq("trackCustom", eventName, params);
  } else {
    fbq("trackCustom", eventName);
  }
}
