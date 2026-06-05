-- Link offers to a sales-page product so offer cards can open the right funnel.
ALTER TABLE public.offers
  ADD COLUMN IF NOT EXISTS product_slug TEXT REFERENCES public.products(slug) ON UPDATE CASCADE ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS offers_product_slug_idx ON public.offers (product_slug);

