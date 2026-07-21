import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [position] = useState(() => Math.floor(Math.random() * 300) + 50);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Waitlist · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-16 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <span className="text-5xl">📬</span>
          <h1 className="text-3xl font-bold mt-3">Join the Waitlist</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Be first to get Land Link Pro, exclusive prompt packs, early access
            to new tools, and member-only income strategies.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { val: "2,400+", label: "Waitlist" },
              { val: "$0", label: "To Join" },
              { val: "48h", label: "Early Access" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl py-3">
                <p className="text-lg font-bold text-indigo-300">{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          {!submitted ? (
            <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm transition-colors"
              >
                Reserve My Spot →
              </button>
              <p className="text-xs text-gray-600">No spam. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="mt-8 bg-green-950 border border-green-700 rounded-2xl p-6">
              <p className="text-2xl">🎉</p>
              <p className="font-semibold mt-2">You&apos;re on the list!</p>
              <p className="text-sm text-gray-400 mt-1">
                You are <span className="text-green-400 font-bold">#{position}</span> in line.
                We&apos;ll email {email} when your access is ready.
              </p>
              <div className="mt-4 text-xs text-gray-500">
                Want to skip the line?{" "}
                <a href="/affiliate" className="text-indigo-400 hover:underline">
                  Refer 3 friends →
                </a>
              </div>
            </div>
          )}

          <div className="mt-10 text-left bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">What you&apos;ll get:</h2>
            <ul className="space-y-2">
              {[
                "🔺 Land Link Pro (unlimited tunnel peers)",
                "💡 All current + future prompt packs",
                "🎬 YT Decoder Pro (batch scan)",
                "💰 Weekly income strategy newsletter",
                "🤝 Affiliate dashboard (earn 30% per referral)",
              ].map((item) => (
                <li key={item} className="text-xs text-gray-300 flex items-start gap-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
