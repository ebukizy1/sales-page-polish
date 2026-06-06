import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as getLandingPageData } from "./meta-pixel-CsVAYHMc.mjs";
import { P as ProductSalesFunnel } from "./ProductSalesFunnel-CZyole2N.mjs";
import "../_libs/seroval.mjs";
import "./server-DrkEvTbZ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "./cms-types-DUiZVPkm.mjs";
import "./client-C3PSvQqo.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/lucide-react.mjs";
function Index() {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [diagnostics, setDiagnostics] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await getLandingPageData();
        if (res && res.error) {
          setError(res.error);
          setDiagnostics(res.envKeys || []);
        } else {
          setData(res);
        }
      } catch (err) {
        console.error("Failed to load landing page data:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider", children: "Loading…" });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-wider text-rose-500", children: "Error Loading Sales Page" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 font-mono bg-slate-900/50 p-4 rounded-xl border border-rose-500/10 text-left overflow-auto max-h-40", children: error }),
      diagnostics && diagnostics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left text-xs font-mono bg-slate-900/30 p-4 rounded-xl border border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-300", children: "Server Environment Keys Found:" }),
        diagnostics.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500", children: [
          "• ",
          k
        ] }, k))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), className: "inline-block rounded-xl bg-slate-900 border border-slate-800 px-6 py-3 font-bold text-slate-300 hover:bg-slate-850 transition", children: "Reload Page" })
    ] }) });
  }
  if (!data || !data.product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-wider text-emerald-400", children: "No active product configured" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "Add a product from the admin dashboard to initialize the funnel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "inline-block rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 font-black text-slate-950 hover:brightness-110 shadow-lg", children: "Go to Admin →" })
    ] }) });
  }
  const {
    product,
    specs,
    features,
    packages,
    settings,
    reviews,
    faqs,
    images
  } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSalesFunnel, { product, specs, features, packages, settings, reviews, faqs, images });
}
export {
  Index as component
};
