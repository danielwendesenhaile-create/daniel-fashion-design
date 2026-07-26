import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const COLLECTION_IMAGES_BUCKET = "collection-images";

export function collectionImagePublicUrl(storagePath) {
  return supabase.storage.from(COLLECTION_IMAGES_BUCKET).getPublicUrl(storagePath)
    .data.publicUrl;
}
