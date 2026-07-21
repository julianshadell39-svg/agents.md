import React, { useState } from "react";
import Head from "next/head";
import TriangleIcon from "@/components/icons/TriangleIcon";
import LandLinkNav from "@/components/LandLinkNav";

type NetworkStatus = "scanning" | "connected" | "idle";

interface NetworkEntry {
  type: "wifi" | "cellular" | "ethernet";
  name: string;
  signal: number; // 0-100
}

const MOCK_NETWORKS: NetworkEntry[] = [
  { type: "wifi", name: "Home_WiFi_5G", signal: 92 },
  { type: "cellular", name: "LTE Band 4", signal: 74 },
  { type: "wifi", name: "Neighbor_WiFi", signal: 45 },
  { type: "ethernet", name: "Ethernet LAN", signal: 100 },
];

function signalBar(signal: number) {
  if (signal >= 80) return "🟢";
  if (signal >= 50) return "🟡";
  return "🔴";
}

function networkIcon(type: NetworkEntry["type"]) {
  if (type === "wifi") return "📶";
  if (type === "cellular") return "📡";
  return "🔌";
}

export default function LandLink() {
  const [status, setStatus] = useState<NetworkStatus>("idle");
  const [connected, setConnected] = useState<NetworkEntry | null>(null);
  const [networks, setNetworks] = useState<NetworkEntry[]>([]);
  const [tunnelActive, setTunnelActive] = useState(false);

  function scan() {
    setStatus("scanning");
    setConnected(null);
    setTunnelActive(false);
    setNetworks([]);
    setTimeout(() => {
      const sorted = [...MOCK_NETWORKS].sort((a, b) => b.signal - a.signal);
      setNetworks(sorted);
      setStatus("idle");
    }, 1500);
  }

  function connect(net: NetworkEntry) {
    setConnected(net);
    setStatus("connected");
    setTimeout(() => setTunnelActive(true), 800);
  }

  return (
    <>
      <Head>
        <title>Land Link</title>
        <meta name="description" content="Land Link – private network for your phone and services" />
        <link rel="manifest" href="/land-link-manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Land Link" />
        <link rel="apple-touch-icon" href="/land-link-icon.svg" />
      </Head>

      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-10">
        <LandLinkNav />
        {/* App Icon / Face */}
        <div className="flex flex-col items-center gap-3 mb-10 mt-8">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-900 shadow-lg shadow-purple-900/60">
            <TriangleIcon size={52} color="#ffffff" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Land Link</h1>
          <p className="text-sm text-gray-400 text-center max-w-xs">
            Private network for your phone &amp; services. Uses any available
            signal — WiFi, cellular, or Ethernet.
          </p>
        </div>

        {/* Status Card */}
        <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-5 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-gray-500">Tunnel Status</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                tunnelActive
                  ? "bg-green-900 text-green-300"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {tunnelActive ? "● Active" : "○ Inactive"}
            </span>
          </div>

          {connected ? (
            <div className="text-sm text-gray-300 space-y-1">
              <div>
                {networkIcon(connected.type)}{" "}
                <span className="font-medium">{connected.name}</span>
              </div>
              <div className="text-xs text-gray-500">
                Signal {signalBar(connected.signal)} {connected.signal}% · Private IP{" "}
                <span className="font-mono text-indigo-400">10.10.0.2</span>
              </div>
              {tunnelActive && (
                <div className="mt-2 text-xs text-green-400">
                  🔒 WireGuard tunnel established · DNS 10.10.0.1
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No active connection. Scan to find networks.</p>
          )}
        </div>

        {/* Scan Button */}
        <button
          onClick={scan}
          disabled={status === "scanning"}
          className="w-full max-w-sm py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm transition-colors mb-6"
        >
          {status === "scanning" ? "Scanning…" : "🔍 Scan for Networks"}
        </button>

        {/* Network List */}
        {networks.length > 0 && (
          <div className="w-full max-w-sm space-y-2">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
              Available Networks
            </p>
            {networks.map((net) => (
              <button
                key={net.name}
                onClick={() => connect(net)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors text-left ${
                  connected?.name === net.name
                    ? "border-indigo-500 bg-indigo-900/40"
                    : "border-gray-800 bg-gray-900 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{networkIcon(net.type)}</span>
                  <div>
                    <p className="text-sm font-medium">{net.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{net.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm">{signalBar(net.signal)}</span>
                  <p className="text-xs text-gray-500">{net.signal}%</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tools Row */}
        <div className="w-full max-w-sm mt-10 grid grid-cols-2 gap-3">
          <a
            href="/yt-decode"
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-colors text-center"
          >
            <span className="text-2xl">🎬</span>
            <span className="text-xs font-medium text-gray-300">YT Decoder</span>
          </a>
          <a
            href="/"
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-colors text-center"
          >
            <span className="text-2xl">📖</span>
            <span className="text-xs font-medium text-gray-300">AGENTS.md</span>
          </a>
        </div>

        <p className="mt-10 text-xs text-gray-700 text-center">
          Land Link v0.1 · Tunnel: WireGuard · Protocol: UDP/51820
        </p>
      </div>
    </>
  );
}
