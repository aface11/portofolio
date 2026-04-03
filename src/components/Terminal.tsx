"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { COMMANDS, AVAILABLE_COMMANDS, HistoryEntry, CommandOutput } from "@/lib/commands";

function OutputLine({ output }: { output: CommandOutput }) {
  if (output.type === "error") {
    return <p className="text-red-400">{output.content}</p>;
  }

  if (output.type === "text") {
    return <p className="text-neutral-300">{output.content}</p>;
  }

  if (output.type === "list") {
    return (
      <div className="space-y-1">
        {output.items.map((item) => (
          <div key={item.label} className="flex gap-4">
            <span className="text-white w-20 shrink-0">{item.label}</span>
            <span className="text-neutral-500">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  if (output.type === "ascii") {
    return (
      <pre className="text-neutral-300 text-[4px] sm:text-[6px] md:text-[8px] leading-[1.1] overflow-x-auto whitespace-pre">
        {output.content}
      </pre>
    );
  }

  if (output.type === "links") {
    return (
      <div className="space-y-2">
        <p className="text-neutral-500 text-xs tracking-widest uppercase">{output.heading}</p>
        <div className="space-y-1">
          {output.items.map((item, i) => (
            <div key={i} className="flex items-baseline gap-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline underline-offset-4 shrink-0"
                onClick={(e) => item.url === "#" && e.preventDefault()}
              >
                {item.label}
              </a>
              <span className="text-neutral-600">—</span>
              <span className="text-neutral-500">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (output.type === "section") {
    return (
      <div className="space-y-2">
        <p className="text-neutral-500 text-xs tracking-widest uppercase">{output.heading}</p>
        <div className="space-y-0.5">
          {output.body.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-2" />
            ) : (
              <p key={i} className="text-neutral-300 leading-relaxed">
                {line}
              </p>
            )
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      input: "help",
      output: COMMANDS.help(),
    },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    let output: CommandOutput[];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    if (cmd === "") {
      return;
    }

    if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else {
      output = [
        {
          type: "error",
          content: `command not found: ${cmd}. Type 'help' for available commands.`,
        },
      ];
    }

    setHistory((prev) => [...prev, { input: raw, output }]);
    setInput("");
    setHistoryIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const inputHistory = history.map((h) => h.input).filter((i) => i !== "");

    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next < inputHistory.length) {
        setHistoryIndex(next);
        setInput(inputHistory[inputHistory.length - 1 - next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(inputHistory[inputHistory.length - 1 - next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }

  return (
    <div
      className="min-h-screen bg-black text-white font-mono text-sm flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="px-8 pt-10 pb-6 border-b border-neutral-900">
        <p className="text-neutral-600 text-xs tracking-widest uppercase">Adam Copeland</p>
        <p className="text-neutral-700 text-xs tracking-widest uppercase">Executive Producer</p>
        <p className="text-neutral-800 text-xs tracking-widest uppercase">Pasadena, Calif.</p>
      </div>

      {/* Terminal output */}
      <div className="flex-1 px-8 py-8 space-y-8 overflow-y-auto">
        {history.map((entry, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-500">
              <span className="text-neutral-700">~/adam</span>
              <span className="text-white">❯</span>
              <span className="text-neutral-300">{entry.input}</span>
            </div>
            <div className="pl-4 space-y-1">
              {entry.output.map((out, j) => (
                <OutputLine key={j} output={out} />
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-8 py-6 border-t border-neutral-900 flex items-center gap-2">
        <span className="text-neutral-700">~/adam</span>
        <span className="text-white">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-neutral-300 caret-white placeholder-neutral-700"
          placeholder="type a command..."
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}
