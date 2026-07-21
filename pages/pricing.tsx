import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    color: "border-gray-700",
    badge: "",
    features: [
      "5 prompt generations / day",
      "YT Decoder (3 scans / day)",
      "Land Link network scanner",
      "Basic WireGuard config",
    ],
    cta: "Get Started",
    ctaHref: "/land-link",
    ctaStyle: "bg-gray-800 hover:bg-gray-700",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$7",
    period: "/mo",
    color: "border-indigo-500",
    badge: "Most Popular",
    features: [
      "Unlimited prompt generations",
      "All 6 prompt packs included",
      "YT Decoder unlimited scans",
      "WireGuard premium configs",
      "Priority email support",
      "Affiliate dashboard access",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "#stripe-pro",
    ctaStyle: "bg-indigo-600 hover:bg-indigo-500",
  },
  {
    id: "agency",
    name: "Agency",
    price: "$29",
    period: "/mo",
    color: "border-purple-500",
    badge: "Best for Teams",
    features: [
      "Everything in Pro",
      "5 team seats",
      "Custom prompt pack builder",
      "White-label Land Link page",
      "API key access",
      "Monthly strategy call",
    ],
    cta: "Go Agency",
    ctaHref: "#stripe-agency",
    ctaStyle: "bg-purple-700 hover:bg-purple-600",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  function adjustPrice(price: string) {
    if (price === "$0") return "$0";
    const num = parseInt(price.replace("$", ""));
    return annual ? `$${Math.round(num * 10)}` : price;
  }

  return (
    <>
      <Head>
        <title>Pricing · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl">💳</span>
            <h1 className="text-3xl font-bold mt-2">Simple Pricing</h1>
            <p className="text-gray-400 mt-1 text-sm">Start free. Upgrade when you&apos;re ready.</p>
            <div className="mt-4 inline-flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-full px-4 py-2">
              <button
                onClick={() => setAnnual(false)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${!annual ? "bg-indigo-600 text-white" : "text-gray-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${annual ? "bg-indigo-600 text-white" : "text-gray-400"}`}
              >
                Annual <span className="text-green-400 ml-1">–17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl border ${tier.color} bg-gray-900 p-5 flex flex-col gap-4`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-indigo-600 text-white px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
                    {tier.badge}
                  </span>
                )}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{tier.name}</p>
                  <p className="text-3xl font-bold mt-1">
                    {adjustPrice(tier.price)}
                    <span className="text-sm font-normal text-gray-400">{annual && tier.period ? "/yr" : tier.period}</span>
                  </p>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.ctaHref}
                  className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Stripe note */}
          <p className="text-center text-xs text-gray-600 mt-8">
            Payments processed securely via Stripe. Cancel anytime.
          </p>

          {/* One-time options */}
          <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">💡 One-time Purchases</h2>
            <div className="space-y-2">
              {[
                { name: "Income Stream Bundle (80 prompts)", price: "$19" },
                { name: "WireGuard Setup Bundle (5 devices)", price: "$24" },
                { name: "Full Prompt Library (300+ prompts)", price: "$39" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-indigo-300 font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
            <a href="/downloads" className="mt-4 block text-center text-xs text-indigo-400 hover:underline">
              Browse all downloads →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
