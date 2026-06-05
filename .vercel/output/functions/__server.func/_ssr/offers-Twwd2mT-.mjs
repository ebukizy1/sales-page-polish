import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as getOffersData } from "./example.functions-D1NqFWnG.mjs";
import "../_libs/seroval.mjs";
import { G as Gift, T as Tag, A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-ns6X4ZMQ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function OffersPage() {
  const [offers, setOffers] = reactExports.useState([]);
  const [productImages, setProductImages] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await getOffersData();
        setOffers(res.offers);
        setProductImages(res.productImages);
      } catch (err) {
        console.error("Failed to load offers:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm font-bold text-primary", children: "← Back to Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "All Active Offers" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3.5 w-3.5" }),
          " Limited-Time Bundles"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-extrabold sm:text-5xl", children: "All Our Active Offers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Pick the bundle that fits your home or street. Pay on delivery." })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-12 text-center text-muted-foreground", children: "Loading offers…" }),
      !loading && offers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-12 text-center text-muted-foreground", children: "No offers available right now. Please check back soon." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2", children: offers.map((o) => {
        const savings = o.original_price && o.original_price > o.price ? o.original_price - o.price : 0;
        const cardImage = o.image_url || (o.product_slug ? productImages[o.product_slug] : void 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-2xl", children: [
          o.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-primary-foreground", children: o.badge }),
          cardImage && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cardImage, alt: o.title, className: "aspect-[16/9] w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-6 sm:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold", children: o.title }),
                o.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: o.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-end gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-extrabold text-primary", children: [
                "₦",
                o.price.toLocaleString()
              ] }),
              o.original_price && o.original_price > o.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pb-1 text-sm text-muted-foreground line-through", children: [
                "₦",
                o.original_price.toLocaleString()
              ] })
            ] }),
            savings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs font-bold text-destructive", children: [
              "You save ₦",
              savings.toLocaleString()
            ] }),
            o.product_slug ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: {
              slug: o.product_slug
            }, hash: "order", className: "mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5", children: [
              "View Offer ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", hash: "order", className: "mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5", children: [
              "Order This Bundle ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] })
        ] }, o.id);
      }) })
    ] })
  ] });
}
export {
  OffersPage as component
};
