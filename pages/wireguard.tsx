import React, { useState } from "react";
import Head from "next/head";
import LandLinkNav from "@/components/LandLinkNav";

interface WgPeer {
  name: string;
  ip: string;
  pubkey: string;
}

function fakeKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join("") + "=";
}

export default function WireGuard() {
  const [serverName, setServerName] = useState("land-link-hub");
  const [subnet, setSubnet] = useState("10.10.0");
  const [port, setPort] = useState("51820");
  const [peers, setPeers] = useState<WgPeer[]>([
    { name: "phone", ip: "2", pubkey: fakeKey() },
    { name: "service", ip: "3", pubkey: fakeKey() },
  ]);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const serverKey = fakeKey();

  function addPeer() {
    const nextIp = String(peers.length + 2);
    setPeers((p) => [...p, { name: `device${p.length + 1}`, ip: nextIp, pubkey: fakeKey() }]);
  }

  function serverConf() {
    const peerBlocks = peers
      .map(
        (p) =>
          `[Peer]\n# ${p.name}\nPublicKey = ${p.pubkey}\nAllowedIPs = ${subnet}.${p.ip}/32`
      )
      .join("\n\n");
    return `[Interface]
# ${serverName}
PrivateKey = ${serverKey}
Address = ${subnet}.1/24
ListenPort = ${port}
DNS = ${subnet}.1

# Enable routing (Linux)
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

${peerBlocks}`;
  }

  function peerConf(peer: WgPeer) {
    return `[Interface]
# ${peer.name}
PrivateKey = <REPLACE_WITH_${peer.name.toUpperCase()}_PRIVATE_KEY>
Address = ${subnet}.${peer.ip}/24
DNS = ${subnet}.1

[Peer]
# ${serverName}
PublicKey = ${serverKey}
Endpoint = YOUR_SERVER_IP:${port}
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25`;
  }

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <>
      <Head>
        <title>WireGuard Config · Land Link</title>
      </Head>
      <LandLinkNav />
      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl">🔒</span>
            <h1 className="text-3xl font-bold mt-2">WireGuard Config Generator</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Generate your Land Link private network config in seconds.
            </p>
          </div>

          {/* Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4 mb-6">
            <h2 className="text-sm font-semibold">Network Settings</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Server Name", val: serverName, set: setServerName },
                { label: "Private Subnet (first 3 octets)", val: subnet, set: setSubnet },
                { label: "UDP Port", val: port, set: setPort },
              ].map(({ label, val, set }) => (
                <div key={label} className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-gray-400 block mb-1">{label}</label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs text-gray-400 uppercase tracking-widest">Peers</h3>
                <button
                  onClick={addPeer}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg transition-colors"
                >
                  + Add Peer
                </button>
              </div>
              <div className="space-y-2">
                {peers.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const next = [...peers];
                        next[i] = { ...next[i], name: e.target.value };
                        setPeers(next);
                      }}
                      className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                    />
                    <span className="text-xs text-gray-500 font-mono">{subnet}.{p.ip}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setGenerated(true)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-colors"
            >
              🔒 Generate Configs
            </button>
          </div>

          {/* Generated configs */}
          {generated && (
            <div className="space-y-4">
              {/* Server config */}
              <ConfigBlock
                title={`Server: ${serverName}`}
                id="server"
                text={serverConf()}
                copied={copied}
                onCopy={copy}
              />
              {/* Peer configs */}
              {peers.map((p) => (
                <ConfigBlock
                  key={p.name}
                  title={`Peer: ${p.name} (${subnet}.${p.ip})`}
                  id={p.name}
                  text={peerConf(p)}
                  copied={copied}
                  onCopy={copy}
                />
              ))}
              <p className="text-xs text-gray-500 text-center mt-2">
                ⚠ Replace placeholder private keys with real keys generated by{" "}
                <code className="text-indigo-400">wg genkey</code> on each device.
              </p>
              <a
                href="/pricing"
                className="block text-center text-xs text-indigo-400 hover:underline"
              >
                Upgrade for QR code export + multi-device bundles →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ConfigBlock({
  title,
  id,
  text,
  copied,
  onCopy,
}: {
  title: string;
  id: string;
  text: string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-300">{title}</span>
        <button
          onClick={() => onCopy(text, id)}
          className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg transition-colors"
        >
          {copied === id ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap leading-relaxed">{text}</pre>
    </div>
  );
}
