import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLandingPageData } from "@/lib/api/example.functions";
import ProductSalesFunnel from "@/components/ProductSalesFunnel";
import type { Product, Spec, Feature, Package, SiteSettings, Review, FAQ, GalleryImage } from "@/lib/cms-types";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getLandingPageData();
        setData(res);
      } catch (err) {
        console.error("Failed to load landing page data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
        Loading…
      </div>
    );
  }

  if (!data || !data.product) {
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

  const { product, specs, features, packages, settings, reviews, faqs, images } = data;

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
