import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { db, type Product, type Spec, type Feature, type GalleryImage, type Package, type SiteSettings, type Offer } from "@/lib/cms-types";
import {
  CheckCircle2, Phone, MessageCircle, ShieldCheck, BatteryFull, Sun, Award, Truck, Lock, Star,
  Zap, Droplet, Wrench, Leaf, type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solar Street Light — Pay On Delivery | Nationwide" },
      { name: "description", content: "Solar street light. Pay on delivery anywhere in Nigeria." },
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

function Countdown() {
  const getTarget = () => { const t = new Date(); t.setHours(23,59,59,999); return t.getTime(); };
  const [target, setTarget] = useState(getTarget);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => { const n = Date.now(); setNow(n); if (n >= target) setTarget(getTarget()); }, 1000);
    return () => clearInterval(id);
  }, [target]);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff/3.6e6), m = Math.floor((diff%3.6e6)/6e4), s = Math.floor((diff%6e4)/1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const Cell = ({v,l}:{v:string;l:string}) => (
    <div className="flex min-w-[64px] flex-col items-center rounded-lg bg-foreground/90 px-3 py-2 text-background sm:min-w-[78px]">
      <span className="text-2xl font-extrabold tabular-nums sm:text-3xl">{v}</span>
      <span className="text-[9px] font-semibold uppercase tracking-widest text-background/70">{l}</span>
    </div>
  );
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-3 py-2 sm:gap-3 sm:px-4">
      <span className="text-xs font-bold uppercase tracking-wider text-destructive sm:text-sm">⏰ Offer ends in</span>
      <div className="flex gap-1.5"><Cell v={pad(h)} l="H"/><Cell v={pad(m)} l="M"/><Cell v={pad(s)} l="S"/></div>
    </div>
  );
}

