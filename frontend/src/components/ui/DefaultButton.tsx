import React, {ButtonHTMLAttributes, ReactNode} from 'react';

/**
 * DefaultButton component
 *
 * Reusable styled button.
 * Props:
 * - text: string label displayed inside the button
 * - icon: optional icon element displayed next to the text
 *
 * Styling:
 * - Tailwind classes for size, colors, hover/focus states, and dark mode
 * - Full-width layout with rounded corners and bold heading font
 */
interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  gapClass?: string;
  text?: string;
  className?: string;
  type?: any;
  onClick?: any;
  role?: any;
}

/**
 * Renders a button displaying text followed by an icon.
 *
 * @param icon - Optional node rendered after the text inside the button
 * @param text - Optional label rendered before the icon inside the button
 * @returns A JSX `button` element containing `text` followed by `icon`
 */
export default function DefaultButton({ icon, text, iconPosition='right', gapClass='gap-1', id, onClick, className, role, type = "button" }: DefaultButtonProps) {
  return (
    <button type={type} className={`inline-flex items-start ${gapClass} ${className}`} onClick={onClick} id={id} role={role}>
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {text}
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}
