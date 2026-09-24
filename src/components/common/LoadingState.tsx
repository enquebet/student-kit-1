import React from 'react';
import { Loader2, Wrench } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  fullScreen?: boolean;
}

export function LoadingState({ 
  message = "Loading tool...", 
  subtext = "Preparing calculator & client-side engines",
  fullScreen = false
}: LoadingStateProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    : "min-h-[45vh] flex items-center justify-center p-6 w-full";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
            <Wrench className="w-7 h-7 text-blue-600 animate-pulse" />
          </div>
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute -top-2 -right-2 drop-shadow-sm" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1.5">
          {message}
        </h3>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
          {subtext}
        </p>

        <div className="mt-5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
}
