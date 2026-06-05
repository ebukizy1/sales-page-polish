import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProductBySlugData } from "@/lib/api/example.functions";
import ProductSalesFunnel from "@/components/ProductSalesFunnel";
import type { Product, Spec, Feature, Package, SiteSettings, Review, FAQ, GalleryImage } from "@/lib/cms-types";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Solar Street Light - ${params.slug} | Online Lighten Store` },
      { name: "description", content: "Check out this custom solar street light bundle. Pay on delivery nationwide." },
    ],
  }),
  component: ProductSlugPage,
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

function ProductSlugPage() {
  const { slug } = Route.useParams();
  const [data, setData] = useState<CmsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductBySlugData({ data: { slug } });
        if (!res) {
          setError(`Product not found with slug: ${slug}`);
          return;
        }
        setData(res);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-slate-200">
        <div className="space-y-4">
          <h1 className="text-2xl font-black uppercase tracking-wider text-rose-500">Error</h1>
          <p className="text-sm text-slate-400">{error}</p>
          <a href="/" className="inline-block rounded-xl bg-slate-900 border border-slate-800 px-6 py-3 font-bold text-slate-300 hover:bg-slate-800">Go Home</a>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
        Loading…
      </div>
    );
  }

  return (
    <ProductSalesFunnel
      product={data.product!}
      specs={data.specs}
      features={data.features}
      packages={data.packages}
      settings={data.settings}
      reviews={data.reviews}
      faqs={data.faqs}
      images={data.images}
    />
  );
}
