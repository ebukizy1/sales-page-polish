import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { db, type Product, type Spec, type Feature, type Package, type SiteSettings } from "@/lib/cms-types";
import {
  CheckCircle2, Phone, MessageCircle, ShieldCheck, BatteryFull, Sun, Award, Truck, Lock, Star,
  Zap, Droplet, Wrench, Leaf, Flame, Package as PackageIcon, AlertTriangle, Clock, ChevronLeft, ChevronRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All-In-One Solar Street Light — Pay On Delivery Nationwide" },
      { name: "description", content: "Light your whole compound — without NEPA. 25,000mAh, 5-year warranty, pay on delivery anywhere in Nigeria." },
    ],
  }),
  component: Index,
});

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna",
  "Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun",
  "Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const ICONS: Record<string, LucideIcon> = {
  Sun, Award, BatteryFull, ShieldCheck, Zap, Droplet, Wrench, Leaf, Truck, Lock, Star, CheckCircle2,
};

/* ---------- Countdown ---------- */
function useCountdown() {
  const getTarget = () => { const t = new Date(); t.setHours(23,59,59,999); return t.getTime(); };
  const [target, setTarget] = useState(getTarget);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => { const n = Date.now(); setNow(n); if (n >= target) setTarget(getTarget()); }, 1000);
    return () => clearInterval(id);
  }, [target]);
  const diff = Math.max(0, target - now);
  return {
    h: String(Math.floor(diff/3.6e6)).padStart(2,"0"),
    m: String(Math.floor((diff%3.6e6)/6e4)).padStart(2,"0"),
    s: String(Math.floor((diff%6e4)/1000)).padStart(2,"0"),
  };
}

function FlipCell({ v, l }: { v: string; l: string }) {
  return (
    <div className="flex min-w-[58px] flex-col items-center rounded-xl bg-foreground px-3 py-2 text-background sm:min-w-[72px]">
      <span className="text-2xl font-extrabold tabular-nums sm:text-3xl">{v}</span>
      <span className="text-[9px] font-semibold uppercase tracking-widest text-background/60">{l}</span>
    </div>
  );
}

function CountdownPill({ tone = "dark" }: { tone?: "dark" | "danger" }) {
  const { h, m, s } = useCountdown();
  const wrap = tone === "danger"
    ? "border-destructive/40 bg-destructive/10 text-destructive"
    : "border-white/15 bg-white/5 text-white";
  return (
    <div className={`inline-flex items-center gap-3 rounded-2xl border px-3 py-2 sm:px-4 ${wrap}`}>
      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
        <Clock className="h-4 w-4" /> Offer ends in
      </span>
      <div className="flex gap-1.5"><FlipCell v={h} l="H"/><FlipCell v={m} l="M"/><FlipCell v={s} l="S"/></div>
    </div>
  );
}

/* ---------- Sticky mobile CTA ---------- */
function StickyCTA({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2.5">
        {phone && (
          <a href={`tel:${phone}`} className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border-2 border-foreground/15 bg-card">
            <Phone className="h-5 w-5"/>
          </a>
        )}
        <a href="#order" className="lit-cta flex h-12 flex-1 items-center justify-center rounded-xl px-4 text-sm font-bold">
          ✅ Order Now — Pay On Delivery
        </a>
      </div>
    </div>
  );
}

type CmsData = {
  product: Product | null;
  specs: Spec[];
  features: Feature[];
  packages: Package[];
  settings: SiteSettings | null;
};

