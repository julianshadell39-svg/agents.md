"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OutputLine =
  | { type: "input"; text: string }
  | { type: "output"; text: string }
  | { type: "error"; text: string }
  | { type: "success"; text: string }
  | { type: "info"; text: string };

// ─── Built-in commands ────────────────────────────────────────────────────────

const COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => [
    "Available commands:",
    "  help              Show this help message",
    "  about             About Jupiter Command",
    "  agents            List registered agents",
    "  run <agent>       Run a specific agent",
    "  status            Show system status",
    "  logs [agent]      View recent logs",
    "  config            Show current configuration",
    "  clear             Clear the terminal",
    "  version           Show version info",
  ],
  about: () => [
    "Jupiter Command v1.0.0",
    "─────────────────────────────────────────────────",
    "A unified command interface for orchestrating AI",
    "coding agents using the AGENTS.md specification.",
    "",
    "Built on top of the open AGENTS.md format.",
    "Learn more: https://agents.md",
  ],
  version: () => [
    "jupiter-command  1.0.0",
    "agents.md spec   2024-06",
    "node             20.x",
    "platform         " + (typeof navigator !== "undefined" ? navigator.platform : "linux"),
  ],
  agents: () => [
    "Registered agents (4):",
    "",
    "  ● codex          OpenAI Codex          [running]",
    "  ● cursor         Cursor AI              [idle]",
    "  ● jules          Jules by Google        [idle]",
    "  ● amp            Amp by Sourcegraph     [idle]",
  ],
  status: () => [
    "System Status",
    "─────────────────────────────────────────────────",
    "  Scheduler       ✓ online",
    "  Agent registry  ✓ online",
    "  Log store       ✓ online",
    "  Config service  ✓ online",
    "",
    "  Active agents:  1 / 4",
    "  Queued tasks:   3",
    "  Completed:      47 today",
  ],
  config: () => [
    "Current configuration:",
    "─────────────────────────────────────────────────",
    "  agents_file     AGENTS.md",
    "  log_level       info",
    "  max_concurrency 3",
    "  timeout         300s",
    "  output_dir      ./output",
    "  format          markdown",
  ],
  logs: (args) => {
    const agent = args[0];
    if (agent) {
      return [
        `Logs for agent: ${agent}`,
        "─────────────────────────────────────────────────",
        `[12:01:03] ${agent} started task #48`,
        `[12:01:04] ${agent} reading AGENTS.md`,
        `[12:01:07] ${agent} running tests`,
        `[12:01:15] ${agent} task #48 complete`,
      ];
    }
    return [
      "Recent logs (all agents):",
      "─────────────────────────────────────────────────",
      "[12:01:03] codex    started task #48",
      "[12:00:51] cursor   task #47 complete",
      "[11:58:22] jules    reading AGENTS.md",
      "[11:55:10] amp      idle",
    ];
  },
  run: (args) => {
    const agent = args[0];
    if (!agent) return ["Usage: run <agent>", "Run `agents` to see available agents."];
    const known = ["codex", "cursor", "jules", "amp"];
    if (!known.includes(agent)) {
      return [`Error: agent '${agent}' not found.`, "Run `agents` to see available agents."];
    }
    return [
      `Dispatching task to ${agent}…`,
      `Reading AGENTS.md…`,
      `Task queued. Run \`logs ${agent}\` to follow progress.`,
    ];
  },
  clear: () => ["__CLEAR__"],
};

// ─── Quick-action shortcuts ───────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: "agents", icon: "⬡", description: "List agents" },
  { label: "status", icon: "◎", description: "System status" },
  { label: "logs", icon: "≡", description: "View logs" },
  { label: "help", icon: "?", description: "Help" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function JupiterCommand() {
  const [history, setHistory] = useState<OutputLine[]>([
    {
      type: "info",
      text: "Jupiter Command v1.0.0 — type `help` to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmd, ...args] = trimmed.split(/\s+/);

      // Record in command history
      setCmdHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistIdx(-1);

      const newLines: OutputLine[] = [{ type: "input", text: `$ ${trimmed}` }];

      const handler = COMMANDS[cmd.toLowerCase()];
      if (!handler) {
        newLines.push({
          type: "error",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
        });
      } else {
        const result = handler(args);
        if (result[0] === "__CLEAR__") {
          setHistory([{ type: "info", text: "Terminal cleared." }]);
          setInput("");
          return;
        }
        result.forEach((line) => {
          if (line.startsWith("Error:")) {
            newLines.push({ type: "error", text: line });
          } else if (line.includes("✓") || line.includes("complete")) {
            newLines.push({ type: "success", text: line });
          } else {
            newLines.push({ type: "output", text: line });
          }
        });
      }

      setHistory((prev) => [...prev, ...newLines]);
      setInput("");
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  const lineClass = (type: OutputLine["type"]) => {
    switch (type) {
      case "input":
        return "text-gray-400 dark:text-gray-500 font-mono";
      case "error":
        return "text-red-500 dark:text-red-400 font-mono";
      case "success":
        return "text-green-600 dark:text-green-400 font-mono";
      case "info":
        return "text-blue-600 dark:text-blue-400 font-mono";
      default:
        return "text-gray-800 dark:text-gray-200 font-mono";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => runCommand(action.label)}
            title={action.description}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span aria-hidden>{action.icon}</span>
            {action.label}
          </button>
        ))}
        <button
          onClick={() => {
            setHistory([{ type: "info", text: "Terminal cleared." }]);
            setInput("");
          }}
          title="Clear terminal"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ✕ clear
        </button>
      </div>

      {/* Terminal window */}
      <div
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
          <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-green-400" aria-hidden />
          <span className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400 select-none">
            jupiter-command
          </span>
        </div>

        {/* Output area */}
        <div
          className="p-4 min-h-64 max-h-96 overflow-y-auto text-sm leading-6 cursor-text"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {history.map((line, i) => (
            <div key={i} className={lineClass(line.type)}>
              {line.text === "" ? <>&nbsp;</> : line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
          <span
            className="text-sm font-mono text-gray-400 dark:text-gray-500 select-none shrink-0"
            aria-hidden
          >
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm font-mono text-gray-800 dark:text-gray-100 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
            placeholder="type a command…"
            aria-label="Command input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
        ↑ ↓ navigate history &nbsp;·&nbsp; Enter to run
      </p>
    </div>
  );
}
