import React from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const DOWNLOADS = [
  {
    emoji: "💰",
    title: "Income Stream Bundle",
    desc: "80 AI prompts for affiliate marketing, digital products, dropshipping, and passive income.",
    price: "$19",
    file: "income-stream-bundle.zip",
    includes: ["80 prompts (PDF + TXT)", "Notion template", "Quick-start guide"],
  },
  {
    emoji: "🔒",
    title: "WireGuard Setup Bundle",
    desc: "Pre-configured WireGuard configs for 5 devices + setup instructions for Ubuntu, iOS & Android.",
    price: "$24",
    file: "wireguard-bundle.zip",
    includes: ["Server config", "5 peer configs", "QR codes", "Setup PDF"],
  },
  {
    emoji: "📚",
    title: "Full Prompt Library",
    desc: "300+ prompts across all categories — business, tech, content, freelance, and income.",
    price: "$39",
    file: "full-prompt-library.zip",
    includes: ["300+ prompts (PDF)", "Notion database", "ChatGPT custom instructions"],
  },
  {
    emoji: "🎬",
    title: "YouTube Monetization Kit",
    desc: "Scripts, hooks, and strategies for monetizing a YouTube channel from 0 subscribers.",
    price: "$15",
    file: "yt-monetization-kit.zip",
    includes: ["30 video scripts", "20 hook templates", "SEO keyword list", "Thumbnail prompts"],
  },
  {
    emoji: "🛠️",
    title: "Freelance Client Pack",
    desc: "Templates for proposals, contracts, invoices, and follow-up emails — ready to send.",
    price: "$12",
    file: "freelance-client-pack.zip",
    includes: ["10 proposal templates", "Contract template", "Invoice template", "Email scripts"],
  },
  {
    emoji: "🔺",
    title: "Land Link Starter Kit",
    desc: "Everything to set up your private Land Link network: config generator, docs, and scripts.",
    price: "$29",
    file: "land-link-starter-kit.zip",
    includes: ["WireGuard configs", "DNS setup script", "Bash auto-installer", "Troubleshooting guide"],
    highlight: true,
  },
];

export default function Downloads() {
  return (
    <>
      <Head>
        <title>Digital Downloads · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl">📦</span>
            <h1 className="text-3xl font-bold mt-2">Digital Downloads</h1>
            <p className="text-gray-400 mt-1 text-sm">
              One-time purchase. Instant download. No subscription needed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOWNLOADS.map((d) => (
              <div
                key={d.title}
                className={`relative rounded-2xl border p-5 flex flex-col gap-3 ${
                  d.highlight ? "border-indigo-500 bg-indigo-950/30" : "border-gray-800 bg-gray-900"
                }`}
              >
                {d.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-indigo-600 text-white px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
                    🔺 Featured
                  </span>
                )}
                <div className="text-2xl">{d.emoji}</div>
                <div>
                  <h2 className="font-semibold text-sm">{d.title}</h2>
                  <p className="text-xs text-gray-400 mt-1">{d.desc}</p>
                </div>
                <ul className="space-y-1">
                  {d.includes.map((item) => (
                    <li key={item} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xl font-bold text-indigo-300">{d.price}</span>
                  <a
                    href="/pricing"
                    className="text-xs px-3 py-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-600 mt-8">
            All sales final. Delivered as .zip via email within 60 seconds.
          </p>
        </div>
      </div>
    </>
  );
}
