import React from 'react';

export default function EditDialogSkeleton() {
  return (
    <div className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 
                    md:-translate-x-1/2 md:-translate-y-1/2 
                    bg-white rounded-2xl shadow-2xl 
                    z-[var(--z-index-modal)] 
                    max-w-2xl w-full max-h-[85vh] 
                    flex flex-col overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-gradient-primary text-white px-6 py-4 flex items-center justify-between">
        <div className="h-7 w-32 bg-white/30 rounded-md animate-pulse"></div>
        <div className="h-8 w-8 rounded-full bg-white/30 animate-pulse"></div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Amount and currency skeleton */}
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="w-1/3 space-y-2">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Short description skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Full message skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Tags skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-4">
            {/* Search bar skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
            
            {/* Tabs skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            
            {/* Tags grid skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
        <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-10 w-32 bg-purple-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}
