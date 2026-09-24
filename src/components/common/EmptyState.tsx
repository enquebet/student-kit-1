import React from 'react';
import { SearchX, RotateCcw, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find any tools or items matching your criteria. Try refining your keywords.",
  actionText,
  actionHref,
  onAction,
  icon
}: EmptyStateProps) {
  return (
    <div className="py-12 px-4 text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
        {icon || <SearchX className="w-7 h-7 text-gray-500" />}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-6">
        {description}
      </p>

      {actionText && (
        <div>
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <span>{actionText}</span>
            </Link>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{actionText}</span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
