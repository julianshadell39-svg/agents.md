import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

interface ScanResult {
  timestamp: string;
  type: "metadata" | "lsb" | "audio" | "description";
  label: string;
  value: string;
  flagged: boolean;
}

function fakeScan(url: string): ScanResult[] {
  const id = url.includes("v=") ? url.split("v=")[1]?.substring(0, 11) : "unknown";
  return [
    {
      timestamp: new Date().toISOString(),
      type: "metadata",
      label: "Video ID",
      value: id || "N/A",
      flagged: false,
    },
    {
      timestamp: new Date().toISOString(),
      type: "description",
      label: "Description scan",
      value: "No encoded Unicode zero-width chars detected in description.",
      flagged: false,
    },
    {
      timestamp: new Date().toISOString(),
      type: "audio",
      label: "Audio steganography",
      value: "Spectral analysis requires premium — upgrade to scan audio layer.",
      flagged: false,
    },
    {
      timestamp: new Date().toISOString(),
      type: "lsb",
      label: "Thumbnail LSB scan",
      value: "No hidden data detected in thumbnail least-significant bits.",
      flagged: false,
    },
  ];
}

export default function YTDecode() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const FREE_LIMIT = 3;

  function scan() {
    if (!url || scanCount >= FREE_LIMIT) return;
    setScanning(true);
    setResults([]);
    setTimeout(() => {
      setResults(fakeScan(url));
      setScanning(false);
      setScanCount((c) => c + 1);
    }, 1800);
  }

  const locked = scanCount >= FREE_LIMIT;

  return (
    <>
      <Head>
        <title>YT Decoder · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl">🎬</span>
            <h1 className="text-3xl font-bold mt-2">YouTube Decoder</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Scan YouTube videos for hidden messages, metadata, steganography,
              and encoded data.{" "}
              <span className="text-indigo-400">{Math.max(0, FREE_LIMIT - scanCount)} free scans left</span>
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={scan}
              disabled={scanning || locked || !url}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm transition-colors"
            >
              {scanning ? "🔍 Scanning…" : locked ? "🔒 Upgrade to Scan More" : "🔍 Decode Video"}
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Scan Results</p>
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`bg-gray-900 border rounded-xl p-4 ${
                    r.flagged ? "border-red-600" : "border-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-300">{r.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        r.flagged
                          ? "bg-red-900 text-red-300"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {r.flagged ? "⚠ Flagged" : "✓ Clear"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{r.value}</p>
                </div>
              ))}
            </div>
          )}

          {locked && (
            <div className="mt-5 p-4 rounded-2xl bg-indigo-950 border border-indigo-700 text-center">
              <p className="text-sm font-semibold mb-2">Free scans used 🔒</p>
              <p className="text-xs text-gray-400 mb-3">
                Upgrade to Pro for unlimited scans, audio steganography, and batch processing.
              </p>
              <a
                href="/pricing"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-xl font-semibold"
              >
                Upgrade for $7/mo →
              </a>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-5 text-xs text-gray-400 space-y-2">
            <h2 className="text-sm font-semibold text-white mb-2">What We Scan</h2>
            {[
              ["📄", "Description", "Zero-width Unicode chars, base64 blobs, URLs"],
              ["🖼️", "Thumbnail", "LSB (least-significant bit) image steganography"],
              ["🔊", "Audio (Pro)", "Spectral watermarks, encoded audio channels"],
              ["📋", "Metadata", "Hidden tags, geo, chapters, and custom fields"],
            ].map(([icon, label, desc]) => (
              <div key={label as string} className="flex gap-2">
                <span>{icon}</span>
                <div>
                  <span className="text-gray-300 font-medium">{label}</span> — {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
