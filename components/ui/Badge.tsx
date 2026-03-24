import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'gray' | 'dark' | 'green';
  className?: string;
}

export default function Badge({ children, variant = 'amber', className = '' }: BadgeProps) {
  const variants = {
    amber: 'bg-equora-amber/15 text-equora-amber border border-equora-amber/30',
    gray: 'bg-gray-100 text-gray-500 border border-gray-200',
    dark: 'bg-equora-dark/10 text-equora-dark border border-equora-dark/20',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
