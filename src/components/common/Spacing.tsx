import { HTMLAttributes, memo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: never;
  direction?: 'horizontal' | 'vertical';
  size?: number;
}

const Spacing = memo(function Spacing({
  direction = 'vertical',
  size = 4,
  ...props
}: Props) {
  return (
    <div
      className={`w-[calc(100%+32px)] ${
        direction === 'horizontal' ? `w-${size}` : ''
      } ${direction === 'vertical' ? `h-${size}` : ''}`}
      {...props}
    />
  );
});

Spacing.displayName = 'Spacing';

export default Spacing;
