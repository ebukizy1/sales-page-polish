-- Grant execute permission on has_role to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;

-- Update SELECT policies for products, packages and offers to not call has_role for anonymous/public queries
-- 1. products
DROP POLICY IF EXISTS "Anyone view active products" ON public.products;
CREATE POLICY "Anyone view active products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- 2. packages
DROP POLICY IF EXISTS "Anyone view active packages" ON public.packages;
CREATE POLICY "Anyone view active packages" ON public.packages
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- 3. offers
DROP POLICY IF EXISTS "Anyone view active offers" ON public.offers;
CREATE POLICY "Anyone view active offers" ON public.offers
  FOR SELECT TO anon, authenticated
  USING (active = true);
