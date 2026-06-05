-- 20260605130000_dynamic_funnel.sql

-- 1. ALTER public.products to add Hero and Section settings
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS hero_headline TEXT,
  ADD COLUMN IF NOT EXISTS hero_subheadline TEXT,
  ADD COLUMN IF NOT EXISTS hero_description TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_text TEXT,
  ADD COLUMN IF NOT EXISTS hero_cta_link TEXT,
  ADD COLUMN IF NOT EXISTS price INTEGER,
  ADD COLUMN IF NOT EXISTS discount_price INTEGER,
  ADD COLUMN IF NOT EXISTS stock_status TEXT,
  ADD COLUMN IF NOT EXISTS features_section_title TEXT,
  ADD COLUMN IF NOT EXISTS features_section_subtitle TEXT,
  ADD COLUMN IF NOT EXISTS bills_section_title TEXT,
  ADD COLUMN IF NOT EXISTS bills_section_description TEXT,
  ADD COLUMN IF NOT EXISTS security_section_title TEXT,
  ADD COLUMN IF NOT EXISTS security_section_description TEXT,
  ADD COLUMN IF NOT EXISTS security_media_type TEXT DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS specs_section_title TEXT,
  ADD COLUMN IF NOT EXISTS specs_section_subtitle TEXT,
  ADD COLUMN IF NOT EXISTS bills_section_list TEXT,
  ADD COLUMN IF NOT EXISTS final_cta_headline TEXT,
  ADD COLUMN IF NOT EXISTS final_cta_subheadline TEXT,
  ADD COLUMN IF NOT EXISTS final_cta_button_text TEXT,
  ADD COLUMN IF NOT EXISTS final_cta_button_link TEXT,
  ADD COLUMN IF NOT EXISTS final_cta_bg_image_url TEXT;

-- 2. ALTER public.product_images to add image category type
ALTER TABLE public.product_images
  ADD COLUMN IF NOT EXISTS image_type TEXT DEFAULT 'gallery';

-- 3. CREATE public.product_reviews table
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  customer_photo_url TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  review_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_reviews TO authenticated;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone view reviews" ON public.product_reviews;
CREATE POLICY "Anyone view reviews" ON public.product_reviews
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage reviews" ON public.product_reviews;
CREATE POLICY "Admins manage reviews" ON public.product_reviews
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. CREATE public.product_faqs table
CREATE TABLE IF NOT EXISTS public.product_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_faqs TO authenticated;
GRANT ALL ON public.product_faqs TO service_role;

ALTER TABLE public.product_faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone view faqs" ON public.product_faqs;
CREATE POLICY "Anyone view faqs" ON public.product_faqs
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage faqs" ON public.product_faqs;
CREATE POLICY "Admins manage faqs" ON public.product_faqs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. SEED data for default solar-street-light product to populate new columns
UPDATE public.products
SET
  tagline = 'Pay On Delivery Nationwide',
  hero_headline = 'Light Your Whole Compound — Without NEPA.',
  hero_subheadline = 'Die-cast aluminium · 25,000mAh · 5-Year Warranty · Pay On Delivery',
  hero_description = 'Die-cast aluminium body\n25,000mAh lithium battery\nDusk-to-dawn brightness\n5-Year warranty\nPay on delivery nationwide',
  hero_cta_text = 'Order Now',
  hero_cta_link = '#order',
  price = 35000,
  discount_price = 50000,
  stock_status = 'Only 14 units left at promo price',
  features_section_title = 'Why This Model Wins',
  features_section_subtitle = 'Built to fix every complaint about cheap solar lights.',
  bills_section_title = 'One Light. Zero Bills. Zero Stress.',
  bills_section_description = 'Charges by day. Lights your space all night. Automatic — no switch, no wiring, no electrician. Just mount it and forget NEPA forever.',
  bills_section_list = 'Compounds, gates, streets, farms, car parks, churches' || chr(10) || 'Waterproof (IP67) — works through the heaviest rainy season' || chr(10) || 'Installs in minutes — no wiring, no electrician needed' || chr(10) || 'Lights up automatically the moment the sun goes down',
  security_section_title = 'Real Light. Real Security.',
  security_section_description = 'See how your compound looks after dark — bright, safe, alive.',
  security_media_type = 'image',
  specs_section_title = 'Full Specifications',
  specs_section_subtitle = 'The right parts. No shortcuts.',
  final_cta_headline = 'GET YOURS TODAY — LIMITED STOCK',
  final_cta_subheadline = 'Over 380 units shipped this week. Don''t miss the promo price.',
  final_cta_button_text = 'Claim This Offer',
  final_cta_button_link = '#order'
WHERE slug = 'solar-street-light';

-- Seed default reviews for the default solar street light if they don't exist
INSERT INTO public.product_reviews (product_id, customer_name, customer_location, rating, review_text, sort_order)
SELECT id, name, location, rating, text, ord
FROM public.products, (VALUES
  ('Mary Okonkwo', 'Lagos', 5, 'Excellent product. The brightness is amazing — covers my whole compound. Delivered next day, I paid on delivery. No wahala.', 1),
  ('John Eze', 'Enugu', 5, 'Like my own security guard at night. Even when it rained for 3 days straight, the light still came on. Quality is solid.', 2),
  ('Ubom Effiong', 'Calabar', 5, 'I was sceptical because of online scams. But they called me, delivered, I paid cash and inspected. Works perfectly.', 3)
) AS r(name, location, rating, text, ord)
WHERE slug = 'solar-street-light'
ON CONFLICT DO NOTHING;

-- Seed default FAQs
INSERT INTO public.product_faqs (product_id, question, answer, sort_order)
SELECT id, q, a, ord
FROM public.products, (VALUES
  ('Does it charge on cloudy or rainy days?', 'Yes, the high-efficiency monocrystalline solar panel is designed to charge even in low light, harmattan haze, or cloudy/rainy weather. The battery store lasts up to 2-3 nights.', 1),
  ('How long does the installation take?', 'It takes less than 10 minutes. There is no wiring required. Simply mount the solar light on a pole or wall using the included bracket and screws.', 2),
  ('What does the 5-Year warranty cover?', 'The warranty covers any factory defect or complete failure of the solar panel, LEDs, or battery. We replace the light for free within the warranty period.', 3),
  ('How do I pay?', 'We offer Pay On Delivery nationwide. You only pay when the delivery agent brings the product to your door, and you can inspect it first.', 4)
) AS f(q, a, ord)
WHERE slug = 'solar-street-light'
ON CONFLICT DO NOTHING;
