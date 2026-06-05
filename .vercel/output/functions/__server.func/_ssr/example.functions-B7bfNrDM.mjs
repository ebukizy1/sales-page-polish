import { T as TSS_SERVER_FUNCTION, b as createServerFn } from "./server-DpR3w80_.mjs";
import { s as supabase } from "./client-B568P1DA.mjs";
import process$1 from "node:process";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function getServerConfig() {
  return {
    nodeEnv: process$1.env.NODE_ENV
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}
const getGreeting_createServerFn_handler = createServerRpc({
  id: "a8ea96f55c98d9dfe39eba1f21271c6c33bfa924611fe9d828fca0774e41b939",
  name: "getGreeting",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getGreeting.__executeServer(opts));
const getGreeting = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1)
})).handler(getGreeting_createServerFn_handler, async ({
  data
}) => {
  const config = getServerConfig();
  return {
    greeting: `Hello, ${data.name}!`,
    mode: config.nodeEnv ?? "unknown"
  };
});
const notifyNewOrder_createServerFn_handler = createServerRpc({
  id: "09ae2a65f32d5db9bfcd9527f81e90c587a3ff1b110b2c658a951f49704f8c64",
  name: "notifyNewOrder",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => notifyNewOrder.__executeServer(opts));
const notifyNewOrder = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  to: stringType().email().optional(),
  subject: stringType().min(1),
  text: stringType().min(1)
})).handler(notifyNewOrder_createServerFn_handler, async ({
  data
}) => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : void 0;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = data.to || process.env.ORDER_NOTIFY_EMAIL_TO || void 0;
  if (!host || !port || !user || !pass || !from || !to) {
    return {
      sent: false
    };
  }
  const nodemailer = await import("../_libs/nodemailer.mjs").then(function(n) {
    return n.n;
  });
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });
  await transporter.sendMail({
    from,
    to,
    subject: data.subject,
    text: data.text
  });
  return {
    sent: true
  };
});
const getLandingPageData_createServerFn_handler = createServerRpc({
  id: "a0e2360f49e02dc087b5430d5aa4ccbf098e818cc22e7e556f5b552968d7c3d1",
  name: "getLandingPageData",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getLandingPageData.__executeServer(opts));
const getLandingPageData = createServerFn({
  method: "GET"
}).handler(getLandingPageData_createServerFn_handler, async () => {
  try {
    const {
      data: products
    } = await supabase.from("products").select("*").eq("active", true).order("featured", {
      ascending: false
    }).limit(1);
    const product = products?.[0] ?? null;
    if (!product) return {
      product: null
    };
    const productId = product.id;
    const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([supabase.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_features").select("*").eq("product_id", productId).order("sort_order"), supabase.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"), supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(), supabase.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_images").select("*").eq("product_id", productId).order("sort_order")]);
    return {
      product,
      specs: specsRes.data ?? [],
      features: featRes.data ?? [],
      packages: pkgRes.data ?? [],
      settings: setRes.data ?? null,
      reviews: revRes.data ?? [],
      faqs: faqRes.data ?? [],
      images: imgRes.data ?? []
    };
  } catch (err) {
    console.error("Error in getLandingPageData server function:", err);
    return {
      error: err instanceof Error ? err.message : String(err),
      envKeys: Object.keys(process.env).filter((k) => k.includes("SUPABASE") || k.includes("VITE"))
    };
  }
});
const getProductBySlugData_createServerFn_handler = createServerRpc({
  id: "d08d74cdba5b8cdbfa340fa6195950e7cd7f7c47800ce1569c511a523b4cdaf5",
  name: "getProductBySlugData",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getProductBySlugData.__executeServer(opts));
const getProductBySlugData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(getProductBySlugData_createServerFn_handler, async ({
  data
}) => {
  const {
    slug
  } = data;
  const {
    data: product
  } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (!product) return null;
  const productId = product.id;
  const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([supabase.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_features").select("*").eq("product_id", productId).order("sort_order"), supabase.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"), supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(), supabase.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"), supabase.from("product_images").select("*").eq("product_id", productId).order("sort_order")]);
  return {
    product,
    specs: specsRes.data ?? [],
    features: featRes.data ?? [],
    packages: pkgRes.data ?? [],
    settings: setRes.data ?? null,
    reviews: revRes.data ?? [],
    faqs: faqRes.data ?? [],
    images: imgRes.data ?? []
  };
});
const getOffersData_createServerFn_handler = createServerRpc({
  id: "525bd2cbf959dc36e31c6248bb1917ae23e9f675701ed6ba5e796ebcd0a5029f",
  name: "getOffersData",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getOffersData.__executeServer(opts));
const getOffersData = createServerFn({
  method: "GET"
}).handler(getOffersData_createServerFn_handler, async () => {
  const {
    data: offers
  } = await supabase.from("offers").select("id, title, description, price, original_price, badge, image_url, product_slug, sort_order").eq("active", true).order("sort_order", {
    ascending: true
  });
  const nextOffers = offers ?? [];
  const slugs = Array.from(new Set(nextOffers.map((o) => o.product_slug).filter((x) => !!x)));
  let productImages = {};
  if (slugs.length) {
    const {
      data: products
    } = await supabase.from("products").select("slug,hero_image_url").in("slug", slugs);
    products?.forEach((p) => {
      if (p.hero_image_url) productImages[p.slug] = p.hero_image_url;
    });
  }
  return {
    offers: nextOffers,
    productImages
  };
});
export {
  getGreeting_createServerFn_handler,
  getLandingPageData_createServerFn_handler,
  getOffersData_createServerFn_handler,
  getProductBySlugData_createServerFn_handler,
  notifyNewOrder_createServerFn_handler
};
