import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tag, ArrowRight, Gift } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "All Offers — Solar Street Light Bundles | Online Lighten Store" },
      { name: "description", content: "All active solar street light bundles and discounts. Pay on delivery nationwide." },
    ],
  }),
  component: OffersPage,
});

type Offer = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  badge: string | null;
  image_url: string | null;
  sort_order: number;
};

function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("offers")
      .select("id, title, description, price, original_price, badge, image_url, sort_order")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setOffers((data as Offer[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-sm font-bold text-primary">← Back to Home</Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">All Active Offers</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-foreground">
            <Gift className="h-3.5 w-3.5" /> Limited-Time Bundles
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">All Our Active Offers</h1>
          <p className="mt-3 text-muted-foreground">Pick the bundle that fits your home or street. Pay on delivery.</p>
        </div>

        {loading && <p className="mt-12 text-center text-muted-foreground">Loading offers…</p>}

        {!loading && offers.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No offers available right now. Please check back soon.</p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {offers.map((o) => {
            const savings = o.original_price && o.original_price > o.price ? o.original_price - o.price : 0;
            return (
              <div key={o.id} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                {o.badge && (
                  <div className="bg-primary px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-primary-foreground">
                    {o.badge}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Tag className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold">{o.title}</h2>
                      {o.description && <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>}
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-3">
                    <p className="text-4xl font-extrabold text-primary">₦{o.price.toLocaleString()}</p>
                    {o.original_price && o.original_price > o.price && (
                      <p className="pb-1 text-sm text-muted-foreground line-through">₦{o.original_price.toLocaleString()}</p>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="mt-1 text-xs font-bold text-destructive">You save ₦{savings.toLocaleString()}</p>
                  )}

                  <Link
                    to="/"
                    hash="order"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground transition hover:-translate-y-0.5"
                  >
                    Order This Bundle <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}