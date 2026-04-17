"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { COMMANDS, AVAILABLE_COMMANDS, HistoryEntry, CommandOutput } from "@/lib/commands";

function OutputLine({ output, onCommand }: { output: CommandOutput; onCommand?: (cmd: string) => void }) {
  if (output.type === "error") {
    return <p className="text-red-400">{output.content}</p>;
  }

  if (output.type === "text") {
    return <p>{output.content}</p>;
  }

  if (output.type === "list") {
    return (
      <ul className="space-y-1">
        {output.items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => onCommand?.(item.label)}
              className="flex gap-4 text-left w-full cursor-pointer hover:opacity-60 active:opacity-40 focus-visible:underline focus-visible:outline-none underline-offset-4 transition-opacity"
            >
              <span className="w-20 shrink-0">{item.label}</span>
              <span>{item.value}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (output.type === "ascii") {
    return (
      <pre
        aria-hidden="true"
        className={`leading-[1.3] overflow-x-auto whitespace-pre ${
          output.large
            ? "text-[10px] sm:text-xs"
            : "text-[3px] xs:text-[4px] sm:text-[6px] md:text-[8px] leading-[1.1]"
        }`}
      >
        {output.content}
      </pre>
    );
  }

  if (output.type === "links") {
    return (
      <div className="space-y-2">
        <p className="text-xs tracking-widest uppercase">{output.heading}</p>
        <ul className="space-y-1">
          {output.items.map((item) => (
            <li key={item.url + item.label}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus-visible:underline focus-visible:outline-none underline-offset-4"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (output.type === "section") {
    const paragraphs: string[][] = [];
    let current: string[] = [];
    for (const line of output.body) {
      if (line === "") {
        if (current.length) { paragraphs.push(current); current = []; }
      } else {
        current.push(line);
      }
    }
    if (current.length) paragraphs.push(current);

    return (
      <div className="space-y-2">
        <p className="text-xs tracking-widest uppercase">{output.heading}</p>
        <div className="space-y-3">
          {paragraphs.map((lines, i) => (
            <p key={i} className="leading-relaxed">
              {lines.join(" ")}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => [
    { input: "help", output: COMMANDS.help() },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const latestEntryRef = useRef<HTMLDivElement>(null);
  const entryIdRef = useRef(0);
  const initialMountRef = useRef(true);

  // Scroll to top of newly added entry, but not on initial mount.
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    latestEntryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on mount.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();

    if (cmd === "") return;

    if (cmd === "clear") {
      setHistory([{ input: "help", output: COMMANDS.help() }]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    const output: CommandOutput[] = COMMANDS[cmd]
      ? COMMANDS[cmd]()
      : [
          {
            type: "ascii",
            large: true,
            content: `
  _  _    ___   _  _
 | || |  / _ \\ | || |
 | || |_| | | || || |_
 |__   _| | | ||__   _|
    | |  | |_| |  | |
    |_|   \\___/   |_|`,
          },
          {
            type: "text",
            content: "Oh whatsup fam. type CLEAR to see the menu",
          },
        ];

    setHistory((prev) => [...prev, { input: raw, output }]);
    setInput("");
    setHistoryIndex(-1);
  }, []);

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
    <main
      role="main"
      aria-label="Terminal portfolio"
      className="h-screen overflow-hidden bg-black text-white font-mono text-sm flex flex-col"
    >
      <header className="px-8 pt-10 pb-6 border-b border-neutral-900">
        <p className="text-xs tracking-widest uppercase">Adam Copeland</p>
        <p className="text-xs tracking-widest uppercase">Executive Producer</p>
        <p className="text-xs tracking-widest uppercase">Pasadena, Calif.</p>
        <div className="flex items-center gap-2 mt-4">
          <span aria-hidden="true" className="text-xs">~/adam</span>
          <span aria-hidden="true" className="text-xs">❯</span>
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[16px] outline-none caret-white placeholder-white/40 focus-visible:outline-none"
            placeholder="type a command..."
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal command input"
          />
        </div>
      </header>

      <section
        aria-label="Terminal output"
        className="flex-1 px-8 py-8 space-y-8 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => {
          const isLast = i === history.length - 1;
          // Stable key: monotonic id + input, so reorders don't alias.
          const key = `${entryIdRef.current + i}-${entry.input}`;
          return (
            <div key={key} ref={isLast ? latestEntryRef : null} className="space-y-3">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">~/adam</span>
                <span aria-hidden="true">❯</span>
                <span>{entry.input}</span>
              </div>
              <div className="pl-4 space-y-1">
                {entry.output.map((out, j) => (
                  <OutputLine key={j} output={out} onCommand={runCommand} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