function Index() {
  const [data, setData] = useState<CmsData | null>(null);

  useEffect(() => {
    (async () => {
      const { data: products } = await db.from("products").select("*").eq("active", true).order("featured", { ascending: false }).limit(1);
      const product: Product | null = products?.[0] ?? null;
      const productId = product?.id;
      const [specsRes, featRes, pkgRes, setRes] = await Promise.all([
        productId ? db.from("product_specifications").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_features").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order") : Promise.resolve({ data: [] }),
        db.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      ]);
      setData({
        product,
        specs: specsRes.data ?? [],
        features: featRes.data ?? [],
        packages: pkgRes.data ?? [],
        settings: setRes.data ?? null,
      });
    })();
  }, []);

  if (!data) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  }

  const { product, specs, features, packages, settings } = data;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center text-foreground">
        <div>
          <h1 className="text-2xl font-extrabold">No active product configured</h1>
          <p className="mt-3 text-sm text-muted-foreground">Add a product from the admin dashboard.</p>
          <a href="/admin" className="mt-5 inline-block rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">Go to admin →</a>
        </div>
      </div>
    );
  }

  const phone = settings?.phone ?? "";
  const whatsapp = settings?.whatsapp ?? "";
  const unitPrice = packages[0] ? Math.round(packages[0].price / packages[0].quantity) : 35000;
  const regularPrice = Math.round(unitPrice / 0.7); // 30% off shown

  const heroImg = product.hero_image_url;
  const packagingImg = product.packaging_image_url;
  const nightImg = product.night_image_url;
  const specsImg = product.specs_image_url;

  const gallerySlides: { url: string | null; label: string }[] = [
    { url: heroImg,      label: "IMAGE 1 — HERO PRODUCT" },
    { url: packagingImg, label: "IMAGE 2 — PACKAGING" },
    { url: nightImg,     label: "IMAGE 3 — INSTALLED AT NIGHT" },
    { url: specsImg,     label: "IMAGE 4 — SPECS SHOT" },
  ];

  return (
    <main className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      {/* Top promo strip */}
      <div className="bg-destructive text-destructive-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider sm:text-sm">
          🔥 {product.title.toUpperCase()} — PAY ON DELIVERY + FREE NATIONWIDE SHIPPING
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.16_0.05_155)] via-[oklch(0.1_0.03_220)] to-[oklch(0.08_0.02_260)] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[1fr_1.1fr_0.9fr] lg:items-start lg:gap-6 lg:py-16">
          {/* LEFT col: copy */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-500/30">
              <Zap className="h-3.5 w-3.5" /> 2026 Upgrade
            </span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-primary">
              {product.short_description ? "" : ""}{product.title.split(" ").slice(0,5).join(" ")}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              Light Your <br/> Whole Compound — <br/>
              <span className="text-white">Without NEPA.</span>
            </h1>
            <ul className="mt-6 space-y-2.5 text-base text-white/90">
              {[
                "Die-cast aluminium body",
                "25,000mAh lithium battery",
                "Dusk-to-dawn brightness",
                "5-Year warranty",
                "Pay on delivery nationwide",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><CheckCircle2 className="h-5 w-5 text-primary" />{t}</li>
              ))}
            </ul>
            <a href="#order" className="lit-cta mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-extrabold sm:w-auto sm:text-lg">
              ✅ Order Now →
            </a>
          </div>

          {/* MIDDLE col: image gallery */}
          <Gallery slides={gallerySlides} />

          {/* RIGHT col: price card */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-destructive-foreground">30% OFF Today</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400"><Flame className="h-3.5 w-3.5"/>Hot</span>
            </div>
            <p className="mt-3 text-sm text-white/50 line-through">₦{regularPrice.toLocaleString()}/unit</p>
            <p className="text-4xl font-extrabold leading-none text-primary sm:text-5xl">₦{unitPrice.toLocaleString()}<span className="text-base text-white">/unit</span></p>
            <p className="mt-1 text-xs font-bold text-amber-400">+ FREE delivery nationwide</p>

            <div className="mt-4 space-y-2">
              {packages.slice(0,3).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm">
                  <span className="font-semibold">{p.title}</span>
                  <span className="font-extrabold text-primary">₦{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <a href="#order" className="lit-cta mt-4 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold">
              ✅ Order Now — Pay On Delivery
            </a>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> Chat On WhatsApp
              </a>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-wider text-white/70">
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2"><ShieldCheck className="mx-auto mb-1 h-4 w-4 text-primary"/>5-YR</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2"><Truck className="mx-auto mb-1 h-4 w-4 text-primary"/>Free Ship</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2"><Lock className="mx-auto mb-1 h-4 w-4 text-primary"/>Pay On Delivery</div>
            </div>

            <div className="mt-4"><CountdownPill tone="danger"/></div>

            <div className="mt-4 flex items-center justify-center gap-1 text-xs text-white/80">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 · 3,400+ Nigerian homes lit up
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4">
          {[
            { v: "3,400+", l: "Homes Lit Up" },
            { v: "4.9 ★", l: "Customer Rating" },
            { v: "1–3 Days", l: "Nationwide Delivery" },
            { v: "5 Years", l: "Real Warranty" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">{s.v}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:text-xs">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAIN STORY */}
      <section className="bg-[oklch(0.98_0.02_90)] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Tired Of This Story?</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            NEPA brings light for 2 hours, takes it for 22. Generator gulps your salary in fuel.
            Your compound is dark, thieves are bold, kids can't move at night.
            You've tried cheap solar lights from market — they died in 3 months.
          </p>
          <p className="mt-6 text-xl font-extrabold sm:text-2xl">
            We built this light to <span className="text-primary">end all of that — permanently.</span>
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Why This Model Wins</h2>
            <p className="mt-2 text-muted-foreground">Built to fix every complaint about cheap solar lights.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(features.length ? features : [
              { id: "1", title: "Always On — No Sensor", description: "Steady light all night. Perfect for areas that need real illumination, not motion guessing.", icon: "Sun" },
              { id: "2", title: "Die-Cast Aluminium Body", description: "Real metal — not cheap plastic. Survives sun, rain, harmattan and impact.", icon: "Award" },
              { id: "3", title: "25,000mAh Battery", description: "5× 5,000mAh 32650 lithium cells. All-night brightness, even after cloudy days.", icon: "BatteryFull" },
              { id: "4", title: "5-Year Warranty", description: "If it fails within 5 years — we replace it. Real protection, in writing.", icon: "ShieldCheck" },
            ] as Feature[]).map((f) => {
              const I = (f.icon && ICONS[f.icon]) || Sun;
              return (
                <div key={f.id} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <I className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold">{f.title}</h3>
                  {f.description && <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLAIM BAR */}
      <CtaBar
        kicker="GET YOURS TODAY — LIMITED STOCK"
        sub="Over 380 units shipped this week. Don't miss the promo price."
        label="Claim This Offer"
      />

      {/* PACKAGING / ZERO BILLS */}
      <section className="bg-[oklch(0.98_0.02_90)] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <SlotImage src={packagingImg} label="IMAGE 2 — PACKAGING" className="aspect-square w-full rounded-3xl" />
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">One Light. Zero Bills. Zero Stress.</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Charges by day. Lights your space all night. Automatic — no switch, no wiring, no electrician.
              Just mount it and forget NEPA forever.
            </p>
            <ul className="mt-6 space-y-3 text-base">
              {[
                "Compounds, gates, streets, farms, car parks, churches",
                "Waterproof — works through the rainy season",
                "Installs in minutes — no wiring, no electrician needed",
                "Lights up automatically the moment the sun goes down",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary"/>{t}</li>
              ))}
            </ul>
            <a href="#order" className="lit-cta mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-extrabold">
              ✅ Yes — I Want Mine →
            </a>
          </div>
        </div>
      </section>

      {/* NIGHT SHOT */}
      <section className="bg-[oklch(0.08_0.02_240)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Real Light. Real Security.</h2>
            <p className="mt-2 text-white/60">See how your compound looks after dark — bright, safe, alive.</p>
          </div>
          <SlotImage src={nightImg} label="IMAGE 3 — INSTALLED AT NIGHT" dark className="mt-10 aspect-[16/9] w-full rounded-3xl" />
          <div className="mt-10 text-center">
            <a href="#order" className="lit-cta inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-extrabold">
              ✅ Secure Your Order →
            </a>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="bg-[oklch(0.98_0.02_90)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Full Specifications</h2>
            <p className="mt-2 text-muted-foreground">The right parts. No shortcuts.</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
            <SlotImage src={specsImg} label="IMAGE 4 — SPECS SHOT" className="aspect-[5/4] w-full rounded-3xl" />
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <tbody>
                  {(specs.length ? specs : [
                    { id:"a", label:"Material", value:"Die-cast Aluminium" },
                    { id:"b", label:"Battery", value:"5× 5,000mAh 32650 Lithium (25,000mAh)" },
                    { id:"c", label:"Light Source", value:"High-efficiency SMD LED" },
                    { id:"d", label:"Mode", value:"Dusk-to-dawn · Always On" },
                    { id:"e", label:"Charging", value:"Solar (built-in panel)" },
                    { id:"f", label:"Install Height", value:"5 – 6m recommended" },
                    { id:"g", label:"Warranty", value:"5 Years" },
                  ] as Spec[]).map((s) => (
                    <tr key={s.id} className="border-b border-border last:border-0">
                      <td className="bg-secondary/60 px-5 py-3.5 font-bold">{s.label}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400"/>)}
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">4.9 / 5 From Real Buyers</h2>
            <p className="mt-2 text-muted-foreground">Verified reviews from Nigerians who paid on delivery.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { n:"Mary Okonkwo", c:"Lagos", t:"Excellent product. The brightness is amazing — covers my whole compound. Delivered next day, I paid on delivery. No wahala." },
              { n:"John Eze",     c:"Enugu", t:"Like my own security guard at night. Even when it rained for 3 days straight, the light still came on. Quality is solid." },
              { n:"Ubom Effiong", c:"Calabar", t:"I was sceptical because of online scams. But they called me, delivered, I paid cash and inspected. Works perfectly." },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">{r.n.split(" ").map(s=>s[0]).join("")}</div>
                  <div>
                    <p className="font-bold">{r.n}</p>
                    <p className="text-xs text-muted-foreground">{r.c} · Verified Buyer</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400"/>)}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">"{r.t}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBar
        kicker="LOVED BY 3,400+ CUSTOMERS — ORDER YOURS"
        sub="Verified reviews. Pay only when the product is in your hands."
        label="Claim This Offer"
      />

      {/* PROMO PRICE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border-2 border-primary/40 bg-card p-7 text-center shadow-2xl sm:p-10">
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">Today's Promo Price</span>
            <p className="mt-4 text-base text-muted-foreground line-through">Regular: ₦{regularPrice.toLocaleString()}/unit</p>
            <p className="mt-1 text-5xl font-extrabold text-primary sm:text-6xl">₦{unitPrice.toLocaleString()}<span className="text-xl text-foreground">/unit</span></p>
            <p className="mt-2 text-sm text-muted-foreground">+ FREE delivery anywhere in Nigeria</p>
            <div className="my-6 border-t border-border" />
            <p className="text-sm font-extrabold uppercase tracking-wider"><PackageIcon className="mr-1 inline h-4 w-4 text-primary" /> Bulk Buyers Bonus</p>
            <p className="mt-2 text-sm text-muted-foreground">Buy 5+ units, get a FREE rechargeable bulb. Buy 10, get 2 FREE units.</p>
            <div className="mt-6 flex justify-center"><CountdownPill tone="danger"/></div>
          </div>

          {/* PLEASE READ */}
          <div className="mt-10 overflow-hidden rounded-3xl border-2 border-destructive/40 bg-destructive/5">
            <div className="flex items-center justify-center gap-2 bg-destructive py-3 text-center text-sm font-extrabold uppercase tracking-wider text-destructive-foreground">
              <AlertTriangle className="h-4 w-4" /> Please Read Before You Order
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              {[
                { i: Flame, t:"HIGH DEMAND", s:"27 people ordered today" },
                { i: PackageIcon, t:"LIMITED STOCK", s:"Only 14 units left at promo price" },
                { i: Truck, t:"DELIVERY AVAILABLE", s:"1–3 days nationwide" },
              ].map((b, i) => {
                const Ic = b.i;
                return (
                  <div key={i} className="flex items-start gap-3 rounded-xl bg-destructive/10 p-3">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-destructive/20 text-destructive"><Ic className="h-4 w-4"/></div>
                    <div><p className="text-xs font-extrabold uppercase tracking-wider text-destructive">{b.t}</p><p className="text-xs text-muted-foreground">{b.s}</p></div>
                  </div>
                );
              })}
            </div>
            <ul className="space-y-2.5 px-6 pb-5 text-sm">
              {[
                "Don't order if you can't receive the package within 1–3 working days.",
                "If you're traveling, don't order — unless someone will collect on your behalf.",
                "Don't order if you're not financially ready. Save our number, call when ready.",
                "Using someone else's phone number? Inform them before you place the order.",
                "If a family member will pay, tell them BEFORE you order.",
                "If you don't pick calls from unknown numbers — please don't order.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-destructive"/>{t}</li>
              ))}
            </ul>
            <div className="mx-6 mb-5 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-extrabold text-primary">
              MINIMUM ORDER: 2 PIECES. Bulk buyers get FREE bonus units.
            </div>
            <p className="px-6 pb-6 text-center text-sm font-extrabold text-destructive">
              ⚠ WARNING! Only fill the form if you are ready to buy NOW.
            </p>
          </div>

          {/* ORDER FORM */}
          <div id="order" className="mt-10">
            <OrderForm packages={packages} whatsapp={whatsapp} email={settings?.email || ""} />
          </div>
        </div>
      </section>

      {/* HELP */}
      {(phone || whatsapp) && (
        <section className="bg-foreground py-14 text-background sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Need Help? Call Us.</h2>
            {phone && <p className="mt-4 text-3xl font-extrabold tracking-wider sm:text-4xl">{phone}</p>}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="lit-cta inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-extrabold">
                  <MessageCircle className="h-5 w-5"/> WhatsApp Us
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-background/30 px-7 py-4 font-extrabold">
                  <Phone className="h-5 w-5"/> Call {phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-card py-7 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {settings?.store_name || "Store"} · All Rights Reserved</p>
      </footer>

      {phone && <StickyCTA phone={phone} />}
    </main>
  );
}

/* ---------- Gallery ---------- */
function Gallery({ slides }: { slides: { url: string | null; label: string }[] }) {
  const [i, setI] = useState(0);
  const total = slides.length;
  const go = (d: number) => setI((x) => (x + d + total) % total);
  const curr = slides[i];
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-3 shadow-2xl backdrop-blur">
      <div className="relative">
        <span className="absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white/80">{i+1} / {total}</span>
        <SlotImage src={curr.url} label={curr.label} dark className="aspect-[4/3] w-full rounded-2xl" />
        <button onClick={() => go(-1)} aria-label="Prev" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
          <ChevronLeft className="h-5 w-5"/>
        </button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
          <ChevronRight className="h-5 w-5"/>
        </button>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {slides.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Slide ${n+1}`}
              className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-2 bg-white/40"}`}/>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {slides.map((s, n) => (
          <button key={n} onClick={() => setI(n)}
            className={`aspect-square overflow-hidden rounded-xl border ${n === i ? "border-primary ring-2 ring-primary/40" : "border-white/10"}`}>
            {s.url ? <img src={s.url} alt={s.label} className="h-full w-full object-cover"/> :
              <div className="flex h-full w-full items-center justify-center bg-black/40 p-1 text-center text-[8px] font-bold text-primary">{s.label}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Slot image w/ placeholder ---------- */
function SlotImage({ src, label, className = "", dark = false }: { src: string | null; label: string; className?: string; dark?: boolean }) {
  if (src) return <img src={src} alt={label} className={`${className} object-cover shadow-xl`} />;
  return (
    <div className={`${className} flex items-center justify-center text-center ${dark ? "bg-[oklch(0.13_0.03_240)] text-primary" : "bg-[oklch(0.18_0.04_240)] text-primary"} px-6 text-xl font-extrabold tracking-wider shadow-xl sm:text-2xl`}>
      {label}
    </div>
  );
}

/* ---------- CTA bar ---------- */
function CtaBar({ kicker, sub, label }: { kicker: string; sub: string; label: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:flex-row sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wider text-primary">{kicker}</p>
          <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        </div>
        <a href="#order" className="lit-cta inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-extrabold">
          ✅ {label} →
        </a>
      </div>
    </section>
  );
}

/* ---------- Order form ---------- */
function OrderForm({ packages, whatsapp, email }: { packages: Package[]; whatsapp: string; email: string }) {
  const [form, setForm] = useState({ name: "", phone: "", altPhone: "", address: "", state: "", pkg: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const selectedPkg = useMemo(() => packages.find((p) => p.id === form.pkg) || null, [packages, form.pkg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.state || !form.pkg) {
      setError("Please fill all required fields marked *"); return;
    }
    if (form.name.trim().length < 2) { setError("Please enter your full name."); return; }
    if (!/^[0-9+\s-]{7,20}$/.test(form.phone.trim())) { setError("Please enter a valid phone number."); return; }
    if (!selectedPkg) { setError("Please select a package."); return; }
    if (selectedPkg.quantity < 2) { setError("Minimum order is 2 pieces."); return; }

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
        total_amount: selectedPkg.price,
      });
      if (dbErr) throw dbErr;

      if (whatsapp) {
        const lines = [
          "*🔥 NEW ORDER*", "",
          `*Name:* ${form.name.trim()}`,
          `*Phone:* ${form.phone.trim()}`,
          `*Alt Phone:* ${form.altPhone.trim() || "—"}`,
          `*Address:* ${form.address.trim()}`,
          `*State:* ${form.state}`,
          `*Package:* ${selectedPkg.title}${selectedPkg.bonus_text ? ` + ${selectedPkg.bonus_text}` : ""}`,
          `*Qty:* ${selectedPkg.quantity}`,
          `*Total:* ₦${selectedPkg.price.toLocaleString()}`,
          "", "I'm ready to pay on delivery.",
        ].join("\n");
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
        if (email) {
          const a = document.createElement("a");
          a.href = `mailto:${email}?subject=${encodeURIComponent(`NEW ORDER — ${form.name.trim()}`)}&body=${encodeURIComponent(lines.replace(/\*/g, ""))}`;
          try { a.click(); } catch { /* ignore */ }
        }
      }
      setSuccess(true);
      setForm({ name: "", phone: "", altPhone: "", address: "", state: "", pkg: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  if (success) {
    return (
      <div className="rounded-3xl border-2 border-primary/40 bg-card p-8 text-center shadow-2xl sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-primary sm:text-3xl">✅ Order Successful!</h3>
        <p className="mt-3 text-muted-foreground">We've received your order and will call to confirm shortly.</p>
        <button onClick={() => setSuccess(false)} className="mt-5 text-xs text-muted-foreground underline">Place another order</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-10">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Place Your Order Below 👇</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pay on delivery. Free shipping. We'll call you to confirm.</p>
      </div>
      <input required value={form.name} onChange={update("name")} placeholder="Your Full Name *" className={inputCls} />
      <input required value={form.phone} onChange={update("phone")} placeholder="Your Phone Number *" className={inputCls} />
      <input value={form.altPhone} onChange={update("altPhone")} placeholder="Alternative Phone Number (optional)" className={inputCls} />
      <textarea required value={form.address} onChange={update("address")} placeholder="Full Delivery Address *" rows={2} className={inputCls} />
      <select required value={form.state} onChange={update("state")} className={inputCls}>
        <option value="">Your Delivery State *</option>
        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-wider">Select Your Package * <span className="text-destructive">(MIN. 2 PIECES)</span></p>
        <div className="overflow-hidden rounded-xl border border-border">
          {packages.map((p) => (
            <label key={p.id} className={`flex cursor-pointer items-center justify-between border-b border-border px-4 py-3.5 last:border-0 hover:bg-secondary/50 ${form.pkg === p.id ? "bg-primary/10" : ""}`}>
              <span className="flex items-center gap-3">
                <input type="radio" name="pkg" value={p.id} checked={form.pkg === p.id} onChange={update("pkg")} className="h-4 w-4 accent-[color:var(--primary)]" />
                <span className="font-semibold">{p.title}{p.bonus_text ? ` + ${p.bonus_text}` : ""}</span>
              </span>
              <span className="font-extrabold text-primary">₦{p.price.toLocaleString()}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-sm font-bold text-destructive">{error}</p>}
      <button disabled={submitting} className="lit-cta w-full rounded-2xl py-4 text-base font-extrabold disabled:opacity-60">
        {submitting ? "Submitting…" : "✅ Place My Order Now →"}
      </button>
    </form>
  );
}
