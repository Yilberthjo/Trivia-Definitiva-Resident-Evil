import React from 'react';

interface ResidentEvilNameProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  badge?: boolean;
}

export const ResidentEvilName: React.FC<ResidentEvilNameProps> = ({
  name,
  size = 'md',
  className = '',
  badge = false,
}) => {
  const cleanName = (name || 'SUPERVIVIENTE').trim().toUpperCase();
  const firstLetter = cleanName.charAt(0);
  const restOfName = cleanName.slice(1);

  const sizeClasses = {
    sm: {
      container: 'text-xs tracking-wider',
      first: 'text-sm font-black',
      rest: 'text-xs font-bold',
    },
    md: {
      container: 'text-sm tracking-widest',
      first: 'text-base font-black',
      rest: 'text-sm font-extrabold',
    },
    lg: {
      container: 'text-base tracking-widest',
      first: 'text-xl font-black',
      rest: 'text-base font-extrabold',
    },
    xl: {
      container: 'text-xl tracking-widest',
      first: 'text-2xl font-black',
      rest: 'text-lg font-black',
    },
  }[size];

  return (
    <span
      className={`font-heading font-black uppercase inline-flex items-baseline ${sizeClasses.container} ${className} ${
        badge ? 'bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800' : ''
      }`}
    >
      <span className={`text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.7)] ${sizeClasses.first}`}>
        {firstLetter}
      </span>
      <span className={`text-neutral-100 ${sizeClasses.rest}`}>
        {restOfName}
      </span>
    </span>
  );
};
