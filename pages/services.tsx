import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const SERVICES = [
  {
    emoji: "🔺",
    title: "Land Link Setup",
    desc: "I configure your private WireGuard network end-to-end: server, phone, and any services. Done for you.",
    price: "$149",
    deliverables: ["VPS provisioning", "WireGuard server install", "Phone + service configs", "30-day support"],
    turnaround: "24–48 hrs",
  },
  {
    emoji: "💡",
    title: "Custom Prompt Pack",
    desc: "I build a bespoke AI prompt library tailored to your niche, audience, and goals.",
    price: "$79",
    deliverables: ["50+ custom prompts", "PDF + Notion format", "1 revision round", "Use-case guide"],
    turnaround: "48–72 hrs",
  },
  {
    emoji: "🎬",
    title: "YouTube Channel Audit",
    desc: "Full audit of your YouTube channel for growth opportunities, hidden metadata, and monetization gaps.",
    price: "$59",
    deliverables: ["Video SEO report", "Thumbnail analysis", "Metadata audit", "Action plan PDF"],
    turnaround: "3–5 days",
  },
  {
    emoji: "🛡️",
    title: "Privacy & Security Audit",
    desc: "Review your digital footprint, network setup, and devices for privacy vulnerabilities.",
    price: "$199",
    deliverables: ["Threat model report", "Network config review", "Password hygiene check", "1-hr call"],
    turnaround: "5–7 days",
  },
];

export default function Services() {
  const [inquired, setInquired] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Freelance Services · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl">🛠</span>
            <h1 className="text-3xl font-bold mt-2">Hire Me</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Done-for-you services. Fast turnaround. Real results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex flex-col gap-3"
              >
                <div className="text-2xl">{s.emoji}</div>
                <div>
                  <h2 className="font-semibold text-sm">{s.title}</h2>
                  <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
                </div>
                <ul className="space-y-1">
                  {s.deliverables.map((d) => (
                    <li key={d} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-green-500">✓</span> {d}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500">⏱ Turnaround: {s.turnaround}</div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xl font-bold text-indigo-300">{s.price}</span>
                  <button
                    onClick={() => setInquired(s.title)}
                    className="text-xs px-3 py-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    {inquired === s.title ? "✓ Sent!" : "Inquire"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {inquired && (
            <div className="mt-8 p-4 bg-green-950 border border-green-700 rounded-2xl text-center text-sm">
              <p className="font-semibold">Inquiry received for: {inquired}</p>
              <p className="text-xs text-gray-400 mt-1">
                I&apos;ll follow up within 12 hours. Join the{" "}
                <a href="/waitlist" className="text-indigo-400 hover:underline">
                  waitlist
                </a>{" "}
                to ensure fastest response.
              </p>
            </div>
          )}

          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-sm font-semibold mb-1">Need something custom?</p>
            <p className="text-xs text-gray-400 mb-3">
              I take on bespoke projects. Reach out and let&apos;s build something together.
            </p>
            <a
              href="mailto:hello@landlink.app"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white text-sm px-5 py-2 rounded-xl font-semibold transition-colors"
            >
              📧 Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
