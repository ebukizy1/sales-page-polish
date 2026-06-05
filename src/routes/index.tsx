import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db, type Product, type Spec, type Feature, type Package, type SiteSettings, type Review, type FAQ, type GalleryImage } from "@/lib/cms-types";
import ProductSalesFunnel from "@/components/ProductSalesFunnel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All-In-One Solar Street Light — Pay On Delivery Nationwide" },
      { name: "description", content: "Light your whole compound — without NEPA. 25,000mAh, 5-year warranty, pay on delivery anywhere in Nigeria." },
    ],
  }),
  component: Index,
});

type CmsData = {
  product: Product | null;
  specs: Spec[];
  features: Feature[];
  packages: Package[];
  settings: SiteSettings | null;
  reviews: Review[];
  faqs: FAQ[];
  images: GalleryImage[];
};

function Index() {
  const [data, setData] = useState<CmsData | null>(null);

  useEffect(() => {
    (async () => {
      // Get the featured active product
      const { data: products } = await db.from("products").select("*").eq("active", true).order("featured", { ascending: false }).limit(1);
      const product: Product | null = products?.[0] ?? null;
      const productId = product?.id;
      
      const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([
        productId ? db.from("product_specifications").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_features").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order") : Promise.resolve({ data: [] }),
        db.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        productId ? db.from("product_reviews").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_faqs").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
        productId ? db.from("product_images").select("*").eq("product_id", productId).order("sort_order") : Promise.resolve({ data: [] }),
      ]);

      setData({
        product,
        specs: specsRes.data ?? [],
        features: featRes.data ?? [],
        packages: pkgRes.data ?? [],
        settings: setRes.data ?? null,
        reviews: revRes.data ?? [],
        faqs: faqRes.data ?? [],
        images: imgRes.data ?? [],
      });
    })();
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
        Loading…
      </div>
    );
  }

  const { product, specs, features, packages, settings, reviews, faqs, images } = data;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200">
        <div className="space-y-4">
          <h1 className="text-2xl font-black uppercase tracking-wider text-emerald-400">No active product configured</h1>
          <p className="text-sm text-slate-400">Add a product from the admin dashboard to initialize the funnel.</p>
          <a href="/admin" className="inline-block rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 font-black text-slate-950 hover:brightness-110 shadow-lg">Go to Admin →</a>
        </div>
      </div>
    );
  }

  return (
    <ProductSalesFunnel
      product={product}
      specs={specs}
      features={features}
      packages={packages}
      settings={settings}
      reviews={reviews}
      faqs={faqs}
      images={images}
    />
  );
}
