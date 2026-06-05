import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db, type Product, type Spec, type Feature, type Package, type SiteSettings, type Review, type FAQ, type GalleryImage } from "@/lib/cms-types";
import ProductSalesFunnel from "@/components/ProductSalesFunnel";

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

  useEffect(() => {
    (async () => {
      try {
        // Fetch the product by slug
        const { data: productData, error: prodErr } = await db
          .from("products")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (prodErr) throw prodErr;
        if (!productData) {
          setError(`Product not found with slug: ${slug}`);
          return;
        }

        const product = productData as Product;
        const productId = product.id;

        const [specsRes, featRes, pkgRes, setRes, revRes, faqRes, imgRes] = await Promise.all([
          db.from("product_specifications").select("*").eq("product_id", productId).order("sort_order"),
          db.from("product_features").select("*").eq("product_id", productId).order("sort_order"),
          db.from("packages").select("*").eq("product_id", productId).eq("active", true).order("sort_order"),
          db.from("site_settings").select("*").eq("id", 1).maybeSingle(),
          db.from("product_reviews").select("*").eq("product_id", productId).order("sort_order"),
          db.from("product_faqs").select("*").eq("product_id", productId).order("sort_order"),
          db.from("product_images").select("*").eq("product_id", productId).order("sort_order"),
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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load product.");
      }
    })();
  }, [slug]);

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
