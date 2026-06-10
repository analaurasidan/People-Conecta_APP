import React from 'react';

type Gap       = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type Align     = 'start' | 'center' | 'end' | 'stretch';
type Justify   = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Direction = 'vertical' | 'horizontal';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  direction?: Direction;
  gap?:       Gap;
  align?:     Align;
  justify?:   Justify;
  wrap?:      boolean;
  as?:        keyof React.JSX.IntrinsicElements;
}

const gapClass: Record<Gap, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3',
  4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 8: 'gap-8',
  10: 'gap-10', 12: 'gap-12',
};
const alignClass: Record<Align, string>   = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
const justifyClass: Record<Justify, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly' };

export function Stack({
  direction = 'vertical',
  gap       = 2,
  align     = 'stretch',
  justify   = 'start',
  wrap      = false,
  as: Tag   = 'div',
  className = '',
  children,
  ...rest
}: StackProps) {
  return (
    <Tag
      className={[
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClass[gap],
        alignClass[align],
        justifyClass[justify],
        wrap ? 'flex-wrap' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  );
}
