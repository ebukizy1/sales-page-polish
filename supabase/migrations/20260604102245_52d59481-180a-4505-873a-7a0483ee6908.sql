
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE SELECT ON public.orders FROM anon;

DROP POLICY IF EXISTS "Anyone can insert an order" ON public.orders;
CREATE POLICY "Anyone can insert an order"
  ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(customer_name) BETWEEN 2 AND 100
    AND length(phone) BETWEEN 7 AND 20
    AND length(address) BETWEEN 5 AND 250
    AND length(state) BETWEEN 2 AND 50
    AND quantity >= 2
    AND total_amount > 0
  );
