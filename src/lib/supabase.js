import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const IMAGES_BUCKET = "collection-images";

/**
 * Rows store either a storage path (uploaded file) or a full external URL
 * (pasted link). This resolves either form to a displayable src.
 */
export function resolveImageUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return supabase.storage.from(IMAGES_BUCKET).getPublicUrl(value).data.publicUrl;
}
