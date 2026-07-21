import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

const TIERS = [
  { pct: "20%", label: "Starter", min: 1, color: "text-indigo-300" },
  { pct: "30%", label: "Pro", min: 5, color: "text-purple-300" },
  { pct: "40%", label: "Elite", min: 20, color: "text-yellow-300" },
];

export default function Affiliate() {
  const [copied, setCopied] = useState(false);
  const refLink = "https://landlink.app/ref/YOUR_CODE";

  function copy() {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Head>
        <title>Affiliate Program · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl">🤝</span>
            <h1 className="text-3xl font-bold mt-2">Affiliate Program</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Share Land Link. Earn recurring commissions on every sale.
            </p>
          </div>

          {/* Commission tiers */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {TIERS.map((t) => (
              <div key={t.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                <p className={`text-2xl font-bold ${t.color}`}>{t.pct}</p>
                <p className="text-xs font-semibold mt-1">{t.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.min}+ referrals</p>
              </div>
            ))}
          </div>

          {/* Ref link */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-gray-800 px-3 py-2 rounded-xl text-indigo-300 truncate">
                {refLink}
              </code>
              <button
                onClick={copy}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { val: "0", label: "Referrals" },
              { val: "$0.00", label: "Earned" },
              { val: "Starter", label: "Tier" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-indigo-300">{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">How It Works</h2>
            <ol className="space-y-2">
              {[
                "Sign up and get your unique referral link",
                "Share it on social media, YouTube, your blog, or anywhere",
                "Earn % of every sale — recurring monthly commissions",
                "Withdraw via PayPal or crypto once you hit $10",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href="/waitlist"
              className="mt-4 block text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Join &amp; Get Your Link →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
