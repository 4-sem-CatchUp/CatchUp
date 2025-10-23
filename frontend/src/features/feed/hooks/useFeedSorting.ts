import { useEffect, useRef, useState } from 'react';

// SORTING LOGIC - used in FeedFilter
export type SortOption = 'newest' | 'hottest' | 'topRated';

export interface UseFeedSortingParams {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export interface UseFeedSortingResult {
  open: boolean;
  sorting: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  sortBtnId: string;
  sortMenuId: string;
  toggleOpen: () => void;
  close: () => void;
  setSorting: (v: string) => void;
  choose: (opt: SortOption) => void;
}

export function useFeedSorting(params: UseFeedSortingParams): UseFeedSortingResult {
  const { onChange } = params;

  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState('');

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Keep IDs stable across renders for accessibility bindings.
  const sortBtnId = 'dropdownSortButton';
  const sortMenuId = 'dropdown-sort';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const toggleOpen = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const choose = (opt: SortOption) => {
    onChange(opt);
    setOpen(false);
  };

  return {
    open,
    sorting,
    rootRef,
    sortBtnId,
    sortMenuId,
    toggleOpen,
    close,
    setSorting,
    choose,
  };
}
