// Local types for CMS tables not yet in generated Database type.
// Use via the `db` helper which casts the supabase client to bypass typing.
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export type Product = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  long_description: string | null;
  hero_image_url: string | null;
  video_url: string | null;
  warranty_text: string | null;
  delivery_text: string | null;
  active: boolean;
  featured: boolean;
  created_at: string;
};

export type Spec = { id: string; product_id: string; label: string; value: string; sort_order: number };
export type Feature = { id: string; product_id: string; title: string; description: string | null; icon: string | null; sort_order: number };
export type GalleryImage = { id: string; product_id: string; url: string; alt: string | null; sort_order: number };
export type Package = {
  id: string;
  product_id: string | null;
  package_code: string;
  title: string;
  quantity: number;
  price: number;
  bonus_text: string | null;
  sort_order: number;
  active: boolean;
};
export type SiteSettings = {
  id: number;
  store_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  delivery_text: string | null;
  warranty_text: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
};
export type Offer = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  badge: string | null;
  image_url: string | null;
  sort_order: number;
  active: boolean;
};
