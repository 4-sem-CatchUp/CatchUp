import React from 'react';
import { ReactNode } from 'react';

interface TruncateProps {
  children?: ReactNode;
  length?: number;
  title?: string;
}

/**
 * Render a span that displays `children` as text, truncating it when it exceeds the specified length.
 *
 * @param children - Content to display; converted to a string (nullish becomes an empty string)
 * @param length - Maximum number of characters to display. If the string's length exceeds this value, the displayed text is truncated to `length - 1` characters and a single `…` is appended
 * @param title - Optional title attribute for the span; defaults to the original full string when omitted
 * @returns A span element whose text is the possibly truncated string and whose `title` is the provided `title` or the original full string
 */
export default function Truncate({ children, length = 0, title }:TruncateProps) {
  const s = String(children ?? '');
  const short = s.length > length ? s.slice(0, length - 1) + '…' : s;
  return <span title={title ?? s}>{short}</span>;
}
