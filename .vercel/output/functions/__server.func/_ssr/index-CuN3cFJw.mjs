import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as db } from "./cms-types-B7Rjfl77.mjs";
import { P as ProductSalesFunnel } from "./ProductSalesFunnel-Dyt5vqwv.mjs";
import "../_libs/seroval.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-BxLb0f3W.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function Index() {
  const [data, setData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: products
      } = await db.from("products").select("*").eq("active", true).order("featured", {
        ascending: false
      }).limit(1);
      const product2 = products?.[0] ?? null;
      const productId = product2?.id;
      const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([productId ? db.from("product_specifications").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({
        data: []
      }), productId ? db.from("product_features").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({
        data: []
      }), productId ? db.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order") : Promise.resolve({
        data: []
      }), db.from("site_settings").select("*").eq("id", 1).maybeSingle(), productId ? db.from("product_reviews").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({
        data: []
      }), productId ? db.from("product_faqs").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({
        data: []
      }), productId ? db.from("product_images").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({
        data: []
      })]);
      setData({
        product: product2,
        specs: specsRes.data ?? [],
        features: featRes.data ?? [],
        packages: pkgRes.data ?? [],
        settings: setRes.data ?? null,
        reviews: revRes.data ?? [],
        faqs: faqRes.data ?? [],
        images: imgRes.data ?? []
      });
    })();
  }, []);
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider", children: "Loading…" });
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
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-wider text-emerald-400", children: "No active product configured" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "Add a product from the admin dashboard to initialize the funnel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "inline-block rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 font-black text-slate-950 hover:brightness-110 shadow-lg", children: "Go to Admin →" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSalesFunnel, { product, specs, features, packages, settings, reviews, faqs, images });
}
export {
  Index as component
};
