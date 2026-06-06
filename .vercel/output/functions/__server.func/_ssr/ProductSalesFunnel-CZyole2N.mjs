import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as db } from "./cms-types-DUiZVPkm.mjs";
import { t as trackMetaEvent, n as notifyNewOrder } from "./meta-pixel-CsVAYHMc.mjs";
import { Z as Zap, C as Check, F as Flame, M as MessageCircle, S as ShieldCheck, a as Truck, L as Lock, b as Star, c as CircleCheck, d as Leaf, W as Wrench, D as Droplet, B as BatteryFull, e as Award, f as Sun, g as MapPin, P as Package, h as TriangleAlert, i as Phone, j as ChevronLeft, k as ChevronRight, l as Clock, m as ChevronUp, n as ChevronDown } from "../_libs/lucide-react.mjs";
const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
const ICONS = {
  Sun,
  Award,
  BatteryFull,
  ShieldCheck,
  Zap,
  Droplet,
  Wrench,
  Leaf,
  Truck,
  Lock,
  Star,
  CheckCircle2: CircleCheck
};
function useCountdown() {
  const getTarget = () => {
    const t = /* @__PURE__ */ new Date();
    t.setHours(23, 59, 59, 999);
    return t.getTime();
  };
  const [target, setTarget] = reactExports.useState(getTarget);
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= target) setTarget(getTarget());
    }, 1e3);
    return () => clearInterval(id);
  }, [target]);
  const diff = Math.max(0, target - now);
  return {
    h: String(Math.floor(diff / 36e5)).padStart(2, "0"),
    m: String(Math.floor(diff % 36e5 / 6e4)).padStart(2, "0"),
    s: String(Math.floor(diff % 6e4 / 1e3)).padStart(2, "0")
  };
}
function FlipCell({ v, l }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-[50px] flex-col items-center rounded-lg bg-slate-900 px-2.5 py-1 text-white border border-white/10 sm:min-w-[64px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black tabular-nums sm:text-2xl text-emerald-400", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-bold uppercase tracking-widest text-slate-400", children: l })
  ] });
}
function CountdownPill({ tone = "dark" }) {
  const { h, m, s } = useCountdown();
  const wrap = tone === "danger" ? "border-rose-500/25 bg-rose-500/10 text-rose-300" : "border-slate-800 bg-slate-900/50 text-slate-300";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 sm:px-4 ${wrap}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider sm:text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-emerald-400 animate-pulse" }),
      " Offer ends in:"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlipCell, { v: h, l: "HR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlipCell, { v: m, l: "MIN" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlipCell, { v: s, l: "SEC" })
    ] })
  ] });
}
function StickyCTA({ phone, whatsapp, ctaText }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur lg:hidden p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-md items-center gap-2", children: [
    whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/${whatsapp}`, onClick: () => trackMetaEvent("Contact", { method: "WhatsApp Sticky CTA" }), target: "_blank", rel: "noopener noreferrer", className: "flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }) }),
    phone && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${phone}`, onClick: () => trackMetaEvent("Contact", { method: "Phone Sticky CTA" }), className: "flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: "Sticky CTA" }), className: "lit-cta flex h-12 flex-1 items-center justify-center rounded-xl px-4 text-sm font-black tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-150", children: ctaText })
  ] }) });
}
function VideoPlayer({ url, poster }) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let embedUrl = url;
    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: embedUrl, className: "absolute inset-0 h-full w-full border-0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("video", { controls: true, preload: "metadata", playsInline: true, poster, className: "w-full aspect-video rounded-3xl object-cover shadow-2xl border border-white/10 bg-black", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: url, type: "video/mp4" }),
    "Your browser does not support the video tag."
  ] });
}
function FAQAccordionItem({ faq, isOpen, onToggle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-slate-800 bg-slate-900/40 backdrop-blur rounded-2xl overflow-hidden transition-all duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggle, className: "w-full flex items-center justify-between p-5 text-left font-bold text-slate-200 hover:text-white transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: faq.question }),
      isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-5 w-5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 text-slate-500" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 border-t border-slate-800" : "max-h-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-5 text-sm text-slate-400 leading-relaxed bg-slate-950/20", children: faq.answer }) })
  ] });
}
function ProductSalesFunnel({
  product,
  specs,
  features,
  packages,
  settings,
  reviews,
  faqs,
  images
}) {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const phone = settings?.phone ?? "";
  const whatsapp = settings?.whatsapp ?? "";
  const email = settings?.email ?? "";
  const tagline = product.tagline || "Pay On Delivery Nationwide";
  product.hero_headline || "Light Your Whole Compound — Without NEPA.";
  const heroSubheadline = product.hero_subheadline || "Die-cast aluminium · 25,000mAh · 5-Year Warranty · Pay On Delivery";
  const stockStatus = product.stock_status || "Only 14 units left at promo price";
  const heroCtaText = product.hero_cta_text || "✅ Order Now — Pay On Delivery";
  const heroList = reactExports.useMemo(() => {
    if (product.hero_description) {
      return product.hero_description.split("\n").filter(Boolean);
    }
    return [
      "Die-cast aluminium body",
      "25,000mAh lithium battery",
      "Dusk-to-dawn brightness",
      "5-Year warranty",
      "Pay on delivery nationwide"
    ];
  }, [product.hero_description]);
  const unitPrice = product.price ?? (packages[0] ? Math.round(packages[0].price / packages[0].quantity) : 35e3);
  const regularPrice = product.discount_price ?? Math.round(unitPrice / 0.7);
  const combinedSlides = reactExports.useMemo(() => {
    const list = [];
    if (product.hero_image_url) list.push({ url: product.hero_image_url, label: "HERO PRODUCT", type: "gallery" });
    if (product.packaging_image_url) list.push({ url: product.packaging_image_url, label: "PACKAGING", type: "gallery" });
    if (product.night_image_url) list.push({ url: product.night_image_url, label: "INSTALLED AT NIGHT", type: "installation" });
    if (product.specs_image_url) list.push({ url: product.specs_image_url, label: "SPECS SHOT", type: "gallery" });
    images.forEach((img) => {
      list.push({ url: img.url, label: img.alt || "Gallery Image", type: img.image_type || "gallery" });
    });
    return list;
  }, [product, images]);
  const filteredSlides = reactExports.useMemo(() => {
    if (activeTab === "all") return combinedSlides;
    return combinedSlides.filter((s) => s.type === activeTab);
  }, [combinedSlides, activeTab]);
  const finalReviews = reactExports.useMemo(() => {
    if (reviews && reviews.length > 0) return reviews;
    return [
      { id: "1", customer_name: "Mary Okonkwo", customer_location: "Lagos", rating: 5, review_text: "Excellent product. The brightness is amazing — covers my whole compound. Delivered next day, I paid on delivery. No wahala.", customer_photo_url: null, sort_order: 1, created_at: "" },
      { id: "2", customer_name: "John Eze", customer_location: "Enugu", rating: 5, review_text: "Like my own security guard at night. Even when it rained for 3 days straight, the light still came on. Quality is solid.", customer_photo_url: null, sort_order: 2, created_at: "" },
      { id: "3", customer_name: "Ubom Effiong", customer_location: "Calabar", rating: 5, review_text: "I was sceptical because of online scams. But they called me, delivered, I paid cash and inspected. Works perfectly.", customer_photo_url: null, sort_order: 3, created_at: "" }
    ];
  }, [reviews]);
  const finalFaqs = reactExports.useMemo(() => {
    if (faqs && faqs.length > 0) return faqs;
    return [
      { id: "1", product_id: product.id, question: "Does it charge on cloudy or rainy days?", answer: "Yes, the high-efficiency monocrystalline solar panel is designed to charge even in low light, harmattan haze, or cloudy/rainy weather. The battery store lasts up to 2-3 nights.", sort_order: 1, created_at: "" },
      { id: "2", product_id: product.id, question: "How long does the installation take?", answer: "It takes less than 10 minutes. There is no wiring required. Simply mount the solar light on a pole or wall using the included bracket and screws.", sort_order: 2, created_at: "" },
      { id: "3", product_id: product.id, question: "What does the 5-Year warranty cover?", answer: "The warranty covers any factory defect or complete failure of the solar panel, LEDs, or battery. We replace the light for free within the warranty period.", sort_order: 3, created_at: "" },
      { id: "4", product_id: product.id, question: "How do I pay?", answer: "We offer Pay On Delivery nationwide. You only pay when the delivery agent brings the product to your door, and you can inspect it first.", sort_order: 4, created_at: "" }
    ];
  }, [faqs, product.id]);
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const galleryBlock = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryCarousel, { slides: filteredSlides }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center rounded-xl bg-slate-900/60 p-1 border border-slate-800", children: [
      { id: "all", label: "All Photos" },
      { id: "gallery", label: "Product" },
      { id: "before_after", label: "Before/After" },
      { id: "installation", label: "Installation" }
    ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setActiveTab(tab.id),
        className: `rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition ${activeTab === tab.id ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black" : "text-slate-400 hover:text-white"}`,
        children: tab.label
      },
      tab.id
    )) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-slate-950 text-slate-100 pb-20 lg:pb-0 font-sans selection:bg-emerald-500 selection:text-slate-950", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white shadow-lg relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-[10px] font-black uppercase tracking-widest sm:text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2 w-2 rounded-full bg-white animate-ping" }),
      "🔥 SPECIAL OFFER: ",
      product.title.toUpperCase(),
      " — PAY ON DELIVERY + FREE NATIONWIDE SHIPPING"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-6 pb-12 sm:py-16 lg:py-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_1fr_0.9fr] lg:items-start lg:gap-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-emerald-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-400 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 fill-emerald-400" }),
            " DIRECT SALE DIRECT FUNNEL"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black uppercase tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent leading-tight sm:text-5xl lg:text-6xl drop-shadow-[0_2px_10px_rgba(16,185,129,0.25)]", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest text-emerald-400", children: tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-slate-300 leading-relaxed font-medium", children: heroSubheadline }),
          product.short_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 leading-relaxed font-medium", children: product.short_description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: galleryBlock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 pt-2", children: heroList.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-base text-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-none rounded-full bg-emerald-500/15 p-1 text-emerald-400 border border-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", strokeWidth: 3 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: item })
          ] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: "Hero Section" }), className: "lit-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4.5 text-base font-black text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-95 transition-all duration-150 sm:w-auto", children: heroCtaText }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: galleryBlock }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-2xl backdrop-blur relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 -top-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg", children: "Limited Stock Promo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "Discount Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/25", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-amber-400" }),
              " Selling Fast"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-slate-500 line-through", children: [
            "₦",
            regularPrice.toLocaleString(),
            "/unit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-black tracking-tight text-emerald-400 leading-none", children: [
            "₦",
            unitPrice.toLocaleString(),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-400", children: " / unit" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center uppercase tracking-wide", children: stockStatus }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2.5", children: packages.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 px-3 py-2.5 text-xs text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-emerald-400", children: [
              "₦",
              p.price.toLocaleString()
            ] })
          ] }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: "Pricing Card" }), className: "lit-cta flex items-center justify-center rounded-xl py-3 px-4 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 active:scale-[0.98] transition shadow-md shadow-emerald-500/10", children: "✅ Order Now — Pay On Delivery" }),
            whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${whatsapp}`, onClick: () => trackMetaEvent("Contact", { method: "WhatsApp Pricing Card" }), target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-black text-slate-300 hover:bg-slate-800 hover:text-white transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-emerald-400 fill-emerald-400/10" }),
              " Chat On WhatsApp"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-1.5 text-center text-[9px] font-black uppercase tracking-wider text-slate-400 border-t border-slate-800 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-slate-900/30 p-2 border border-slate-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mx-auto mb-1 h-4 w-4 text-emerald-400" }),
              "5-YR Wty"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-slate-900/30 p-2 border border-slate-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "mx-auto mb-1 h-4 w-4 text-emerald-400" }),
              "Free Ship"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-slate-900/30 p-2 border border-slate-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto mb-1 h-4 w-4 text-emerald-400" }),
              "Pay On Del"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownPill, { tone: "danger" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-300 font-bold border-t border-slate-800/60 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }),
            " 4.9 · 3,400+ Nigerian homes lit up"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-slate-900 bg-slate-950 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4", children: [
      { v: "3,400+", l: "Compounds Illuminated" },
      { v: "4.9 ★", l: "Verified Happy Buyers" },
      { v: "1–3 Days", l: "Fast Nationwide Shipping" },
      { v: "5 Years", l: "Ironclad Free Warranty" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center group p-3 bg-slate-900/10 border border-slate-900 rounded-2xl hover:border-emerald-500/20 hover:bg-slate-900/20 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black text-emerald-400 tracking-tight sm:text-4xl", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 sm:text-xs", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 bg-slate-950 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-10 top-1/2 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center space-y-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl", children: product.features_section_title || "Why This Model Wins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium", children: product.features_section_subtitle || "Built to fix every complaint about cheap solar lights." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: (features.length ? features : [
          { id: "1", title: "Always On — No Sensor", description: "Steady light all night. Perfect for areas that need real illumination, not motion guessing.", icon: "Sun" },
          { id: "2", title: "Die-Cast Aluminium Body", description: "Real metal — not cheap plastic. Survives sun, rain, harmattan and impact.", icon: "Award" },
          { id: "3", title: "25,000mAh Battery", description: "5× 5,000mAh 32650 lithium cells. All-night brightness, even after cloudy days.", icon: "BatteryFull" },
          { id: "4", title: "5-Year Warranty", description: "If it fails within 5 years — we replace it. Real protection, in writing.", icon: "ShieldCheck" }
        ]).map((f) => {
          const I = f.icon && ICONS[f.icon] || Sun;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-slate-850 bg-slate-900/30 p-6 shadow-xl transition-all duration-350 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white group-hover:text-emerald-400 transition", children: f.title }),
            f.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm text-slate-400 leading-relaxed font-medium", children: f.description })
          ] }, f.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CtaBar,
      {
        kicker: product.final_cta_headline || "GET YOURS TODAY — LIMITED STOCK",
        sub: product.final_cta_subheadline || "Over 380 units shipped this week. Don't miss the promo price.",
        label: product.final_cta_button_text || "Claim This Offer"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-slate-900/10 py-20 border-y border-slate-900 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-10 blur-xl group-hover:opacity-15 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlotImage, { src: product.packaging_image_url, label: "IMAGE 2 — PACKAGING", className: "aspect-square w-full rounded-3xl border border-slate-800 object-cover relative z-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl text-white", children: product.bills_section_title || "One Light. Zero Bills. Zero Stress." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-slate-400 leading-relaxed font-medium sm:text-lg", children: product.bills_section_description || "Charges by day. Lights your space all night. Automatic — no switch, no wiring, no electrician. Just mount it and forget NEPA forever." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 pt-2", children: (() => {
          const defaultItems = [
            "Compounds, gates, streets, farms, car parks, churches",
            "Waterproof (IP67) — works through the heaviest rainy season",
            "Installs in minutes — no wiring, no electrician needed",
            "Lights up automatically the moment the sun goes down"
          ];
          const items = product.bills_section_list ? product.bills_section_list.split("\n").filter(Boolean) : defaultItems;
          return items.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-200", children: t })
          ] }, idx));
        })() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: "Zero Bills Section" }), className: "lit-cta inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4.5 text-base font-black text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-95 transition", children: "✅ Yes — I Want Mine →" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-slate-950 py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-10 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center space-y-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl text-white", children: product.security_section_title || "Real Light. Real Security." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium", children: product.security_section_description || "See how your compound looks after dark — bright, safe, alive." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative", children: product.security_media_type === "video" && product.video_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { url: product.video_url, poster: product.night_image_url ?? void 0 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SlotImage, { src: product.night_image_url, label: "IMAGE 3 — INSTALLED AT NIGHT", dark: true, className: "aspect-[16/9] w-full rounded-3xl object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: "Real Security Section" }), className: "lit-cta inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4.5 text-base font-black text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-95 transition", children: "✅ Secure Your Compound Now →" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CtaBar,
      {
        kicker: "READY TO LIGHT UP YOUR COMPOUND?",
        sub: "Pay on delivery. Fast nationwide shipping. Limited stock at promo price.",
        label: product.hero_cta_text || "Order Now"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-slate-900/20 py-20 border-y border-slate-900 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center space-y-3 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl text-white", children: product.specs_section_title || "Full Specifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium", children: product.specs_section_subtitle || "The right parts. No shortcuts." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-2 lg:items-start max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlotImage, { src: product.specs_image_url, label: "IMAGE 4 — SPECS SHOT", className: "aspect-[5/4] w-full rounded-3xl border border-slate-800 object-cover shadow-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-left text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (specs.length ? specs : [
          { id: "a", label: "Material", value: "Die-cast Aluminium" },
          { id: "b", label: "Battery", value: "5× 5,000mAh 32650 Lithium (25,000mAh)" },
          { id: "c", label: "Light Source", value: "High-efficiency SMD LED" },
          { id: "d", label: "Mode", value: "Dusk-to-dawn · Always On" },
          { id: "e", label: "Charging", value: "Solar (built-in panel)" },
          { id: "f", label: "Install Height", value: "5 – 6m recommended" },
          { id: "g", label: "Warranty", value: "5 Years" }
        ]).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-900/60 last:border-0 hover:bg-slate-900/25 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "bg-slate-900/30 px-5 py-4 font-bold text-slate-300 border-r border-slate-900/40 w-1/3", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-slate-400 font-medium", children: s.value })
        ] }, s.id)) }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CtaBar,
      {
        kicker: "CHOOSE YOUR BUNDLE BELOW",
        sub: "Select your package, fill the form, and we call to confirm.",
        label: "Proceed to Order Form"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 bg-slate-950 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center space-y-3 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 fill-amber-400 text-amber-400" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl text-white", children: "4.9 / 5 Rating from Real Buyers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium", children: "Verified customer reviews from Nigerians who paid on delivery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: finalReviews.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-850 bg-slate-900/20 p-6 shadow-xl backdrop-blur relative hover:border-slate-800 transition duration-300 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-300 italic leading-relaxed font-medium", children: [
              '"',
              r.review_text,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5 border-t border-slate-900/80 pt-4 mt-6", children: [
            r.customer_photo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.customer_photo_url, alt: r.customer_name, className: "h-11 w-11 rounded-full object-cover border border-slate-800" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-sm font-black text-emerald-400 border border-slate-700", children: r.customer_name.split(" ").map((s) => s[0]).join("") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white text-sm", children: r.customer_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-emerald-500" }),
                " ",
                r.customer_location || "Nigeria",
                " · Verified Buyer"
              ] })
            ] })
          ] })
        ] }, r.id || idx)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CtaBar,
      {
        kicker: "LOVED BY 3,400+ NIGERIANS — SECURE YOURS",
        sub: "Order today and inspect the package before you pay cash.",
        label: "Order Now & Pay On Delivery"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-emerald-500/30 bg-slate-900/20 p-8 text-center shadow-2xl backdrop-blur relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-400 shadow-md", children: "Today's Promo Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-sm text-slate-500 line-through", children: [
          "Regular: ₦",
          regularPrice.toLocaleString(),
          "/unit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-5xl font-black text-emerald-400 tracking-tight sm:text-6xl", children: [
          "₦",
          unitPrice.toLocaleString(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-slate-300", children: "/unit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-black text-emerald-400 tracking-wider uppercase", children: "+ FREE delivery anywhere in Nigeria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 border-t border-slate-800" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1 text-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-emerald-400" }),
          " Bulk Buyers Bonus Included"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-400 leading-relaxed font-medium", children: "Order 5+ units and get a FREE Rechargeable Bulb. Buy 10 pieces and get 2 FREE units." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownPill, { tone: "danger" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 overflow-hidden rounded-3xl border border-rose-500/20 bg-rose-950/10 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 py-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-white animate-bounce" }),
          " Please Read Before Ordering"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 p-5 sm:grid-cols-3 border-b border-rose-950/20", children: [
          { i: Flame, t: "HIGH DEMAND", s: "27 people ordered today" },
          { i: Package, t: "LIMITED STOCK", s: "Only 14 units left today" },
          { i: Truck, t: "FREE SHIPPING", s: "1–3 days delivery nationwide" }
        ].map((b, i) => {
          const Ic = b.i;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-2xl bg-rose-500/5 p-3.5 border border-rose-500/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ic, { className: "h-4.5 w-4.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-wider text-rose-300", children: b.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-rose-400/80 font-bold", children: b.s })
            ] })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 p-6 text-sm text-slate-400 leading-relaxed font-medium", children: [
          "Don't order if you can't receive the package within 1–3 working days.",
          "If you are traveling out of town, please do not order now (unless someone else collects for you).",
          "Ensure you are financially prepared before submitting the form. Save our contact details if you need more time.",
          "Provide a working phone number that is reachable. We will call you to verify your address.",
          "If a family member or third party will pay, please align with them BEFORE submitting."
        ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-rose-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t })
        ] }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mb-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3.5 text-center text-sm font-black text-emerald-400", children: "⚡ MINIMUM ORDER: 2 PIECES. Bulk buyers get free gifts and extra units." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-6 text-center text-[10px] font-black text-rose-400 uppercase tracking-widest animate-pulse", children: "⚠ ONLY SUBMIT THE ORDER FORM IF YOU ARE READY TO BUY NOW!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "order", className: "mt-12 scroll-mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderForm, { packages, whatsapp, email, phone }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-slate-900/10 py-20 border-y border-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl text-white", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium", children: "Have questions before buying? Find quick answers here." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: finalFaqs.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        FAQAccordionItem,
        {
          faq: f,
          isOpen: openFaq === f.id,
          onToggle: () => setOpenFaq(openFaq === f.id ? null : f.id)
        },
        f.id || idx
      )) })
    ] }) }),
    (phone || whatsapp) && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-slate-900/40 border-t border-slate-900 py-16 text-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-white", children: "Need Help Placing Your Order?" }),
      phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black tracking-wider text-emerald-400 sm:text-4xl", children: phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center", children: [
        whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${whatsapp}`, onClick: () => trackMetaEvent("Contact", { method: "WhatsApp Help Line" }), target: "_blank", rel: "noopener noreferrer", className: "lit-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 font-black text-slate-950 hover:brightness-110 shadow-lg sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
          " Chat On WhatsApp"
        ] }),
        phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${phone}`, onClick: () => trackMetaEvent("Contact", { method: "Phone Help Line" }), className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-8 py-4 font-black text-slate-300 hover:bg-slate-850 hover:text-white transition sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }),
          " Call ",
          phone
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-bold flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        settings?.store_name || "Store",
        " · All Rights Reserved"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", onClick: () => trackMetaEvent("ViewContent", { content_name: "Offers Footer Link" }), className: "text-emerald-400 hover:text-emerald-300 underline tracking-wider font-extrabold uppercase text-xs transition-colors", children: "View Offers" })
    ] }),
    (phone || whatsapp) && /* @__PURE__ */ jsxRuntimeExports.jsx(StickyCTA, { phone, whatsapp, ctaText: "✅ Place Order Now — Pay On Delivery" })
  ] });
}
function GalleryCarousel({ slides }) {
  const [i, setI] = reactExports.useState(0);
  const total = slides.length;
  const go = (d) => setI((x) => (x + d + total) % total);
  const curr = slides[i];
  reactExports.useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % total), 4e3);
    return () => window.clearInterval(id);
  }, [total]);
  if (!total) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 font-bold border border-slate-850", children: "No images uploaded" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-850 bg-slate-900/20 p-3.5 shadow-2xl backdrop-blur relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-3 top-3 z-10 rounded-lg bg-slate-950/70 border border-white/5 px-2.5 py-1 text-[10px] font-black tracking-widest text-slate-300", children: [
        i + 1,
        " / ",
        total
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SlotImage, { src: curr.url, label: curr.label, dark: true, className: "aspect-[4/3] w-full rounded-2xl object-cover hover:scale-105 transition duration-500" }),
      total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => go(-1), "aria-label": "Prev", className: "absolute left-2.5 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950/60 p-2 text-white hover:bg-slate-900 border border-white/5 shadow-md active:scale-90 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => go(1), "aria-label": "Next", className: "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950/60 p-2 text-white hover:bg-slate-900 border border-white/5 shadow-md active:scale-90 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-3 flex justify-center gap-1.5", children: slides.map((_, n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setI(n),
            "aria-label": `Slide ${n + 1}`,
            className: `h-1.5 rounded-full transition-all duration-200 ${n === i ? "w-6 bg-emerald-400" : "w-1.5 bg-slate-500/50"}`
          },
          n
        )) })
      ] })
    ] }),
    total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800", children: slides.map((s, n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setI(n),
        className: `aspect-square w-16 flex-none overflow-hidden rounded-xl border-2 transition ${n === i ? "border-emerald-400 scale-95" : "border-slate-800/80 hover:border-slate-700"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.url, alt: s.label, className: "h-full w-full object-cover" })
      },
      n
    )) })
  ] });
}
function SlotImage({ src, label, className = "", dark = false }) {
  if (src) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: label, className: `${className} shadow-lg` });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className} flex items-center justify-center text-center ${dark ? "bg-slate-900 text-emerald-400" : "bg-slate-900 text-slate-400"} border border-slate-800 px-6 text-base font-black tracking-widest shadow-lg uppercase`, children: label });
}
function CtaBar({ kicker, sub, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-4 py-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 rounded-3xl border border-emerald-500/15 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:flex-row sm:justify-between sm:p-8 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black uppercase tracking-wider text-emerald-400", children: kicker }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 font-medium leading-relaxed", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#order", onClick: () => trackMetaEvent("InitiateCheckout", { position: `CTA Bar: ${kicker}` }), className: "lit-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 text-sm font-black text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/25 active:scale-95 transition sm:w-auto", children: [
      label,
      " →"
    ] })
  ] }) });
}
function OrderForm({ packages, whatsapp, email, phone }) {
  const [form, setForm] = reactExports.useState({ name: "", phone: "", altPhone: "", address: "", state: "", pkg: "" });
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [checkoutInitiated, setCheckoutInitiated] = reactExports.useState(false);
  const handleFormFocus = () => {
    if (!checkoutInitiated) {
      setCheckoutInitiated(true);
      trackMetaEvent("InitiateCheckout", {
        content_category: "Solar Light Form"
      });
    }
  };
  const update = (k) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
    if (k === "pkg") {
      const p = packages.find((pkg) => pkg.id === val);
      if (p) {
        trackMetaEvent("AddToCart", {
          content_name: p.title,
          value: p.price,
          currency: "NGN",
          content_ids: [p.package_code ?? p.id],
          content_type: "product"
        });
      }
    }
  };
  const selectedPkg = reactExports.useMemo(() => packages.find((p) => p.id === form.pkg) || null, [packages, form.pkg]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.state || !form.pkg) {
      setError("Please fill all required fields marked *");
      return;
    }
    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[0-9+\s-]{7,20}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!selectedPkg) {
      setError("Please select a package.");
      return;
    }
    if (selectedPkg.quantity < 2) {
      setError("Minimum order is 2 pieces.");
      return;
    }
    setSubmitting(true);
    try {
      const { error: dbErr } = await db.from("orders").insert({
        customer_name: form.name.trim(),
        phone: form.phone.trim(),
        alt_phone: form.altPhone.trim() || null,
        address: form.address.trim(),
        state: form.state,
        package_id: selectedPkg.package_code,
        package_label: selectedPkg.bonus_text ? `${selectedPkg.title} + ${selectedPkg.bonus_text}` : selectedPkg.title,
        quantity: selectedPkg.quantity,
        total_amount: selectedPkg.price
      });
      if (dbErr) throw dbErr;
      const lines = [
        "NEW ORDER",
        "",
        `Name: ${form.name.trim()}`,
        `Phone: ${form.phone.trim()}`,
        `Alt Phone: ${form.altPhone.trim() || "—"}`,
        `Address: ${form.address.trim()}`,
        `State: ${form.state}`,
        `Package: ${selectedPkg.title}${selectedPkg.bonus_text ? ` + ${selectedPkg.bonus_text}` : ""}`,
        `Qty: ${selectedPkg.quantity}`,
        `Total: ₦${selectedPkg.price.toLocaleString()}`
      ].join("\n");
      if (email) {
        try {
          await notifyNewOrder({ data: { to: email, subject: `NEW ORDER — ${form.name.trim()}`, text: lines } });
        } catch {
        }
      }
      trackMetaEvent("Lead", {
        content_name: selectedPkg.title,
        value: selectedPkg.price,
        currency: "NGN"
      });
      trackMetaEvent("Purchase", {
        content_name: selectedPkg.title,
        value: selectedPkg.price,
        currency: "NGN",
        content_type: "product"
      });
      setSuccess(true);
      setForm({ name: "", phone: "", altPhone: "", address: "", state: "", pkg: "" });
      const whatsappMsg = [
        "Hello, I just placed an order on your store:",
        "",
        `*Name:* ${form.name.trim()}`,
        `*Phone:* ${form.phone.trim()}`,
        `*Alt Phone:* ${form.altPhone.trim() || "N/A"}`,
        `*Address:* ${form.address.trim()}`,
        `*State:* ${form.state}`,
        `*Package:* ${selectedPkg.title}${selectedPkg.bonus_text ? ` + ${selectedPkg.bonus_text}` : ""}`,
        `*Quantity:* ${selectedPkg.quantity}`,
        `*Total:* ₦${selectedPkg.price.toLocaleString()}`
      ].join("\n");
      const cleanWhatsapp = (whatsapp || phone || "2348037477275").replace(/[^0-9]/g, "");
      const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMsg)}`;
      if (typeof window !== "undefined") {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  const inputCls = "w-full rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-4 text-base outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder:text-slate-500";
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-emerald-500/30 bg-slate-900/25 p-8 text-center shadow-2xl sm:p-12 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-emerald-400", strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-2xl font-black text-white sm:text-3xl", children: "✅ Order Placed Successfully!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-slate-400 max-w-md mx-auto", children: "We've received your order and our representative will call you within 24 hours to confirm your delivery address. Thank you!" }),
      (whatsapp || phone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center", children: [
        whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${whatsapp}`, onClick: () => trackMetaEvent("Contact", { method: "WhatsApp Success View" }), target: "_blank", rel: "noopener noreferrer", className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-sm font-black text-slate-950 hover:brightness-110 shadow-lg sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
          " Chat On WhatsApp"
        ] }),
        phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${phone}`, onClick: () => trackMetaEvent("Contact", { method: "Phone Success View" }), className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-black text-slate-300 hover:bg-slate-850 hover:text-white transition sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }),
          " Call ",
          phone
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSuccess(false), className: "mt-6 text-xs text-slate-500 underline hover:text-slate-400 transition font-bold", children: "Place another order" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 rounded-3xl border border-slate-850 bg-slate-950/70 p-6 shadow-2xl sm:p-10 backdrop-blur relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-white sm:text-3xl", children: "Place Your Order Below 👇" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 font-medium", children: "Free shipping. Pay only when the delivery agent brings it to your door." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: update("name"), onFocus: handleFormFocus, placeholder: "Your Full Name *", className: inputCls }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.phone, onChange: update("phone"), onFocus: handleFormFocus, placeholder: "Your Active Phone Number *", className: inputCls }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.altPhone, onChange: update("altPhone"), onFocus: handleFormFocus, placeholder: "Alternative Phone Number (Optional)", className: inputCls }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: form.address, onChange: update("address"), onFocus: handleFormFocus, placeholder: "Full Delivery Address (Street name, area, house number) *", rows: 3, className: inputCls }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, value: form.state, onChange: update("state"), onFocus: handleFormFocus, className: inputCls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, className: "text-slate-700", children: "Select Your Delivery State *" }),
      STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-slate-950 text-slate-200", children: s }, s))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5", children: [
        "Select Your Bundle Deal * ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "(MINIMUM 2 PIECES)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40", children: packages.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-center justify-between border-b border-slate-900 px-4 py-4 hover:bg-slate-900/35 transition last:border-0 ${form.pkg === p.id ? "bg-emerald-500/5" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "pkg", value: p.id, checked: form.pkg === p.id, onChange: update("pkg"), className: "h-4.5 w-4.5 accent-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm text-slate-200", children: [
            p.title,
            p.bonus_text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-400", children: p.bonus_text })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-emerald-400 text-sm", children: [
          "₦",
          p.price.toLocaleString()
        ] })
      ] }, p.id)) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-red-400 border border-red-500/20 bg-red-500/5 p-3 rounded-xl text-center", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: submitting, className: "lit-cta w-full rounded-2xl py-4.5 text-base font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-emerald-500/25 disabled:opacity-60", children: submitting ? "Submitting Order..." : "✅ Confirm My Order Now" })
  ] });
}
export {
  ProductSalesFunnel as P
};