function StickyCTA({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2.5">
        <a href={`tel:${phone}`} className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border-2 border-foreground/15 bg-card">
          <Phone className="h-5 w-5"/>
        </a>
        <a href="#order" className="flex h-12 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
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
  gallery: GalleryImage[];
  packages: Package[];
  settings: SiteSettings | null;
  offers: Offer[];
};

function Index() {
  const [data, setData] = useState<CmsData | null>(null);

  useEffect(() => {
    (async () => {
      const { data: products } = await db.from("products").select("*").eq("active", true).order("featured", { ascending: false }).limit(1);
      const product: Product | null = products?.[0] ?? null;
      const productId = product?.id;
      const [specsRes, featRes, galRes, pkgRes, setRes, offRes] = await Promise.all([
        productId ? db.from("product_specifications").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_features").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_images").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order") : Promise.resolve({ data: [] }),
        db.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        db.from("offers").select("*").eq("active", true).order("sort_order").limit(4),
      ]);
      setData({
        product,
        specs: specsRes.data ?? [],
        features: featRes.data ?? [],
        gallery: galRes.data ?? [],
        packages: pkgRes.data ?? [],
        settings: setRes.data ?? null,
        offers: offRes.data ?? [],
      });
    })();
  }, []);

  if (!data) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  }

  const { product, specs, features, gallery, packages, settings, offers } = data;
  const phone = settings?.phone ?? "";
  const whatsapp = settings?.whatsapp ?? "";
  const heroImg = product?.hero_image_url ?? gallery[0]?.url ?? "https://placehold.co/1200x1000/0b1220/22c55e?text=PRODUCT";
  const unitPrice = packages[0] ? Math.round(packages[0].price / packages[0].quantity) : 0;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-6 text-center">
        <div>
          <h1 className="text-2xl font-extrabold">No active product configured</h1>
          <p className="mt-3 text-sm text-muted-foreground">Add a product from the admin dashboard.</p>
          <Link to="/admin" className="mt-5 inline-block rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">Go to admin →</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      <div className="bg-destructive text-destructive-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wider sm:text-xs">
          🔥 Today Only: Free Delivery Nationwide
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.18_0.04_245)] via-[oklch(0.14_0.04_245)] to-[oklch(0.1_0.03_245)] text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-foreground">
              ⚡ {product.featured ? "Featured" : "Limited Stock"}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {product.title}
            </h1>
            {product.short_description && (
              <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">{product.short_description}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { i: <ShieldCheck className="h-3.5 w-3.5" />, t: product.warranty_text || settings?.warranty_text || "Warranty" },
                { i: <Truck className="h-3.5 w-3.5" />,        t: product.delivery_text || settings?.delivery_text || "Free Delivery" },
                { i: <Lock className="h-3.5 w-3.5" />,         t: "Pay On Delivery" },
              ].map((p, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">{p.i} {p.t}</span>
              ))}
            </div>
            <div className="mt-6"><Countdown /></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#order" className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-base font-extrabold text-primary-foreground shadow-2xl shadow-primary/40 transition hover:-translate-y-0.5 sm:text-lg">
                ✅ Order Now — Pay On Delivery →
              </a>
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/10">
                  <MessageCircle className="h-5 w-5" /> Chat On WhatsApp
                </a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />
            <img src={heroImg} alt={product.title} className="relative w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10" />
            {unitPrice > 0 && (
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-accent px-4 py-3 text-accent-foreground shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wider">From</p>
                <p className="text-2xl font-extrabold leading-none">₦{unitPrice.toLocaleString()}<span className="text-xs font-semibold">/unit</span></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Why Buyers Love It</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const I = (f.icon && ICONS[f.icon]) || Sun;
              return (
                <div key={f.id} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <I className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold">{f.title}</h3>
                  {f.description && <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="bg-secondary/30 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Real Photos</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <img key={g.id} src={g.url} alt={g.alt || product.title} className="aspect-square w-full rounded-2xl object-cover shadow-md" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECS */}
      {specs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Full Specifications</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="bg-secondary/60 px-5 py-3 font-bold">{s.label}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* LONG DESCRIPTION */}
      {product.long_description && (
        <section className="mx-auto max-w-3xl px-4 py-10 text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{product.long_description}</p>
        </section>
      )}

      {/* OFFERS preview */}
      {offers.length > 0 && (
        <section className="bg-secondary/30 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Active Offers</h2>
              <p className="mt-2 text-muted-foreground">Bundles & discounts available right now.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map((o) => (
                <div key={o.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
                  {o.badge && <span className="mb-2 inline-block w-fit rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary">{o.badge}</span>}
                  <h3 className="text-base font-bold">{o.title}</h3>
                  {o.description && <p className="mt-1 text-xs text-muted-foreground">{o.description}</p>}
                  <p className="mt-3 text-2xl font-extrabold text-primary">₦{o.price.toLocaleString()}</p>
                  {o.original_price && <p className="text-xs text-muted-foreground line-through">₦{o.original_price.toLocaleString()}</p>}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/offers" className="text-sm font-bold text-primary underline">View all offers →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ORDER */}
      <section id="order" className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="rounded-3xl border-2 border-primary/40 bg-card p-7 text-center shadow-2xl sm:p-10">
          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">Today's Promo</span>
          {unitPrice > 0 && (
            <p className="mt-3 text-5xl font-extrabold text-primary sm:text-6xl">₦{unitPrice.toLocaleString()}<span className="text-xl">/unit</span></p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">+ FREE delivery anywhere in Nigeria</p>
          <div className="mt-6 flex justify-center"><Countdown /></div>
        </div>
        <OrderForm packages={packages} whatsapp={whatsapp} email={settings?.email || ""} />
      </section>

      {/* HELP */}
      {(phone || whatsapp) && (
        <section className="bg-foreground py-14 text-background sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Need Help? Call Us.</h2>
            {phone && <p className="mt-4 text-3xl font-extrabold tracking-wider sm:text-4xl">{phone}</p>}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-extrabold text-primary-foreground">
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
        <p className="mt-1 flex justify-center gap-4">
          <Link to="/offers" className="hover:text-foreground">View All Offers</Link>
          <Link to="/admin" className="hover:text-foreground">Admin</Link>
        </p>
      </footer>

      {phone && <StickyCTA phone={phone} />}
    </main>
  );
}

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

  const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  if (success) {
    return (
      <div className="mt-10 rounded-3xl border-2 border-primary/40 bg-card p-8 text-center shadow-2xl sm:p-12">
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
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Place Your Order Below 👇</h2>
      <input required value={form.name} onChange={update("name")} placeholder="Full Name *" className={inputCls} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required value={form.phone} onChange={update("phone")} placeholder="Phone Number *" className={inputCls} />
        <input value={form.altPhone} onChange={update("altPhone")} placeholder="Alt Phone (optional)" className={inputCls} />
      </div>
      <select required value={form.state} onChange={update("state")} className={inputCls}>
        <option value="">Select State *</option>
        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea required value={form.address} onChange={update("address")} placeholder="Full Delivery Address *" rows={3} className={inputCls} />
      <select required value={form.pkg} onChange={update("pkg")} className={inputCls}>
        <option value="">Select Package *</option>
        {packages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}{p.bonus_text ? ` + ${p.bonus_text}` : ""} — ₦{p.price.toLocaleString()}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button disabled={submitting} className="w-full rounded-xl bg-primary py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-60">
        {submitting ? "Submitting…" : "✅ Confirm Order — Pay On Delivery"}
      </button>
    </form>
  );
}
