import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Upload, LogOut, Link2, Images } from "lucide-react";
import { supabase, resolveImageUrl, IMAGES_BUCKET } from "../lib/supabase";
import { COLLECTIONS } from "../data";

const TABS = [
  ...COLLECTIONS.map((c) => ({ id: c.id, name: c.name, table: "collection_images" })),
  { id: "gallery", name: "Gallery", table: "gallery_images" },
];

export default function Dashboard({ session }) {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [addingUrl, setAddingUrl] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const activeTab = TABS.find((t) => t.id === activeTabId);
  const isGallery = activeTab.table === "gallery_images";

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError("");
    let query = supabase
      .from(activeTab.table)
      .select("id, storage_path, position, alt_text")
      .order("position", { ascending: true });
    if (!isGallery) query = query.eq("collection_slug", activeTab.id);

    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError(fetchError.message);
      setImages([]);
    } else {
      setImages(data);
    }
    setLoading(false);
  }, [activeTab.table, activeTab.id, isGallery]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const nextPosition = () =>
    images.length > 0 ? Math.max(...images.map((i) => i.position)) + 1 : 0;

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");

    let position = nextPosition();

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${activeTab.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(IMAGES_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      const row = { storage_path: path, position };
      if (!isGallery) row.collection_slug = activeTab.id;

      const { error: insertError } = await supabase.from(activeTab.table).insert(row);
      if (insertError) setError(insertError.message);
      position += 1;
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadImages();
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    const url = urlValue.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      setError("Please enter a valid image URL starting with http:// or https://");
      return;
    }

    setAddingUrl(true);
    setError("");

    const row = { storage_path: url, position: nextPosition() };
    if (!isGallery) row.collection_slug = activeTab.id;

    const { error: insertError } = await supabase.from(activeTab.table).insert(row);
    if (insertError) setError(insertError.message);

    setAddingUrl(false);
    setUrlValue("");
    loadImages();
  };

  const handleDelete = async (image) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    // Only remove from storage if it's an uploaded file, not a pasted external URL.
    if (!/^https?:\/\//i.test(image.storage_path)) {
      await supabase.storage.from(IMAGES_BUCKET).remove([image.storage_path]);
    }
    await supabase.from(activeTab.table).delete().eq("id", image.id);
    loadImages();
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const current = images[index];
    const target = images[targetIndex];

    await Promise.all([
      supabase.from(activeTab.table).update({ position: target.position }).eq("id", current.id),
      supabase.from(activeTab.table).update({ position: current.position }).eq("id", target.id),
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
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTabId(t.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTabId === t.id
                  ? "bg-burgundy text-ivory"
                  : "bg-white text-espresso/70 border border-rosegold/30 hover:border-burgundy"
              }`}
            >
              {t.id === "gallery" && <Images size={14} />}
              {t.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rosegold/20 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="font-serif text-lg text-burgundy font-semibold">
              {activeTab.name} photos
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

          <form onSubmit={handleAddUrl} className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="relative flex-1">
              <Link2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40"
              />
              <input
                type="url"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="Or paste an image URL (e.g. from Pinterest)…"
                className="w-full rounded-full border border-rosegold/30 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rosegold"
              />
            </div>
            <button
              type="submit"
              disabled={addingUrl || !urlValue.trim()}
              className="inline-flex items-center justify-center gap-1.5 border border-burgundy text-burgundy px-5 py-2 rounded-full text-sm font-medium hover:bg-burgundy hover:text-ivory transition-colors disabled:opacity-40"
            >
              {addingUrl ? "Adding…" : "Add photo"}
            </button>
          </form>

          {error && (
            <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-sm text-espresso/60">Loading…</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-espresso/60">
              No photos yet{isGallery ? "" : " for this collection"}. Upload
              some or paste a URL above to replace the placeholders shown on
              the site.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, i) => (
                <div
                  key={image.id}
                  className="relative group rounded-xl overflow-hidden border border-rosegold/20 aspect-[4/5]"
                >
                  <img
                    src={resolveImageUrl(image.storage_path)}
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
