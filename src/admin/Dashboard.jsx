import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Upload, LogOut } from "lucide-react";
import { supabase, collectionImagePublicUrl, COLLECTION_IMAGES_BUCKET } from "../lib/supabase";
import { COLLECTIONS } from "../data";

export default function Dashboard({ session }) {
  const [activeSlug, setActiveSlug] = useState(COLLECTIONS[0].id);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("collection_images")
      .select("id, storage_path, position, alt_text")
      .eq("collection_slug", activeSlug)
      .order("position", { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
      setImages([]);
    } else {
      setImages(data);
    }
    setLoading(false);
  }, [activeSlug]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");

    let nextPosition =
      images.length > 0 ? Math.max(...images.map((i) => i.position)) + 1 : 0;

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${activeSlug}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(COLLECTION_IMAGES_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      const { error: insertError } = await supabase.from("collection_images").insert({
        collection_slug: activeSlug,
        storage_path: path,
        position: nextPosition,
      });

      if (insertError) setError(insertError.message);
      nextPosition += 1;
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadImages();
  };

  const handleDelete = async (image) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    await supabase.storage.from(COLLECTION_IMAGES_BUCKET).remove([image.storage_path]);
    await supabase.from("collection_images").delete().eq("id", image.id);
    loadImages();
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const current = images[index];
    const target = images[targetIndex];

    await Promise.all([
      supabase
        .from("collection_images")
        .update({ position: target.position })
        .eq("id", current.id),
      supabase
        .from("collection_images")
        .update({ position: current.position })
        .eq("id", target.id),
    ]);
    loadImages();
  };

  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white border-b border-rosegold/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl text-burgundy font-semibold">
            Daniel Fashion Design — Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-espresso/60 hidden sm:inline">
              {session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm text-espresso/70 hover:text-burgundy"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveSlug(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSlug === c.id
                  ? "bg-burgundy text-ivory"
                  : "bg-white text-espresso/70 border border-rosegold/30 hover:border-burgundy"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rosegold/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg text-burgundy font-semibold">
              {COLLECTIONS.find((c) => c.id === activeSlug)?.name} photos
            </h2>
            <label className="inline-flex items-center gap-2 bg-burgundy text-ivory px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-rosegold hover:text-espresso transition-colors">
              <Upload size={16} />
              {uploading ? "Uploading…" : "Upload photos"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-sm text-espresso/60">Loading…</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-espresso/60">
              No photos yet for this collection. Upload some to replace the
              placeholder shown on the site.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, i) => (
                <div
                  key={image.id}
                  className="relative group rounded-xl overflow-hidden border border-rosegold/20 aspect-[4/5]"
                >
                  <img
                    src={collectionImagePublicUrl(image.storage_path)}
                    alt={image.alt_text || ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/50 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label="Move earlier"
                        disabled={i === 0}
                        onClick={() => handleMove(i, -1)}
                        className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center disabled:opacity-40"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Move later"
                        disabled={i === images.length - 1}
                        onClick={() => handleMove(i, 1)}
                        className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center disabled:opacity-40"
                      >
                        <ChevronDown size={15} />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label="Delete photo"
                      onClick={() => handleDelete(image)}
                      className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
