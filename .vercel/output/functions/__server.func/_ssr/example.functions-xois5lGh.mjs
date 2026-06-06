import { T as TSS_SERVER_FUNCTION, b as createServerFn } from "./server-COJXPwRD.mjs";
import { c as createClient, s as supabase } from "./client-C3PSvQqo.mjs";
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
import "../_libs/supabase__phoenix.mjs";
import "../_libs/iceberg-js.mjs";
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
function getDbClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (serviceKey && url) {
    return createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }
  return supabase;
}
const fallbackProduct = {
  id: "1",
  title: "1000W Solar Street Light",
  slug: "1000w-solar-street-light",
  tagline: "Pay On Delivery Nationwide",
  hero_headline: "Light Your Whole Compound — Without NEPA.",
  hero_subheadline: "Die-cast aluminium · 25,000mAh · 5-Year Warranty · Pay On Delivery",
  short_description: "High-quality solar street light with 25,000mAh battery and 5-year warranty. Perfect for compounds, streets, and farms.",
  hero_image_url: "https://images.unsplash.com/photo-1509395062183-67c5ad6ee6fe?w=800&q=80",
  packaging_image_url: "https://images.unsplash.com/photo-1600518464616-b99e6a584377?w=800&q=80",
  night_image_url: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80",
  specs_image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  price: 35e3,
  discount_price: 49999,
  stock_status: "Only 14 units left at promo price",
  hero_cta_text: "✅ Order Now — Pay On Delivery",
  features_section_title: "Why This Model Wins",
  features_section_subtitle: "Built to fix every complaint about cheap solar lights.",
  bills_section_title: "One Light. Zero Bills. Zero Stress.",
  bills_section_description: "Charges by day. Lights your space all night. Automatic — no switch, no wiring, no electrician. Just mount it and forget NEPA forever.",
  bills_section_list: "Compounds, gates, streets, farms, car parks, churches\nWaterproof (IP67) — works through the heaviest rainy season\nInstalls in minutes — no wiring, no electrician needed\nLights up automatically the moment the sun goes down",
  security_section_title: "Real Light. Real Security.",
  security_section_description: "See how your compound looks after dark — bright, safe, alive.",
  security_media_type: "image",
  video_url: null,
  final_cta_headline: "GET YOURS TODAY — LIMITED STOCK",
  final_cta_subheadline: "Over 380 units shipped this week. Don't miss the promo price.",
  final_cta_button_text: "Claim This Offer",
  specs_section_title: "Full Specifications",
  specs_section_subtitle: "The right parts. No shortcuts.",
  active: true,
  featured: true,
  created_at: "",
  updated_at: ""
};
const fallbackSpecs = [{
  id: "1",
  product_id: "1",
  label: "Material",
  value: "Die-cast Aluminium",
  sort_order: 1
}, {
  id: "2",
  product_id: "1",
  label: "Battery",
  value: "5× 5,000mAh 32650 Lithium (25,000mAh)",
  sort_order: 2
}, {
  id: "3",
  product_id: "1",
  label: "Light Source",
  value: "High-efficiency SMD LED",
  sort_order: 3
}, {
  id: "4",
  product_id: "1",
  label: "Mode",
  value: "Dusk-to-dawn · Always On",
  sort_order: 4
}, {
  id: "5",
  product_id: "1",
  label: "Charging",
  value: "Solar (built-in panel)",
  sort_order: 5
}, {
  id: "6",
  product_id: "1",
  label: "Install Height",
  value: "5 – 6m recommended",
  sort_order: 6
}, {
  id: "7",
  product_id: "1",
  label: "Warranty",
  value: "5 Years",
  sort_order: 7
}];
const fallbackFeatures = [{
  id: "1",
  product_id: "1",
  title: "Always On — No Sensor",
  description: "Steady light all night. Perfect for areas that need real illumination, not motion guessing.",
  icon: "Sun",
  sort_order: 1
}, {
  id: "2",
  product_id: "1",
  title: "Die-cast Aluminium Body",
  description: "Real metal — not cheap plastic. Survives sun, rain, harmattan and impact.",
  icon: "Award",
  sort_order: 2
}, {
  id: "3",
  product_id: "1",
  title: "25,000mAh Battery",
  description: "5× 5,000mAh 32650 lithium cells. All-night brightness, even after cloudy days.",
  icon: "BatteryFull",
  sort_order: 3
}, {
  id: "4",
  product_id: "1",
  title: "5-Year Warranty",
  description: "If it fails within 5 years — we replace it. Real protection, in writing.",
  icon: "ShieldCheck",
  sort_order: 4
}];
const fallbackPackages = [{
  id: "1",
  product_id: "1",
  title: "1 Piece",
  price: 35e3,
  quantity: 1,
  active: true,
  sort_order: 1
}, {
  id: "2",
  product_id: "1",
  title: "2 Pieces",
  price: 65e3,
  quantity: 2,
  active: true,
  sort_order: 2
}, {
  id: "3",
  product_id: "1",
  title: "5 Pieces + Free Bulb",
  price: 15e4,
  quantity: 5,
  active: true,
  sort_order: 3
}];
const fallbackSettings = {
  id: 1,
  phone: "+2348012345678",
  whatsapp: "+2348012345678",
  email: "info@onlinesolarstore.store",
  site_name: "Online Solar Store",
  created_at: "",
  updated_at: ""
};
const fallbackReviews = [{
  id: "1",
  product_id: "1",
  customer_name: "Mary Okonkwo",
  customer_location: "Lagos",
  rating: 5,
  review_text: "Excellent product. The brightness is amazing — covers my whole compound. Delivered next day, I paid on delivery. No wahala.",
  customer_photo_url: null,
  sort_order: 1,
  created_at: ""
}, {
  id: "2",
  product_id: "1",
  customer_name: "John Eze",
  customer_location: "Enugu",
  rating: 5,
  review_text: "Like my own security guard at night. Even when it rained for 3 days straight, the light still came on. Quality is solid.",
  customer_photo_url: null,
  sort_order: 2,
  created_at: ""
}, {
  id: "3",
  product_id: "1",
  customer_name: "Ubong Effiong",
  customer_location: "Calabar",
  rating: 5,
  review_text: "I was sceptical because of online scams. But they called me, delivered, I paid cash and inspected. Works perfectly.",
  customer_photo_url: null,
  sort_order: 3,
  created_at: ""
}];
const fallbackFaqs = [{
  id: "1",
  product_id: "1",
  question: "Does it charge on cloudy or rainy days?",
  answer: "Yes, the high-efficiency monocrystalline solar panel is designed to charge even in low light, harmattan haze, or cloudy/rainy weather. The battery store lasts up to 2-3 nights.",
  sort_order: 1,
  created_at: ""
}, {
  id: "2",
  product_id: "1",
  question: "How long does the installation take?",
  answer: "It takes less than 10 minutes. There is no wiring required. Simply mount the solar light on a pole or wall using the included bracket and screws.",
  sort_order: 2,
  created_at: ""
}, {
  id: "3",
  product_id: "1",
  question: "What does the 5-Year warranty cover?",
  answer: "The warranty covers any factory defect or complete failure of the solar panel, LEDs, or battery. We replace the light for free within the warranty period.",
  sort_order: 3,
  created_at: ""
}, {
  id: "4",
  product_id: "1",
  question: "How do I pay?",
  answer: "We offer Pay On Delivery nationwide. You only pay when the delivery agent brings the product to your door, and you can inspect it first.",
  sort_order: 4,
  created_at: ""
}];
const fallbackImages = [{
  id: "1",
  product_id: "1",
  url: "https://images.unsplash.com/photo-1509395062183-67c5ad6ee6fe?w=800&q=80",
  alt: "Hero Image",
  image_type: "gallery",
  sort_order: 1
}, {
  id: "2",
  product_id: "1",
  url: "https://images.unsplash.com/photo-1600518464616-b99e6a584377?w=800&q=80",
  alt: "Packaging",
  image_type: "gallery",
  sort_order: 2
}, {
  id: "3",
  product_id: "1",
  url: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80",
  alt: "Night View",
  image_type: "installation",
  sort_order: 3
}];
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
    const client = getDbClient();
    const {
      data: products,
      error: pErr
    } = await client.from("products").select("*").eq("active", true).order("featured", {
      ascending: false
    }).limit(1);
    if (pErr) throw pErr;
    const product = products?.[0] ?? null;
    if (!product) {
      return {
        product: fallbackProduct,
        specs: fallbackSpecs,
        features: fallbackFeatures,
        packages: fallbackPackages,
        settings: fallbackSettings,
        reviews: fallbackReviews,
        faqs: fallbackFaqs,
        images: fallbackImages
      };
    }
    const productId = product.id;
    const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([client.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"), client.from("product_features").select("*").eq("product_id", productId).order("sort_order"), client.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"), client.from("site_settings").select("*").eq("id", 1).maybeSingle(), client.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"), client.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"), client.from("product_images").select("*").eq("product_id", productId).order("sort_order")]);
    return {
      product,
      specs: specsRes.data ?? fallbackSpecs,
      features: featRes.data ?? fallbackFeatures,
      packages: pkgRes.data ?? fallbackPackages,
      settings: setRes.data ?? fallbackSettings,
      reviews: revRes.data ?? fallbackReviews,
      faqs: faqRes.data ?? fallbackFaqs,
      images: imgRes.data ?? fallbackImages
    };
  } catch (err) {
    console.error("Error in getLandingPageData server function, using fallback data:", err);
    return {
      product: fallbackProduct,
      specs: fallbackSpecs,
      features: fallbackFeatures,
      packages: fallbackPackages,
      settings: fallbackSettings,
      reviews: fallbackReviews,
      faqs: fallbackFaqs,
      images: fallbackImages
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
  try {
    const {
      slug
    } = data;
    const client = getDbClient();
    const {
      data: product
    } = await client.from("products").select("*").eq("slug", slug).maybeSingle();
    if (!product) {
      return {
        product: fallbackProduct,
        specs: fallbackSpecs,
        features: fallbackFeatures,
        packages: fallbackPackages,
        settings: fallbackSettings,
        reviews: fallbackReviews,
        faqs: fallbackFaqs,
        images: fallbackImages
      };
    }
    const productId = product.id;
    const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([client.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"), client.from("product_features").select("*").eq("product_id", productId).order("sort_order"), client.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"), client.from("site_settings").select("*").eq("id", 1).maybeSingle(), client.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"), client.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"), client.from("product_images").select("*").eq("product_id", productId).order("sort_order")]);
    return {
      product,
      specs: specsRes.data ?? fallbackSpecs,
      features: featRes.data ?? fallbackFeatures,
      packages: pkgRes.data ?? fallbackPackages,
      settings: setRes.data ?? fallbackSettings,
      reviews: revRes.data ?? fallbackReviews,
      faqs: faqRes.data ?? fallbackFaqs,
      images: imgRes.data ?? fallbackImages
    };
  } catch (err) {
    console.error("Error in getProductBySlugData server function, using fallback data:", err);
    return {
      product: fallbackProduct,
      specs: fallbackSpecs,
      features: fallbackFeatures,
      packages: fallbackPackages,
      settings: fallbackSettings,
      reviews: fallbackReviews,
      faqs: fallbackFaqs,
      images: fallbackImages
    };
  }
});
const getOffersData_createServerFn_handler = createServerRpc({
  id: "525bd2cbf959dc36e31c6248bb1917ae23e9f675701ed6ba5e796ebcd0a5029f",
  name: "getOffersData",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getOffersData.__executeServer(opts));
const getOffersData = createServerFn({
  method: "GET"
}).handler(getOffersData_createServerFn_handler, async () => {
  const fallbackOffers = [];
  try {
    const client = getDbClient();
    const {
      data: offers
    } = await client.from("offers").select("id, title, description, price, original_price, badge, image_url, product_slug, sort_order").eq("active", true).order("sort_order", {
      ascending: true
    });
    const nextOffers = offers ?? [];
    const slugs = Array.from(new Set(nextOffers.map((o) => o.product_slug).filter((x) => !!x)));
    let productImages = {};
    if (slugs.length) {
      const {
        data: products
      } = await client.from("products").select("slug,hero_image_url").in("slug", slugs);
      products?.forEach((p) => {
        if (p.hero_image_url) productImages[p.slug] = p.hero_image_url;
      });
    }
    return {
      offers: nextOffers,
      productImages
    };
  } catch (err) {
    return {
      offers: fallbackOffers,
      productImages: {}
    };
  }
});
export {
  getGreeting_createServerFn_handler,
  getLandingPageData_createServerFn_handler,
  getOffersData_createServerFn_handler,
  getProductBySlugData_createServerFn_handler,
  notifyNewOrder_createServerFn_handler
};
