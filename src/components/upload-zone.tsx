"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const SOURCES = ["Spotify Wrapped", "Letterboxd", "Goodreads", "Steam", "Pinterest", "Other"];

export type UploadResult = {
  dataUrl: string;
  context: string;
};

export function UploadZone({
  onSubmit,
  loading,
}: {
  onSubmit: (r: UploadResult) => void;
  loading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [context, setContext] = useState<string>("Spotify Wrapped");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("That's not an image, friend.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Max 10 MB. Compress it.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const submit = () => {
    if (!preview) return;
    onSubmit({ dataUrl: preview, context });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`group relative flex flex-col items-center justify-center min-h-[260px] cursor-pointer rounded-2xl border border-dashed transition-all
          ${dragOver ? "border-amber bg-amber/5" : "border-ink-dim/30 hover:border-amber/60 hover:bg-amber/[0.03]"}
        `}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="preview"
            className="max-h-[260px] rounded-xl object-contain p-4"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 px-8 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/10 text-amber">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-ink/90">
              Drop a screenshot or <span className="text-amber underline-offset-4 underline decoration-amber/40">browse</span>
            </p>
            <p className="text-xs text-ink-dim">PNG, JPG, WEBP — up to 10 MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readFile(file);
          }}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-rust">{error}</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-ink-dim">
          <ImageIcon className="h-4 w-4" />
          <label htmlFor="src">What is this?</label>
          <select
            id="src"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="bg-bg-2 border border-ink-dim/20 rounded-lg px-2 py-1 text-ink focus:border-amber/60 focus:outline-none"
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={!preview || loading}
          onClick={submit}
          className="px-6 py-3 rounded-xl bg-amber text-bg font-semibold tracking-tight transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold"
        >
          {loading ? "Roasting…" : "Roast me"}
        </button>
      </div>
    </motion.div>
  );
}
