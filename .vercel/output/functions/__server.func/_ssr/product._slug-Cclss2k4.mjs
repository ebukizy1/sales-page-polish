import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as getProductBySlugData } from "./meta-pixel-BTaYsr2q.mjs";
import { P as ProductSalesFunnel } from "./ProductSalesFunnel-CVNVovF2.mjs";
import { R as Route } from "./router-Ddz0xbrD.mjs";
import "../_libs/seroval.mjs";
import "./server-C1mYDNcS.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function ProductSlugPage() {
  const {
    slug
  } = Route.useParams();
  const [data, setData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await getProductBySlugData({
          data: {
            slug
          }
        });
        if (!res) {
          setError(`Product not found with slug: ${slug}`);
          return;
        }
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider", children: "Loading…" });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-wider text-rose-500", children: "Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-block rounded-xl bg-slate-900 border border-slate-800 px-6 py-3 font-bold text-slate-300 hover:bg-slate-800", children: "Go Home" })
    ] }) });
  }
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider", children: "Loading…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSalesFunnel, { product: data.product, specs: data.specs, features: data.features, packages: data.packages, settings: data.settings, reviews: data.reviews, faqs: data.faqs, images: data.images });
}
export {
  ProductSlugPage as component
};
