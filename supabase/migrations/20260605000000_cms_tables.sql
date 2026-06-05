-- =============================================================
-- CMS tables: products, specs, features, images, packages, settings
-- + storage buckets for products & offers
-- =============================================================

-- PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  hero_image_url TEXT,
  video_url TEXT,
  warranty_text TEXT,
  delivery_text TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view active products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage products" ON public.products
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PRODUCT SPECIFICATIONS
CREATE TABLE public.product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_specifications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_specifications TO authenticated;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view specs" ON public.product_specifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage specs" ON public.product_specifications FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PRODUCT FEATURES
CREATE TABLE public.product_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_features TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_features TO authenticated;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view features" ON public.product_features FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage features" ON public.product_features FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PRODUCT IMAGES (gallery)
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view images" ON public.product_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage images" ON public.product_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PACKAGES
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  package_code TEXT NOT NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  bonus_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.packages TO authenticated;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view active packages" ON public.packages
  FOR SELECT TO anon, authenticated
  USING (active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- SITE SETTINGS (single-row)
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  store_name TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  delivery_text TEXT,
  warranty_text TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================================
-- SEED with current hardcoded content so site keeps working
-- =============================================================
INSERT INTO public.site_settings (id, store_name, phone, whatsapp, email, delivery_text, warranty_text)
VALUES (1, 'Online Lighten Store', '08037477275', '2348037477275', 'onlinelightenstore@gmail.com',
  'Free nationwide delivery · 1–3 working days', '5-Year Warranty')
ON CONFLICT (id) DO NOTHING;

WITH new_product AS (
  INSERT INTO public.products (slug, title, short_description, long_description, hero_image_url, warranty_text, delivery_text, active, featured)
  VALUES (
    'solar-street-light',
    'All-In-One Solar Street Light',
    'Die-cast aluminium · 25,000mAh · 5-Year Warranty · Pay On Delivery',
    'The brand-new All-In-One Solar Street Light — die-cast aluminium body, 25,000mAh battery, dusk-to-dawn brightness. Pay on delivery. Free nationwide shipping.',
    'https://placehold.co/1200x1000/0b1220/22c55e?text=HERO+PRODUCT',
    '5-Year Warranty',
    'Free nationwide delivery',
    true, true
  ) RETURNING id
)
INSERT INTO public.product_specifications (product_id, label, value, sort_order)
SELECT id, label, value, ord FROM new_product, (VALUES
  ('Material', 'Die-cast Aluminium', 1),
  ('Battery', '5× 5,000mAh 32650 Lithium (25,000mAh)', 2),
  ('Light Source', 'High-efficiency SMD LED', 3),
  ('Mode', 'Dusk-to-dawn · Always On', 4),
  ('Charging', 'Solar (built-in panel)', 5),
  ('Install Height', '5 – 6m recommended', 6),
  ('Warranty', '5 Years', 7)
) AS s(label, value, ord);

INSERT INTO public.product_features (product_id, title, description, icon, sort_order)
SELECT p.id, t, d, i, o FROM public.products p, (VALUES
  ('Always On — No Sensor', 'Steady light all night. Perfect for areas that need real illumination.', 'Sun', 1),
  ('Die-Cast Aluminium Body', 'Real metal — not cheap plastic. Survives sun, rain, harmattan and impact.', 'Award', 2),
  ('25,000mAh Battery', '5× 5,000mAh 32650 lithium cells. All-night brightness, even after cloudy days.', 'BatteryFull', 3),
  ('5-Year Warranty', 'If it fails within 5 years — we replace it. Real protection, in writing.', 'ShieldCheck', 4)
) AS f(t, d, i, o)
WHERE p.slug = 'solar-street-light';

INSERT INTO public.product_images (product_id, url, alt, sort_order)
SELECT p.id, url, alt, ord FROM public.products p, (VALUES
  ('https://placehold.co/900x900/0b1220/22c55e?text=PACKAGING', 'Packaging', 1),
  ('https://placehold.co/1400x800/0b1220/22c55e?text=INSTALLED+AT+NIGHT', 'Installed', 2),
  ('https://placehold.co/1200x700/0b1220/22c55e?text=SPECS+SHOT', 'Specs', 3)
) AS g(url, alt, ord)
WHERE p.slug = 'solar-street-light';

INSERT INTO public.packages (product_id, package_code, title, quantity, price, bonus_text, sort_order)
SELECT p.id, code, title, qty, price, bonus, ord FROM public.products p, (VALUES
  ('2pc',  '2 Pieces',  2,  70000,  NULL, 1),
  ('3pc',  '3 Pieces',  3,  105000, NULL, 2),
  ('4pc',  '4 Pieces',  4,  140000, NULL, 3),
  ('5pc',  '5 Pieces',  5,  175000, 'FREE Rechargeable Bulb', 4),
  ('6pc',  '6 Pieces',  6,  210000, 'FREE Rechargeable Bulb', 5),
  ('7pc',  '7 Pieces',  7,  245000, 'FREE Rechargeable Bulb', 6),
  ('8pc',  '8 Pieces',  8,  280000, 'FREE Rechargeable Bulb', 7),
  ('10pc', '10 Pieces', 10, 350000, '2 FREE Units (Bulk Bonus)', 8)
) AS k(code, title, qty, price, bonus, ord)
WHERE p.slug = 'solar-street-light';

-- =============================================================
-- STORAGE BUCKETS
-- =============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('offers', 'offers', true)
ON CONFLICT (id) DO NOTHING;

-- Public read; admin write
CREATE POLICY "Public read products bucket" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('products', 'offers'));
CREATE POLICY "Admins upload to products bucket" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('products', 'offers') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products bucket" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('products', 'offers') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete from products bucket" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('products', 'offers') AND public.has_role(auth.uid(), 'admin'));

-- Update orders status enum-like (broaden allowed statuses)
-- Already free-form text; no schema change needed.
