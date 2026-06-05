import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Spec, Feature, Package, SiteSettings, Review, FAQ, GalleryImage, Offer } from "@/lib/cms-types";

import { getServerConfig } from "../config.server";

// Example createServerFn. Server-side handler invoked from the client:
//   const result = await getGreeting({ data: { name: "Ada" } })
// The .handler body runs server-only — imports used only inside it (like
// .server.ts modules) are tree-shaken from the client bundle. Module-level
// code here still ships to the client; for truly server-only helpers, put
// them in a .server.ts file. Use this pattern instead of Supabase Edge
// Functions for server logic.

export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });

export const notifyNewOrder = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      to: z.string().email().optional(),
      subject: z.string().min(1),
      text: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = data.to || process.env.ORDER_NOTIFY_EMAIL_TO || undefined;

    if (!host || !port || !user || !pass || !from || !to) {
      return { sent: false };
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: data.subject,
      text: data.text,
    });

    return { sent: true };
  });

export const getLandingPageData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("featured", { ascending: false })
        .limit(1);

      const product = products?.[0] ?? null;
      if (!product) return { product: null };

      const productId = product.id;

      const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([
        supabase.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"),
        supabase.from("product_features").select("*").eq("product_id", productId).order("sort_order"),
        supabase.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"),
        supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"),
        supabase.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"),
        supabase.from("product_images").select("*").eq("product_id", productId).order("sort_order"),
      ]);

      return {
        product: product as Product,
        specs: (specsRes.data as Spec[]) ?? [],
        features: (featRes.data as Feature[]) ?? [],
        packages: (pkgRes.data as Package[]) ?? [],
        settings: (setRes.data as SiteSettings) ?? null,
        reviews: (revRes.data as Review[]) ?? [],
        faqs: (faqRes.data as FAQ[]) ?? [],
        images: (imgRes.data as GalleryImage[]) ?? [],
      };
    } catch (err: unknown) {
      console.error("Error in getLandingPageData server function:", err);
      return {
        error: err instanceof Error ? err.message : String(err),
        envKeys: Object.keys(process.env).filter(k => k.includes("SUPABASE") || k.includes("VITE")),
      };
    }
  });

export const getProductBySlugData = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { slug } = data;
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!product) return null;

    const productId = product.id;

    const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([
      supabase.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"),
      supabase.from("product_features").select("*").eq("product_id", productId).order("sort_order"),
      supabase.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"),
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"),
      supabase.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"),
      supabase.from("product_images").select("*").eq("product_id", productId).order("sort_order"),
    ]);

    return {
      product: product as Product,
      specs: (specsRes.data as Spec[]) ?? [],
      features: (featRes.data as Feature[]) ?? [],
      packages: (pkgRes.data as Package[]) ?? [],
      settings: (setRes.data as SiteSettings) ?? null,
      reviews: (revRes.data as Review[]) ?? [],
      faqs: (faqRes.data as FAQ[]) ?? [],
      images: (imgRes.data as GalleryImage[]) ?? [],
    };
  });

export const getOffersData = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: offers } = await supabase
      .from("offers")
      .select("id, title, description, price, original_price, badge, image_url, product_slug, sort_order")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    const nextOffers = (offers ?? []) as Offer[];

    const slugs = Array.from(
      new Set(nextOffers.map((o) => o.product_slug).filter((x): x is string => !!x)),
    );

    let productImages: Record<string, string> = {};
    if (slugs.length) {
      const { data: products } = await supabase.from("products").select("slug,hero_image_url").in("slug", slugs);
      (products as Array<{ slug: string; hero_image_url: string | null }> | null)?.forEach((p) => {
        if (p.hero_image_url) productImages[p.slug] = p.hero_image_url;
      });
    }

    return {
      offers: nextOffers,
      productImages,
    };
  });
