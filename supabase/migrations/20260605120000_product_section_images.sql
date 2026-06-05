-- Add structured section-image slots to products for the sales page
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS packaging_image_url TEXT,
  ADD COLUMN IF NOT EXISTS night_image_url TEXT,
  ADD COLUMN IF NOT EXISTS specs_image_url TEXT;
