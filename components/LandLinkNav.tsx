import React from "react";
import Link from "next/link";
import TriangleIcon from "@/components/icons/TriangleIcon";

const NAV_LINKS = [
  { href: "/land-link", label: "🔺 Home" },
  { href: "/prompt-store", label: "💡 Prompts" },
  { href: "/prompt-gen", label: "⚡ Generator" },
  { href: "/yt-decode", label: "🎬 YT Decode" },
  { href: "/wireguard", label: "🔒 WireGuard" },
  { href: "/pricing", label: "💳 Pricing" },
  { href: "/downloads", label: "📦 Downloads" },
  { href: "/services", label: "🛠 Services" },
  { href: "/affiliate", label: "🤝 Affiliate" },
  { href: "/waitlist", label: "📬 Waitlist" },
];

export default function LandLinkNav() {
  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 px-4 py-3 flex items-center gap-3 overflow-x-auto">
      <Link href="/land-link" className="flex items-center gap-1.5 shrink-0 mr-2">
        <TriangleIcon size={20} color="#818cf8" />
        <span className="text-sm font-bold text-indigo-400 tracking-tight">Land Link</span>
      </Link>
      {NAV_LINKS.slice(1).map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="shrink-0 text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap px-2 py-1 rounded-lg hover:bg-gray-800"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
