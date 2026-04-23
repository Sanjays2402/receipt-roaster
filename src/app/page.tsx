"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import { UploadZone, type UploadResult } from "@/components/upload-zone";
import { RoastCard } from "@/components/roast-card";

type Roast = { roast: string; vibe: string };

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [roast, setRoast] = useState<Roast | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async ({ dataUrl, context }: UploadResult) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ image: dataUrl, context }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something broke. Try again.");
      } else {
        setRoast(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRoast(null);
    setError(null);
  };

  const download = async () => {
    if (!cardRef.current) return;
    const png = await toPng(cardRef.current, {
      pixelRatio: 1,
      cacheBust: true,
    });
    const a = document.createElement("a");
    a.href = png;
    a.download = `receipt-roaster-${Date.now()}.png`;
    a.click();
  };

  const share = async () => {
    if (!roast) return;
    const text = `“${roast.roast}” — receipt-roaster`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Receipt Roaster", text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(text);
    alert("Roast copied to clipboard");
  };

  return (
    <main className="flex-1 flex flex-col">
      <header className="px-6 pt-10 sm:pt-16 pb-2 text-center">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ink">
          Your taste,{" "}
          <span className="font-display italic font-bold text-amber">roasted</span>.
        </h1>
        <p className="mt-4 text-ink-dim max-w-md mx-auto">
          Upload a screenshot. We&rsquo;ll tell you the truth.
        </p>
      </header>

      <section className="flex-1 px-6 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          {!roast ? (
            <motion.div
              key="upload"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <UploadZone onSubmit={handleSubmit} loading={loading} />
              {error && (
                <p className="mt-4 text-center text-sm text-rust max-w-xl mx-auto">
                  {error}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl mx-auto"
            >
              <div className="rounded-2xl border border-amber/20 bg-bg-2/60 p-6 sm:p-8">
                <div className="text-xs font-mono uppercase tracking-widest text-amber">
                  {roast.vibe}
                </div>
                <p className="mt-4 font-mono text-lg sm:text-xl leading-relaxed text-ink">
                  <span className="font-display italic text-amber/70 text-3xl mr-1 align-[-4px]">
                    &ldquo;
                  </span>
                  {roast.roast}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={download}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-bg font-semibold hover:bg-gold transition"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
                <button
                  onClick={share}
                  className="inline-flex items-center gap-2 rounded-xl border border-ink-dim/30 px-5 py-3 text-ink hover:border-amber/60 hover:text-amber transition"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-ink-dim/30 px-5 py-3 text-ink hover:border-amber/60 hover:text-amber transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Roast again
                </button>
              </div>

              {/* offscreen high-res card for download */}
              <div
                aria-hidden
                style={{
                  position: "fixed",
                  left: "-99999px",
                  top: 0,
                  pointerEvents: "none",
                }}
              >
                <RoastCard ref={cardRef} roast={roast.roast} vibe={roast.vibe} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-ink-dim">
        <p>
          🪞 receipt-roaster · made with regret
        </p>
      </footer>
    </main>
  );
}
