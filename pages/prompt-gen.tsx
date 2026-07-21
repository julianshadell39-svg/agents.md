import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const CATEGORIES = ["Business", "Content", "Tech", "Marketing", "Freelance", "Income"];
const TONES = ["Professional", "Casual", "Persuasive", "Urgent", "Friendly"];

const TEMPLATES: Record<string, string> = {
  Business: "Write a compelling [TONE] pitch for [TOPIC] targeting [AUDIENCE] that highlights [BENEFIT] and ends with a clear call to action.",
  Content: "Create a [TONE] YouTube script outline for a video about [TOPIC] that hooks viewers in the first 10 seconds and covers [BENEFIT].",
  Tech: "Explain [TOPIC] to [AUDIENCE] in a [TONE] way, include a real-world example, and list 3 actionable steps.",
  Marketing: "Write a [TONE] ad copy for [TOPIC] targeting [AUDIENCE] on social media. Emphasize [BENEFIT] and include a strong CTA.",
  Freelance: "Draft a [TONE] proposal email for [TOPIC] to a potential client. Highlight [BENEFIT] and why I am the best choice.",
  Income: "Generate a [TONE] plan for earning money with [TOPIC] targeting [AUDIENCE], focusing on [BENEFIT] with low startup cost.",
};

export default function PromptGenerator() {
  const [category, setCategory] = useState("Business");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [benefit, setBenefit] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  function generate() {
    if (!topic) return;
    const base = TEMPLATES[category] || TEMPLATES.Business;
    const result = base
      .replace("[TONE]", tone.toLowerCase())
      .replace("[TOPIC]", topic || "your product")
      .replace("[AUDIENCE]", audience || "general audience")
      .replace("[BENEFIT]", benefit || "key value");
    setOutput(result);
    setCount((c) => c + 1);
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const FREE_LIMIT = 5;
  const locked = count >= FREE_LIMIT;

  return (
    <>
      <Head>
        <title>Prompt Generator · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl">⚡</span>
            <h1 className="text-3xl font-bold mt-2">Prompt Generator</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Generate high-quality AI prompts instantly.{" "}
              <span className="text-indigo-400">{Math.max(0, FREE_LIMIT - count)} free uses left</span>
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 space-y-4">
            {/* Category */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-xs px-3 py-1.5 rounded-xl transition-colors ${
                      category === c
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Tone</label>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`text-xs px-3 py-1.5 rounded-xl transition-colors ${
                      tone === t
                        ? "bg-purple-700 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            {[
              { label: "Topic / Product", val: topic, set: setTopic, placeholder: "e.g. Land Link VPN app" },
              { label: "Target Audience", val: audience, set: setAudience, placeholder: "e.g. small business owners" },
              { label: "Key Benefit", val: benefit, set: setBenefit, placeholder: "e.g. saves 10 hrs/week" },
            ].map(({ label, val, set, placeholder }) => (
              <div key={label}>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">{label}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}

            <button
              onClick={generate}
              disabled={locked || !topic}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm transition-colors"
            >
              {locked ? "🔒 Upgrade to Generate More" : "⚡ Generate Prompt"}
            </button>
          </div>

          {/* Output */}
          {output && (
            <div className="mt-5 bg-gray-900 border border-gray-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Your Prompt</span>
                <button
                  onClick={copy}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg transition-colors"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">{output}</p>
            </div>
          )}

          {locked && (
            <div className="mt-5 p-4 rounded-2xl bg-indigo-950 border border-indigo-700 text-center">
              <p className="text-sm font-semibold mb-2">Free limit reached 🔒</p>
              <p className="text-xs text-gray-400 mb-3">Upgrade to Pro for unlimited prompts + all packs.</p>
              <a
                href="/pricing"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-xl font-semibold"
              >
                Upgrade for $7/mo →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
