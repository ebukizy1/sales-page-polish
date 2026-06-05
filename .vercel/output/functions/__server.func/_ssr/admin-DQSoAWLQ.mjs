import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-C3PSvQqo.mjs";
import { d as db } from "./cms-types-DUiZVPkm.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/iceberg-js.mjs";
function AdminPage() {
  const [session, setSession] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("orders");
  const [msg, setMsg] = reactExports.useState("");
  reactExports.useEffect(() => {
    const {
      data: sub
    } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({
      data
    }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);
  reactExports.useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle().then(({
      data
    }) => setIsAdmin(!!data));
  }, [session]);
  const claimAdmin = async () => {
    setMsg("");
    const {
      data,
      error
    } = await supabase.rpc("claim_first_admin");
    if (error) {
      setMsg(error.message);
      return;
    }
    if (data === true) {
      setIsAdmin(true);
      setMsg("You are now admin.");
    } else setMsg("An admin already exists.");
  };
  if (!session) return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthForm, {});
  if (isAdmin === null) return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: "Checking permissions…" });
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Not an admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
        "Signed in as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: session.user.email }),
        ". Claim admin if no admin exists yet."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: claimAdmin, className: "mt-5 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground", children: "Claim Admin (First-Time Setup)" }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-destructive", children: msg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => supabase.auth.signOut(), className: "mt-4 block w-full text-xs underline", children: "Sign out" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Admin Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold capitalize", children: tab })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/offers", className: "underline", children: "Offers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => supabase.auth.signOut(), className: "rounded-lg border px-3 py-1.5 font-semibold", children: "Sign out" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 overflow-x-auto", children: ["orders", "products", "offers", "settings"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-bold capitalize ${tab === t ? "bg-background border border-b-0 border-border text-primary" : "text-muted-foreground hover:text-foreground"}`, children: t }, t)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-8", children: [
      tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTab, {}),
      tab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsTab, {}),
      tab === "offers" && /* @__PURE__ */ jsxRuntimeExports.jsx(OffersTab, {}),
      tab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, {})
    ] })
  ] });
}
const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "new", "called", "dispatched"];
function OrdersTab() {
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(() => {
    setLoading(true);
    supabase.from("orders").select("*").order("created_at", {
      ascending: false
    }).limit(500).then(({
      data
    }) => {
      setOrders(data ?? []);
      setLoading(false);
    });
  }, []);
  reactExports.useEffect(load, [load]);
  const updateStatus = async (id, status) => {
    await supabase.from("orders").update({
      status
    }).eq("id", id);
    setOrders((o) => o.map((x) => x.id === id ? {
      ...x,
      status
    } : x));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        orders.length,
        " total"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: load, className: "text-xs underline", children: "Refresh" })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading…" }),
    !loading && orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No orders yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Date", "Customer", "Phone", "State", "Address", "Package", "Qty", "Total", "Status"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-bold", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-semibold", children: o.customer_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-primary underline", href: `tel:${o.phone}`, children: o.phone }),
          o.alt_phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.alt_phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: o.state }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 max-w-[220px] text-xs", children: o.address }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs", children: o.package_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: o.quantity }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3 font-extrabold text-primary", children: [
          "₦",
          o.total_amount.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => updateStatus(o.id, e.target.value), className: "rounded border border-border bg-background px-2 py-1 text-xs", children: ORDER_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) })
      ] }, o.id)) })
    ] }) })
  ] });
}
function ProductsTab() {
  const [products, setProducts] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    const {
      data
    } = await db.from("products").select("*").order("created_at", {
      ascending: false
    });
    setProducts(data ?? []);
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  if (selected) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductEditor, { product: selected, onClose: () => {
    setSelected(null);
    load();
  } });
  const createNew = async () => {
    const slug = `product-${Date.now()}`;
    const {
      data,
      error
    } = await db.from("products").insert({
      slug,
      title: "New Product",
      active: false
    }).select().single();
    if (error) {
      alert(error.message);
      return;
    }
    setSelected(data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        products.length,
        " products"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createNew, className: "rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground", children: "+ New Product" })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(p), className: "overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl", children: [
      p.hero_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.hero_image_url, alt: p.title, className: "aspect-video w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold", children: p.title }),
          p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground", children: "Featured" }),
          !p.active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground", children: "Inactive" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "/",
          p.slug
        ] })
      ] })
    ] }, p.id)) })
  ] });
}
function ProductEditor({
  product,
  onClose
}) {
  const [p, setP] = reactExports.useState(product);
  const [specs, setSpecs] = reactExports.useState([]);
  const [features, setFeatures] = reactExports.useState([]);
  const [gallery, setGallery] = reactExports.useState([]);
  const [packages, setPackages] = reactExports.useState([]);
  const [reviews, setReviews] = reactExports.useState([]);
  const [faqs, setFaqs] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(false);
  const loadAll = reactExports.useCallback(async () => {
    const [s, f, g, k, r, aq] = await Promise.all([db.from("product_specifications").select("*").eq("product_id", p.id).order("sort_order"), db.from("product_features").select("*").eq("product_id", p.id).order("sort_order"), db.from("product_images").select("*").eq("product_id", p.id).order("sort_order"), db.from("packages").select("*").eq("product_id", p.id).order("sort_order"), db.from("product_reviews").select("*").eq("product_id", p.id).order("sort_order"), db.from("product_faqs").select("*").eq("product_id", p.id).order("sort_order")]);
    setSpecs(s.data ?? []);
    setFeatures(f.data ?? []);
    setGallery(g.data ?? []);
    setPackages(k.data ?? []);
    setReviews(r.data ?? []);
    setFaqs(aq.data ?? []);
  }, [p.id]);
  reactExports.useEffect(() => {
    loadAll();
  }, [loadAll]);
  const set = (k, v) => setP((x) => ({
    ...x,
    [k]: v
  }));
  const save = async () => {
    setSaving(true);
    const unknownColumnRe = /Could not find the '([^']+)' column of 'products' in the schema cache/;
    const updateProductWithRetry = async (patch) => {
      const skipped2 = [];
      let nextPatch = {
        ...patch
      };
      let lastError = null;
      for (let attempt = 0; attempt < 30; attempt++) {
        const {
          error
        } = await db.from("products").update(nextPatch).eq("id", p.id);
        if (!error) return {
          skipped: skipped2,
          error: null
        };
        lastError = error;
        const match = unknownColumnRe.exec(String(error.message ?? ""));
        if (!match) return {
          skipped: skipped2,
          error
        };
        const col = match[1];
        if (!(col in nextPatch)) return {
          skipped: skipped2,
          error
        };
        delete nextPatch[col];
        skipped2.push(col);
        if (Object.keys(nextPatch).length === 0) return {
          skipped: skipped2,
          error
        };
      }
      return {
        skipped: skipped2,
        error: lastError
      };
    };
    const basicPatch = {
      slug: p.slug,
      title: p.title,
      short_description: p.short_description,
      long_description: p.long_description,
      hero_image_url: p.hero_image_url,
      video_url: p.video_url,
      warranty_text: p.warranty_text,
      delivery_text: p.delivery_text,
      active: p.active,
      featured: p.featured
    };
    const basicRes = await updateProductWithRetry(basicPatch);
    if (basicRes.error) {
      setSaving(false);
      alert(basicRes.error.message);
      return;
    }
    const dynamicPatch = {
      tagline: p.tagline,
      hero_headline: p.hero_headline,
      hero_subheadline: p.hero_subheadline,
      hero_description: p.hero_description,
      hero_cta_text: p.hero_cta_text,
      hero_cta_link: p.hero_cta_link,
      price: p.price ? Number(p.price) : null,
      discount_price: p.discount_price ? Number(p.discount_price) : null,
      stock_status: p.stock_status,
      features_section_title: p.features_section_title,
      features_section_subtitle: p.features_section_subtitle,
      bills_section_title: p.bills_section_title,
      bills_section_description: p.bills_section_description,
      bills_section_list: p.bills_section_list,
      security_section_title: p.security_section_title,
      security_section_description: p.security_section_description,
      security_media_type: p.security_media_type,
      specs_section_title: p.specs_section_title,
      specs_section_subtitle: p.specs_section_subtitle,
      packaging_image_url: p.packaging_image_url,
      night_image_url: p.night_image_url,
      specs_image_url: p.specs_image_url,
      final_cta_headline: p.final_cta_headline,
      final_cta_subheadline: p.final_cta_subheadline,
      final_cta_button_text: p.final_cta_button_text,
      final_cta_button_link: p.final_cta_button_link,
      final_cta_bg_image_url: p.final_cta_bg_image_url
    };
    const dynamicRes = await updateProductWithRetry(dynamicPatch);
    setSaving(false);
    if (dynamicRes.error) {
      const skipped2 = [...basicRes.skipped, ...dynamicRes.skipped];
      const skippedText = skipped2.length ? ` Skipped: ${skipped2.join(", ")}.` : "";
      alert(`Saved basic product fields, but some sales-page section fields could not be saved: ${dynamicRes.error.message}.${skippedText}`);
      return;
    }
    const skipped = [...basicRes.skipped, ...dynamicRes.skipped];
    if (skipped.length) {
      alert(`Saved. Some fields were skipped because your database is missing columns: ${skipped.join(", ")}`);
      return;
    }
    const offerUnknownColumnRe = /Could not find the '([^']+)' column of 'offers' in the schema cache/;
    const offerPayload = {
      title: p.title,
      description: p.short_description,
      price: packages?.[0]?.price ?? (p.price ? Number(p.price) : 0),
      original_price: p.discount_price ? Number(p.discount_price) : null,
      badge: "Offer",
      image_url: p.hero_image_url,
      product_slug: p.slug,
      active: true
    };
    const {
      data: existingOffer,
      error: findOfferError
    } = await db.from("offers").select("id").eq("product_slug", p.slug).maybeSingle();
    if (findOfferError) {
      const m = offerUnknownColumnRe.exec(String(findOfferError.message ?? ""));
      if (!m) alert(`Saved product, but could not sync offer card: ${findOfferError.message}`);
    } else {
      if (existingOffer?.id) {
        const {
          error: offerUpdateError
        } = await db.from("offers").update(offerPayload).eq("id", existingOffer.id);
        if (offerUpdateError) {
          const m = offerUnknownColumnRe.exec(String(offerUpdateError.message ?? ""));
          if (!m) alert(`Saved product, but could not sync offer card: ${offerUpdateError.message}`);
        }
      } else {
        const {
          error: offerInsertError
        } = await db.from("offers").insert({
          ...offerPayload,
          sort_order: 9999
        });
        if (offerInsertError) {
          const m = offerUnknownColumnRe.exec(String(offerInsertError.message ?? ""));
          if (!m) alert(`Saved product, but could not create offer card: ${offerInsertError.message}`);
        }
      }
    }
    alert("Saved");
  };
  const remove = async () => {
    if (!confirm("Delete this product and all its specs/features/images/packages?")) return;
    await db.from("products").delete().eq("id", p.id);
    onClose();
  };
  const uploadTo = async (slot, file) => {
    const path = `${p.id}/${slot}-${Date.now()}-${file.name}`;
    const {
      error
    } = await supabase.storage.from("products").upload(path, file, {
      upsert: true
    });
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data
    } = supabase.storage.from("products").getPublicUrl(path);
    set(slot, data.publicUrl);
  };
  const uploadSecurityVideo = async (file) => {
    const path = `${p.id}/security-video-${Date.now()}-${file.name}`;
    const {
      error
    } = await supabase.storage.from("products").upload(path, file, {
      upsert: true,
      contentType: file.type
    });
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data
    } = supabase.storage.from("products").getPublicUrl(path);
    set("video_url", data.publicUrl);
    set("security_media_type", "video");
  };
  const imageSlots = [{
    key: "hero_image_url",
    label: "1. Hero / Product Image",
    hint: "Main product shot — shown first in the hero gallery."
  }, {
    key: "specs_image_url",
    label: "2. Specifications Image",
    hint: "Spec/diagram shot — shown beside the spec table."
  }, {
    key: "packaging_image_url",
    label: "3. Packaging Image",
    hint: "Box / unboxing shot — shown in the 'Zero Bills' section."
  }, {
    key: "night_image_url",
    label: "4. Installed-At-Night Image / Media",
    hint: "Night / installed shot — shown in the 'Real Light' section."
  }, {
    key: "final_cta_bg_image_url",
    label: "5. Final CTA Background Image",
    hint: "Background image for the final call-to-action section."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-sm underline", children: "← Back to products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: remove, className: "rounded-xl border border-destructive px-4 py-2 text-sm font-bold text-destructive", children: "Delete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: saving, className: "rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60", children: saving ? "Saving…" : "Save Product" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Basic Info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.title, onChange: (e) => set("title", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.slug, onChange: (e) => set("slug", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Short Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.short_description ?? "", onChange: (e) => set("short_description", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Long Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: inputCls, value: p.long_description ?? "", onChange: (e) => set("long_description", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Warranty Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.warranty_text ?? "", onChange: (e) => set("warranty_text", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Delivery Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.delivery_text ?? "", onChange: (e) => set("delivery_text", e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: p.active, onChange: (e) => set("active", e.target.checked) }),
          " Active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: p.featured, onChange: (e) => set("featured", e.target.checked) }),
          " Featured"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "SECTION 1: HERO SECTION COPY & PRICING", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Product Tagline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.tagline ?? "", onChange: (e) => set("tagline", e.target.value), placeholder: "e.g. Pay On Delivery Nationwide" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hero Headline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.hero_headline ?? "", onChange: (e) => set("hero_headline", e.target.value), placeholder: "e.g. Light Your Whole Compound — Without NEPA." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hero Subheadline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.hero_subheadline ?? "", onChange: (e) => set("hero_subheadline", e.target.value), placeholder: "e.g. Die-cast aluminium · 25,000mAh · 5-Year Warranty" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hero Description (Bullet points, one per line)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: inputCls, value: p.hero_description ?? "", onChange: (e) => set("hero_description", e.target.value), placeholder: "Die-cast aluminium body\n25,000mAh lithium battery" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Regular Price (Discount Price)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: inputCls, value: p.discount_price ?? "", onChange: (e) => set("discount_price", e.target.value ? Number(e.target.value) : null), placeholder: "e.g. 50000" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Selling Price (Price)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: inputCls, value: p.price ?? "", onChange: (e) => set("price", e.target.value ? Number(e.target.value) : null), placeholder: "e.g. 35000" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stock Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.stock_status ?? "", onChange: (e) => set("stock_status", e.target.value), placeholder: "e.g. Only 14 units left at promo price" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CTA Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.hero_cta_text ?? "", onChange: (e) => set("hero_cta_text", e.target.value), placeholder: "e.g. Order Now" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CTA Button Link", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.hero_cta_link ?? "", onChange: (e) => set("hero_cta_link", e.target.value), placeholder: "e.g. #order" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "SECTION 2: WHY THIS MODEL SETTINGS", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.features_section_title ?? "", onChange: (e) => set("features_section_title", e.target.value), placeholder: "e.g. Why This Model Wins" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Subtitle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.features_section_subtitle ?? "", onChange: (e) => set("features_section_subtitle", e.target.value), placeholder: "e.g. Built to fix every complaint..." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "SECTION 3: ZERO BILLS SECTION SETTINGS", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.bills_section_title ?? "", onChange: (e) => set("bills_section_title", e.target.value), placeholder: "e.g. One Light. Zero Bills. Zero Stress." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: inputCls, value: p.bills_section_description ?? "", onChange: (e) => set("bills_section_description", e.target.value), placeholder: "Section copy..." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section List Items (one per line)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: inputCls, value: p.bills_section_list ?? "", onChange: (e) => set("bills_section_list", e.target.value), placeholder: "Compounds, gates, streets, farms, car parks, churches\nWaterproof (IP67) — works through the heaviest rainy season" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "SECTION 4: REAL SECURITY SECTION SETTINGS", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.security_section_title ?? "", onChange: (e) => set("security_section_title", e.target.value), placeholder: "e.g. Real Light. Real Security." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Media Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: p.security_media_type ?? "image", onChange: (e) => set("security_media_type", e.target.value), className: inputCls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "image", children: "Show Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "video", children: "Show Video" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Video URL (Youtube Embed or MP4)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.video_url ?? "", onChange: (e) => set("video_url", e.target.value), placeholder: "e.g. https://www.youtube.com/embed/..." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Upload Video (MP4)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "video/mp4,video/*", onChange: (e) => e.target.files?.[0] && uploadSecurityVideo(e.target.files[0]), className: "block w-full text-xs" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: inputCls, value: p.security_section_description ?? "", onChange: (e) => set("security_section_description", e.target.value), placeholder: "Section copy..." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "SECTION 5: SPECIFICATIONS SECTION SETTINGS", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.specs_section_title ?? "", onChange: (e) => set("specs_section_title", e.target.value), placeholder: "e.g. Full Specifications" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Subtitle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.specs_section_subtitle ?? "", onChange: (e) => set("specs_section_subtitle", e.target.value), placeholder: "e.g. The right parts. No shortcuts." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "SECTION 9: FINAL CTA SETTINGS", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CTA Headline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.final_cta_headline ?? "", onChange: (e) => set("final_cta_headline", e.target.value), placeholder: "e.g. GET YOURS TODAY — LIMITED STOCK" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CTA Subheadline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.final_cta_subheadline ?? "", onChange: (e) => set("final_cta_subheadline", e.target.value), placeholder: "e.g. Over 380 units shipped..." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.final_cta_button_text ?? "", onChange: (e) => set("final_cta_button_text", e.target.value), placeholder: "e.g. Claim This Offer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Button Link", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: p.final_cta_button_link ?? "", onChange: (e) => set("final_cta_button_link", e.target.value), placeholder: "e.g. #order" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Sales Page Section Images", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "One image per section, in the order they appear on the sales page. After uploading, click ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save Product" }),
        " at the top."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: imageSlots.map(({
        key,
        label,
        hint
      }) => {
        const url = p[key];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs text-muted-foreground", children: hint }),
          url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: label, className: "mb-2 aspect-video w-full rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex aspect-video w-full items-center justify-center rounded-lg bg-secondary text-xs text-muted-foreground", children: "No image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && uploadTo(key, e.target.files[0]), className: "block w-full text-xs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: `${inputCls} mt-2`, placeholder: "…or paste image URL", value: url ?? "", onChange: (e) => set(key, e.target.value) }),
          url && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set(key, null), className: "mt-2 text-xs text-destructive underline", children: "Remove" })
        ] }, key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SpecsSection, { productId: p.id, items: specs, reload: loadAll }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, { productId: p.id, items: features, reload: loadAll }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySection, { productId: p.id, items: gallery, reload: loadAll }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PackagesSection, { productId: p.id, items: packages, reload: loadAll }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, { productId: p.id, items: reviews, reload: loadAll }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaqsSection, { productId: p.id, items: faqs, reload: loadAll })
  ] });
}
function SpecsSection({
  productId,
  items,
  reload
}) {
  const add = async () => {
    await db.from("product_specifications").insert({
      product_id: productId,
      label: "New",
      value: "",
      sort_order: items.length
    });
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("product_specifications").update(patch).eq("id", id);
    reload();
  };
  const del = async (id) => {
    await db.from("product_specifications").delete().eq("id", id);
    reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Specifications", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "+ Add" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_2fr_auto_auto] gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: s.label, onBlur: (e) => e.target.value !== s.label && upd(s.id, {
      label: e.target.value
    }), className: inputCls, placeholder: "Label" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: s.value, onBlur: (e) => e.target.value !== s.value && upd(s.id, {
      value: e.target.value
    }), className: inputCls, placeholder: "Value" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: s.sort_order, onBlur: (e) => upd(s.id, {
      sort_order: Number(e.target.value)
    }), className: `${inputCls} w-20` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(s.id), className: "rounded-lg border border-destructive px-3 text-xs font-bold text-destructive", children: "Del" })
  ] }, s.id)) }) });
}
function FeaturesSection({
  productId,
  items,
  reload
}) {
  const add = async () => {
    await db.from("product_features").insert({
      product_id: productId,
      title: "New feature",
      sort_order: items.length
    });
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("product_features").update(patch).eq("id", id);
    reload();
  };
  const del = async (id) => {
    await db.from("product_features").delete().eq("id", id);
    reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Features", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "+ Add" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    items.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1fr_2fr_auto_auto_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: f.title, onBlur: (e) => upd(f.id, {
        title: e.target.value
      }), className: inputCls, placeholder: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: f.description ?? "", onBlur: (e) => upd(f.id, {
        description: e.target.value
      }), className: inputCls, placeholder: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: f.icon ?? "", onBlur: (e) => upd(f.id, {
        icon: e.target.value
      }), className: `${inputCls} w-32`, placeholder: "Icon (e.g. Sun)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: f.sort_order, onBlur: (e) => upd(f.id, {
        sort_order: Number(e.target.value)
      }), className: `${inputCls} w-20` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(f.id), className: "rounded-lg border border-destructive px-3 text-xs font-bold text-destructive", children: "Del" })
    ] }, f.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Icon names: Sun, Award, BatteryFull, ShieldCheck, Zap, Droplet, Wrench, Leaf, Truck, Lock, Star, CheckCircle2" })
  ] }) });
}
function GallerySection({
  productId,
  items,
  reload
}) {
  const upload = async (file, type) => {
    const path = `${productId}/gallery-${Date.now()}-${file.name}`;
    const {
      error
    } = await supabase.storage.from("products").upload(path, file);
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data
    } = supabase.storage.from("products").getPublicUrl(path);
    await db.from("product_images").insert({
      product_id: productId,
      url: data.publicUrl,
      sort_order: items.length,
      image_type: type
    });
    reload();
  };
  const del = async (id) => {
    await db.from("product_images").delete().eq("id", id);
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("product_images").update(patch).eq("id", id);
    reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Gallery", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: [
      "+ Gallery Image",
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0], "gallery") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white", children: [
      "+ Before/After",
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0], "before_after") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white", children: [
      "+ Installation",
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0], "installation") })
    ] })
  ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: items.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.url, alt: g.alt ?? "", className: "aspect-square w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-2 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: g.alt ?? "", onBlur: (e) => upd(g.id, {
        alt: e.target.value
      }), className: inputCls, placeholder: "Alt text" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: g.image_type ?? "gallery", onChange: (e) => upd(g.id, {
        image_type: e.target.value
      }), className: inputCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gallery", children: "Gallery Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "before_after", children: "Before / After Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "installation", children: "Installation Image" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: g.sort_order, onBlur: (e) => upd(g.id, {
          sort_order: Number(e.target.value)
        }), className: `${inputCls} w-20` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(g.id), className: "flex-1 rounded-lg border border-destructive px-3 py-1 text-xs font-bold text-destructive", children: "Delete" })
      ] })
    ] })
  ] }, g.id)) }) });
}
function PackagesSection({
  productId,
  items,
  reload
}) {
  const add = async () => {
    await db.from("packages").insert({
      product_id: productId,
      package_code: `pkg${Date.now()}`,
      title: "New Package",
      quantity: 1,
      price: 0,
      sort_order: items.length,
      active: true
    });
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("packages").update(patch).eq("id", id);
    reload();
  };
  const del = async (id) => {
    await db.from("packages").delete().eq("id", id);
    reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Packages", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "+ Add" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1fr_1fr_80px_120px_1fr_70px_auto_auto]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: k.package_code, onBlur: (e) => upd(k.id, {
      package_code: e.target.value
    }), className: inputCls, placeholder: "Code" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: k.title, onBlur: (e) => upd(k.id, {
      title: e.target.value
    }), className: inputCls, placeholder: "Title" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: k.quantity, onBlur: (e) => upd(k.id, {
      quantity: Number(e.target.value)
    }), className: inputCls, placeholder: "Qty" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: k.price, onBlur: (e) => upd(k.id, {
      price: Number(e.target.value)
    }), className: inputCls, placeholder: "Price ₦" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: k.bonus_text ?? "", onBlur: (e) => upd(k.id, {
      bonus_text: e.target.value
    }), className: inputCls, placeholder: "Bonus" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: k.sort_order, onBlur: (e) => upd(k.id, {
      sort_order: Number(e.target.value)
    }), className: inputCls, placeholder: "Order" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: k.active, onChange: (e) => upd(k.id, {
        active: e.target.checked
      }) }),
      " Active"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(k.id), className: "rounded-lg border border-destructive px-3 text-xs font-bold text-destructive", children: "Del" })
  ] }, k.id)) }) });
}
function ReviewsSection({
  productId,
  items,
  reload
}) {
  const add = async () => {
    await db.from("product_reviews").insert({
      product_id: productId,
      customer_name: "Customer Name",
      customer_location: "Lagos",
      rating: 5,
      review_text: "Great product...",
      sort_order: items.length
    });
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("product_reviews").update(patch).eq("id", id);
    reload();
  };
  const del = async (id) => {
    await db.from("product_reviews").delete().eq("id", id);
    reload();
  };
  const uploadPhoto = async (id, file) => {
    const path = `${productId}/review-${id}-${Date.now()}-${file.name}`;
    const {
      error
    } = await supabase.storage.from("products").upload(path, file, {
      upsert: true
    });
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data
    } = supabase.storage.from("products").getPublicUrl(path);
    await upd(id, {
      customer_photo_url: data.publicUrl
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Reviews", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "+ Add" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: items.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 bg-background space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: r.customer_name, onBlur: (e) => upd(r.id, {
        customer_name: e.target.value
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: r.customer_location ?? "", onBlur: (e) => upd(r.id, {
        customer_location: e.target.value
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rating", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 5, defaultValue: r.rating, onBlur: (e) => upd(r.id, {
        rating: Number(e.target.value)
      }), className: inputCls }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Review Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: r.review_text, onBlur: (e) => upd(r.id, {
      review_text: e.target.value
    }), className: inputCls, rows: 2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      r.customer_photo_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.customer_photo_url, alt: "", className: "h-10 w-10 rounded-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-lg border border-border px-3 py-1 text-xs font-bold bg-secondary hover:bg-secondary/80", children: [
        "Upload Photo",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadPhoto(r.id, e.target.files[0]) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: r.customer_photo_url ?? "", onBlur: (e) => upd(r.id, {
        customer_photo_url: e.target.value
      }), className: `${inputCls} flex-1`, placeholder: "or paste image URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: r.sort_order, onBlur: (e) => upd(r.id, {
        sort_order: Number(e.target.value)
      }), className: `${inputCls} w-20`, placeholder: "Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(r.id), className: "rounded-lg border border-destructive px-3 py-1 text-xs font-bold text-destructive", children: "Delete" })
    ] })
  ] }, r.id)) }) });
}
function FaqsSection({
  productId,
  items,
  reload
}) {
  const add = async () => {
    await db.from("product_faqs").insert({
      product_id: productId,
      question: "Question?",
      answer: "Answer...",
      sort_order: items.length
    });
    reload();
  };
  const upd = async (id, patch) => {
    await db.from("product_faqs").update(patch).eq("id", id);
    reload();
  };
  const del = async (id) => {
    await db.from("product_faqs").delete().eq("id", id);
    reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "FAQs", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "+ Add" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: items.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 bg-background space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Question", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: f.question, onBlur: (e) => upd(f.id, {
      question: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Answer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: f.answer, onBlur: (e) => upd(f.id, {
      answer: e.target.value
    }), className: inputCls, rows: 2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Order:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: f.sort_order, onBlur: (e) => upd(f.id, {
        sort_order: Number(e.target.value)
      }), className: `${inputCls} w-20` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(f.id), className: "rounded-lg border border-destructive px-3 py-1 text-xs font-bold text-destructive", children: "Del" })
    ] })
  ] }, f.id)) }) });
}
function OffersTab() {
  const [offers, setOffers] = reactExports.useState([]);
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    const {
      data
    } = await db.from("offers").select("*").order("sort_order");
    setOffers(data ?? []);
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await db.from("products").select("slug,title").order("created_at", {
        ascending: false
      }).limit(500);
      setProducts(data ?? []);
    })();
  }, []);
  const add = async () => {
    await db.from("offers").insert({
      title: "New Offer",
      price: 0,
      sort_order: offers.length,
      active: true
    });
    load();
  };
  const upd = async (id, patch) => {
    const {
      error
    } = await db.from("offers").update(patch).eq("id", id);
    if (error) alert(error.message);
    load();
  };
  const del = async (id) => {
    if (confirm("Delete offer?")) {
      await db.from("offers").delete().eq("id", id);
      load();
    }
  };
  const uploadImage = async (id, file) => {
    const path = `${id}/${Date.now()}-${file.name}`;
    const {
      error
    } = await supabase.storage.from("offers").upload(path, file, {
      upsert: true
    });
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data
    } = supabase.storage.from("offers").getPublicUrl(path);
    upd(id, {
      image_url: data.publicUrl
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        offers.length,
        " offers"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: add, className: "rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground", children: "+ New Offer" })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: o.title, onBlur: (e) => upd(o.id, {
          title: e.target.value
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: o.badge ?? "", onBlur: (e) => upd(o.id, {
          badge: e.target.value
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: o.description ?? "", onBlur: (e) => upd(o.id, {
          description: e.target.value
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price ₦", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: o.price, onBlur: (e) => upd(o.id, {
          price: Number(e.target.value)
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Original Price ₦", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: o.original_price ?? 0, onBlur: (e) => upd(o.id, {
          original_price: Number(e.target.value) || null
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sort Order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: o.sort_order, onBlur: (e) => upd(o.id, {
          sort_order: Number(e.target.value)
        }), className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sales Page Product", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { defaultValue: o.product_slug ?? "", onChange: (e) => upd(o.id, {
          product_slug: e.target.value || null
        }), className: inputCls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "(No sales page)" }),
          products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.slug, children: [
            p.title,
            " (/",
            p.slug,
            ")"
          ] }, p.slug))
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-3", children: [
        o.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: o.image_url, alt: "", className: "h-16 w-16 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-lg border border-border px-3 py-1.5 text-xs font-bold", children: [
          "Upload Image",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadImage(o.id, e.target.files[0]) })
        ] }),
        o.product_slug && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/product/${o.product_slug}#order`, target: "_blank", rel: "noreferrer", className: "text-xs font-bold underline", children: "Open Sales Page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: o.active, onChange: (e) => upd(o.id, {
            active: e.target.checked
          }) }),
          " Active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(o.id), className: "ml-auto rounded-lg border border-destructive px-3 py-1.5 text-xs font-bold text-destructive", children: "Delete" })
      ] })
    ] }, o.id)) })
  ] });
}
function SettingsTab() {
  const [s, setS] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    db.from("site_settings").select("*").eq("id", 1).maybeSingle().then(({
      data
    }) => setS(data ?? {
      id: 1,
      store_name: "",
      phone: "",
      whatsapp: "",
      email: "",
      delivery_text: "",
      warranty_text: "",
      facebook_url: "",
      instagram_url: "",
      tiktok_url: ""
    }));
  }, []);
  if (!s) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading…" });
  const set = (k, v) => setS((x) => x ? {
    ...x,
    [k]: v
  } : x);
  const save = async () => {
    setSaving(true);
    const {
      error
    } = await db.from("site_settings").upsert({
      ...s,
      id: 1,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    setSaving(false);
    if (error) alert(error.message);
    else alert("Saved");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Store Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.store_name ?? "", onChange: (e) => set("store_name", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.phone ?? "", onChange: (e) => set("phone", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (e.g. 2348012345678)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.whatsapp ?? "", onChange: (e) => set("whatsapp", e.target.value) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.email ?? "", onChange: (e) => set("email", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Delivery Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.delivery_text ?? "", onChange: (e) => set("delivery_text", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Warranty Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.warranty_text ?? "", onChange: (e) => set("warranty_text", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Facebook URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.facebook_url ?? "", onChange: (e) => set("facebook_url", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.instagram_url ?? "", onChange: (e) => set("instagram_url", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "TikTok URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: s.tiktok_url ?? "", onChange: (e) => set("tiktok_url", e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: saving, className: "rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-60", children: saving ? "Saving…" : "Save Settings" })
  ] });
}
const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
function Section({
  title,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold", children: title }),
      action
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
  ] });
}
function Centered({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-6 text-foreground", children });
}
function AuthForm() {
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [err, setErr] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const fn = mode === "signin" ? supabase.auth.signInWithPassword({
      email,
      password
    }) : supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });
    const {
      error
    } = await fn;
    setBusy(false);
    if (error) setErr(error.message);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-7 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Admin Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "signin" ? "Sign in" : "Create your admin account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "w-full rounded-xl border border-border bg-background px-4 py-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password (min 6)", className: "w-full rounded-xl border border-border bg-background px-4 py-3" }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, className: "w-full rounded-xl bg-primary px-5 py-3 font-extrabold text-primary-foreground disabled:opacity-60", children: busy ? "…" : mode === "signin" ? "Sign In" : "Create Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "block w-full text-xs underline", children: mode === "signin" ? "First time? Create admin account" : "Have an account? Sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      "← ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline", children: "Back to store" })
    ] })
  ] }) });
}
export {
  AdminPage as component
};
