import React from 'react';

export function Badge({ 
  children, 
  variant = 'blue', // 'blue', 'teal', 'emerald', 'rose', 'slate', 'amber'
  size = 'md',
  className = '' 
}) {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/70',
    teal: 'bg-teal-50 text-teal-700 border-teal-200/70',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/70',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/70',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
    lg: 'text-sm px-3.5 py-1.5 rounded-full font-semibold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 border ${variantStyles[variant] || variantStyles.blue} ${sizeStyles[size] || sizeStyles.md} transition-colors ${className}`}>
      {children}
    </span>
  );
}

export function GlassCard({
  children,
  className = '',
  interactive = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 ${
        interactive ? 'glass-card-interactive cursor-pointer' : 'glass-card'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
