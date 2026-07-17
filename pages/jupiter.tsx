import React from "react";
import JupiterCommand from "@/components/JupiterCommand";
import Footer from "@/components/Footer";
import GitHubIcon from "@/components/icons/GitHubIcon";

const inlineCode = "bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs font-mono";

export default function JupiterPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <main className="flex-1">
        {/* Header */}
        <header className="px-6 py-16 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium">
              <span aria-hidden>⬡</span>
              Jupiter Command
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Run agents from the command line
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
              Jupiter Command is a unified interface for dispatching and
              monitoring AI coding agents that follow the{" "}
              <a
                href="/"
                className="underline hover:no-underline"
              >
                AGENTS.md
              </a>{" "}
              specification. Orchestrate multiple agents, inspect logs, and
              manage configuration — all in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#terminal"
                className="inline-block px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-80"
              >
                Try it now
              </a>
              <a
                href="https://github.com/agentsmd/agents.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <GitHubIcon className="w-4 h-4 text-current" />
                View on GitHub
              </a>
            </div>
          </div>
        </header>

        {/* Feature pills */}
        <section className="px-6 py-10 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
            {[
              { icon: "⬡", label: "Multi-agent orchestration" },
              { icon: "◎", label: "Real-time status" },
              { icon: "≡", label: "Unified log viewer" },
              { icon: "⚙", label: "Config management" },
              { icon: "↑", label: "Command history" },
              { icon: "✓", label: "AGENTS.md native" },
            ].map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                <span aria-hidden>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </section>

        {/* Terminal section */}
        <section id="terminal" className="px-6 py-16">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Interactive terminal
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Type a command below or click a quick-action button. Try{" "}
                <code className={inlineCode}>
                  help
                </code>{" "}
                to see all available commands.
              </p>
            </div>

            {/* Payment destination banner */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40">
              <span className="text-green-600 dark:text-green-400 text-lg" aria-hidden>→</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                  Active payment destination
                </span>
                <code className="text-sm font-mono font-semibold text-green-900 dark:text-green-100">
                  $julianshadell
                </code>
              </div>
              <span className="ml-auto text-xs text-green-600 dark:text-green-400 font-mono">
                Cash App · Venmo · PayPal · Coinbase · Kraken
              </span>
            </div>

            <JupiterCommand />
          </div>
        </section>

        {/* Command reference */}
        <section className="px-6 py-16 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Command reference
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  cmd: "agents",
                  desc: "List all registered agents and their current status.",
                },
                {
                  cmd: "run <agent>",
                  desc: "Dispatch a task to the named agent using your AGENTS.md config.",
                },
                {
                  cmd: "platforms [category]",
                  desc: "List all payment, crypto, social, and e-commerce platform integrations.",
                },
                {
                  cmd: "connect <platform>",
                  desc: "Authenticate and connect a platform integration by its ID.",
                },
                {
                  cmd: "destination",
                  desc: "Show the active payment destination ($julianshadell) and supported platforms.",
                },
                {
                  cmd: "pay <amount> [platform]",
                  desc: "Send a payment to $julianshadell via Cash App, Venmo, Coinbase, Kraken, and more.",
                },
                {
                  cmd: "status",
                  desc: "Show a live overview of the scheduler and all services.",
                },
                {
                  cmd: "logs [agent]",
                  desc: "Tail recent logs, optionally filtered to a single agent.",
                },
                {
                  cmd: "config",
                  desc: "Display the current active configuration, including payment_destination.",
                },
                {
                  cmd: "help",
                  desc: "Print the full list of available commands.",
                },
              ].map(({ cmd, desc }) => (
                <div
                  key={cmd}
                  className="flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                >
                  <code className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
                    {cmd}
                  </code>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Install section */}
        <section className="px-6 py-16 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Get started
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Install Jupiter Command globally and point it at your repo:
            </p>
            <div className="flex flex-col gap-3">
              {[
                "npm install -g jupiter-command",
                "cd my-project",
                "jupiter init",
                "jupiter run codex",
              ].map((line, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200"
                >
                  <span className="text-gray-400 dark:text-gray-600 select-none">
                    $
                  </span>
                  {line}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Running <code className={inlineCode}>jupiter init</code>{" "}
              scaffolds an <code className={inlineCode}>AGENTS.md</code>{" "}
              file in your project root automatically.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
