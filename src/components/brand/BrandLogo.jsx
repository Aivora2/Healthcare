import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ 
  size = 'md', 
  showTagline = true, 
  iconOnly = false,
  className = '',
  to = '/' 
}) {
  // Size mappings
  const heightClasses = {
    sm: iconOnly ? 'h-7' : 'h-8',
    md: iconOnly ? 'h-9' : 'h-10',
    lg: iconOnly ? 'h-12' : 'h-14',
    xl: iconOnly ? 'h-16' : 'h-18',
  };

  const imageSrc = iconOnly 
    ? '/assets/images/caresetu-emblem.png' 
    : '/assets/images/caresetu-logo.png';

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img 
        src={imageSrc} 
        alt="CareSetu Logo - Care Today. A Healthier Tomorrow." 
        className={`${heightClasses[size] || 'h-10'} w-auto object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]`}
        onError={(e) => {
          // Graceful fallback to inline vector representation if image loading fails
          e.target.style.display = 'none';
          const fallback = e.target.nextElementSibling;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      {/* Fallback Vector Logo */}
      <div className="hidden items-center gap-2.5" style={{ display: 'none' }}>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-caresetu-blue-600 via-caresetu-blue-500 to-caresetu-teal-400 p-0.5 shadow-md">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-caresetu-blue-600 font-extrabold text-xl">C</span>
          </div>
        </div>
        {!iconOnly && (
          <div className="flex flex-col">
            <div className="text-xl font-bold tracking-tight leading-none">
              <span className="text-slate-900 font-extrabold">Care</span>
              <span className="text-caresetu-teal-600 font-extrabold">Setu</span>
            </div>
            {showTagline && (
              <span className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
                Care Today. A Healthier Tomorrow.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-caresetu-blue-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
