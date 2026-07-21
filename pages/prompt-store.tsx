import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const PROMPT_PACKS = [
  {
    id: "pp1",
    emoji: "🚀",
    title: "Startup Founder Pack",
    desc: "50 prompts for pitch decks, investor emails, product launches, and growth hacking.",
    price: "$9",
    tags: ["business", "AI", "startup"],
  },
  {
    id: "pp2",
    emoji: "🎬",
    title: "YouTube Creator Pack",
    desc: "40 prompts for video scripts, titles, thumbnails, and community posts.",
    price: "$7",
    tags: ["content", "YouTube", "viral"],
  },
  {
    id: "pp3",
    emoji: "💼",
    title: "Freelancer Toolkit",
    desc: "60 prompts for proposals, contracts, client emails, and portfolio copy.",
    price: "$12",
    tags: ["freelance", "clients", "income"],
  },
  {
    id: "pp4",
    emoji: "🛡️",
    title: "Cybersecurity Pack",
    desc: "35 prompts for security audits, threat reports, and policy writing.",
    price: "$14",
    tags: ["security", "tech", "pro"],
  },
  {
    id: "pp5",
    emoji: "📱",
    title: "App Launch Pack",
    desc: "45 prompts for app store descriptions, onboarding flows, and push notifications.",
    price: "$10",
    tags: ["mobile", "product", "launch"],
  },
  {
    id: "pp6",
    emoji: "💰",
    title: "Income Stream Bundle",
    desc: "80 prompts for affiliate marketing, dropshipping, digital products, and passive income.",
    price: "$19",
    tags: ["income", "bundle", "best value"],
    highlight: true,
  },
];

export default function PromptStore() {
  const [added, setAdded] = useState<string[]>([]);

  function toggle(id: string) {
    setAdded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <>
      <Head>
        <title>Prompt Store · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl">💡</span>
            <h1 className="text-3xl font-bold mt-2">AI Prompt Store</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Battle-tested prompt packs that save hours and drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROMPT_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`relative rounded-2xl border p-5 flex flex-col gap-3 ${
                  pack.highlight
                    ? "border-indigo-500 bg-indigo-950/40"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                {pack.highlight && (
                  <span className="absolute top-3 right-3 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">
                    Best Value
                  </span>
                )}
                <div className="text-2xl">{pack.emoji}</div>
                <div>
                  <h2 className="font-semibold text-sm">{pack.title}</h2>
                  <p className="text-xs text-gray-400 mt-1">{pack.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {pack.tags.map((t) => (
                    <span key={t} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-indigo-300">{pack.price}</span>
                  <button
                    onClick={() => toggle(pack.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                      added.includes(pack.id)
                        ? "bg-green-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {added.includes(pack.id) ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {added.length > 0 && (
            <div className="mt-8 p-5 rounded-2xl bg-gray-900 border border-indigo-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{added.length} pack{added.length > 1 ? "s" : ""} selected</p>
                <p className="text-xs text-gray-400">Ready to checkout via Stripe</p>
              </div>
              <a
                href="/pricing"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-colors"
              >
                Checkout →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
