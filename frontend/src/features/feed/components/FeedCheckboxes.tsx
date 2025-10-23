import React from 'react';

type Props = {
  subs: string[];
  selected: Set<string>;
  onToggle: (sub: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
};

export default function FeedCheckboxes({ subs, selected, onToggle, onSelectAll, onClearAll }: Props) {
  return (
    <fieldset className="grid gap-3 p-3 border rounded">
      <legend className="text-sm font-medium">Filter by subs</legend>

      <div className="flex items-center gap-2">
        <button type="button" className="border rounded px-2 py-1 text-sm" onClick={onSelectAll}>
          Select all
        </button>
        <button
          type="button"
          className="border rounded px-2 py-1 text-sm"
          onClick={onClearAll}
          disabled={selected.size === 0}
        >
          Clear all
        </button>
        <span className="text-xs text-gray-500 ml-auto">
          {selected.size}/{subs.length} selected
        </span>
      </div>

      <ul className="flex flex-wrap gap-2">
        {subs.map((s) => (
          <li key={s}>
            <label className="flex items-center gap-2 text-sm border rounded px-2 py-1 accent-amber-600">
              <input
                type="checkbox"
                className="rounded accent focus:ring-2 focus:ring-sky-500"
                checked={selected.has(s)}
                onChange={() => onToggle(s)}
                aria-label={`Toggle ${s}`}
              />
              <span>{s}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
