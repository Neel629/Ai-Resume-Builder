"use client";

import { useState, useRef, useMemo, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { searchSkills } from "@/lib/suggestions/skills-dictionary";

interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  category?: "languages" | "frameworks" | "databases" | "devops" | "tools" | "design" | "softSkills";
}

export default function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder = "Type and press Enter...",
  category,
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (input.length >= 1) {
      return searchSkills(input, category).filter(
        (s) => !tags.includes(s)
      ).slice(0, 8);
    }
    return [];
  }, [input, category, tags]);

  const showSuggestions = isFocused && suggestions.length > 0;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
    }
    setInput("");
    setSelectedIndex(-1);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addTag(suggestions[selectedIndex]);
      } else if (input.trim()) {
        addTag(input);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Escape") {
      setIsFocused(false);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="relative">
      {/* Tags + Input */}
      <div
        className="flex flex-wrap gap-2 p-3 rounded-xl border border-border bg-card min-h-[48px] cursor-text focus-within:ring-2 focus-within:ring-emerald/50 focus-within:border-emerald transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald/10 text-emerald text-sm font-medium animate-fade-in"
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(tag);
              }}
              className="ml-0.5 hover:text-emerald-dark transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onFocus={() => setIsFocused(true)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-20 top-full mt-2 w-full rounded-xl border border-border bg-card shadow-xl shadow-black/10 overflow-hidden animate-fade-in"
        >
          {suggestions.map((suggestion, i) => (
            <button
              key={suggestion}
              onMouseDown={(e) => {
                e.preventDefault();
                addTag(suggestion);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === selectedIndex
                  ? "bg-emerald/10 text-emerald"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
