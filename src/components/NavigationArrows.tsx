import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationArrowsProps {
  onUpClick: () => void;
  onDownClick: () => void;
}

export default function NavigationArrows({ onUpClick, onDownClick }: NavigationArrowsProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      <button
        onClick={onUpClick}
        className="p-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors"
        aria-label="Scroll Up"
      >
        <ChevronUp className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={onDownClick}
        className="p-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors"
        aria-label="Scroll Down"
      >
        <ChevronDown className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
