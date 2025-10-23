import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFilter, faFire, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';
import DefaultButton from '@/components/ui/DefaultButton';
import { SortOption, useFeedSorting } from '../hooks/useFeedSorting';

type FeedSortProps = {
  value: SortOption;
  onChange: (v: SortOption) => void;
  subs: string[];
  selectedSubs: Set<string>;
  onToggleSub: (sub: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
};

export default function FeedSortAndFilter({
  value,
  onChange,
  subs,
  selectedSubs,
  onToggleSub,
  onSelectAll,
  onClearAll,
}: FeedSortProps) {
  const { open, rootRef, sortBtnId, sortMenuId, toggleOpen, choose } = useFeedSorting({ value, onChange });

  const [activeMenu, setActiveMenu] = useState<'sort' | 'filter' | null>(null);

  const filterBtnId = 'dropdownFilterButton';
  const filterMenuId = 'dropdown-filter';

  const openSort = () => {
    setActiveMenu('sort');
    if (!open) toggleOpen();
  };
  const openFilter = () => {
    setActiveMenu('filter');
    if (!open) toggleOpen();
  };

  const isSortMenu = open && activeMenu === 'sort';
  const isFilterMenu = open && activeMenu === 'filter';

  return (
    <div ref={rootRef} className="relative">
      <div className="flex gap-2">
        {/* SORT: wrapper is relative so menu anchors to THIS button */}
        <div className="relative w-full">
          <DefaultButton
            icon={<FontAwesomeIcon icon={faCaretDown} />}
            id={sortBtnId}
            aria-haspopup="menu"
            aria-controls={sortMenuId}
            aria-expanded={isSortMenu}
            onClick={openSort}
            className="m-0 dark:bg-gray-800 text-sky-500 hover:text-sky-600 w-full"
            type="button"
            text="Sort"
          />
          <div
            id={sortMenuId}
            role="menu"
            aria-labelledby={sortBtnId}
            className={[
              'absolute left-0 top-full z-10 mt-2 w-40 rounded-sm bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
              isSortMenu ? 'block' : 'hidden',
            ].join(' ')}
          >
            <ul className="py-1 text-gray-700 dark:text-gray-200">
              <li>
                <DefaultButton
                  iconPosition="left"
                  icon={<FontAwesomeIcon icon={faClock} />}
                  role="menuitem"
                  className="w-full text-start bg-transparent text-sky-500 outline-sky-500 hover:outline-sky-600 hover:text-sky-600"
                  onClick={() => choose('newest')}
                  text="Newest"
                />
              </li>
              <li>
                <DefaultButton
                  iconPosition="left"
                  icon={<FontAwesomeIcon icon={faFire} />}
                  role="menuitem"
                  className="w-full text-start bg-transparent text-sky-500 outline-sky-500 hover:outline-sky-600 hover:text-sky-600"
                  onClick={() => choose('hottest')}
                  text="Hottest"
                />
              </li>
              <li>
                <DefaultButton
                  iconPosition="left"
                  icon={<FontAwesomeIcon icon={faChartLine} />}
                  role="menuitem"
                  className="w-full text-start bg-transparent text-sky-500 outline-sky-500 hover:outline-sky-600 hover:text-sky-600"
                  onClick={() => choose('topRated')}
                  text="Top rated"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* FILTER: its own relative wrapper; menu anchors under Filter button */}
        <div className="relative w-full">
          <DefaultButton
            icon={<FontAwesomeIcon icon={faFilter} />}
            id={filterBtnId}
            aria-haspopup="menu"
            aria-controls={filterMenuId}
            aria-expanded={isFilterMenu}
            onClick={openFilter}
            className="m-0 dark:bg-gray-800 text-sky-500 hover:text-sky-600 w-full"
            type="button"
            text="Filter"
          />
          <div
            id={filterMenuId}
            role="menu"
            aria-labelledby={filterBtnId}
            className={[
              'absolute left-0 top-full z-10 mt-2 w-56 rounded-sm bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
              isFilterMenu ? 'block' : 'hidden',
            ].join(' ')}
          >
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <button className="rounded-sm px-2 py-1 text-xs" onClick={onSelectAll} type="button">
                  Select all
                </button>
                <button
                  className=" rounded-sm px-2 py-1 text-xs"
                  onClick={onClearAll}
                  type="button"
                  disabled={selectedSubs.size === 0}
                >
                  Clear all
                </button>
                <span className="ml-auto text-[10px] opacity-70">
                  {selectedSubs.size}/{subs.length} selected
                </span>
              </div>
              <ul className="max-h-60 overflow-auto space-y-1 pr-1">
                {subs.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <input
                      id={`sub-${s}`}
                      type="checkbox"
                      checked={selectedSubs.has(s)}
                      onChange={() => onToggleSub(s)}
                    />
                    <label htmlFor={`sub-${s}`} className="text-sm">
                      {s}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
