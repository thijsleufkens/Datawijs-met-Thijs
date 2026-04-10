"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  selected: string[];
  onChange: (labels: string[]) => void;
}

export default function KpiSelect({ selected, onChange }: Props) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/kpis")
      .then((r) => r.json())
      .then((data) => setSuggestions(data.map((k: { naam: string }) => k.naam)));
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !selected.includes(s)
  );

  const addLabel = (naam: string) => {
    if (!selected.includes(naam)) {
      onChange([...selected, naam]);
    }
    setInput("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        addLabel(input.trim());
      }
    }
  };

  const removeLabel = (naam: string) => {
    onChange(selected.filter((s) => s !== naam));
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground"
          >
            {s}
            <button
              type="button"
              onClick={() => removeLabel(s)}
              className="hover:text-danger"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Typ een KPI-label..."
        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {filtered.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addLabel(s)}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-background transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
