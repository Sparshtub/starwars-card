import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder: string;
  icon?: React.ReactNode;
  searchable?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  icon,
  searchable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between pl-9 pr-3 py-2 sm:py-2.5 bg-slate-950/80 border rounded-xl text-xs sm:text-sm text-left font-sans transition-all cursor-pointer ${
          isOpen || value
            ? 'border-amber-500/60 ring-1 ring-amber-500/60 text-slate-100'
            : 'border-slate-800 text-slate-300 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-2 truncate">
          {icon && <span className="absolute left-3 top-2.5 sm:top-3 text-slate-500">{icon}</span>}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-400' : ''
          }`}
        />
      </button>

      {/* Floating Compact Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-slate-900 border border-slate-700/80 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl overflow-hidden animate-fade-in">
          {/* Quick Search Header inside Dropdown if > 15 options (e.g. 60+ Planets) */}
          {searchable && options.length > 15 && (
            <div className="p-2 border-b border-slate-800/80 bg-slate-950/80 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                autoFocus
                className="w-full pl-7 pr-7 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 font-mono"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Scrollable Options List - Generous Visible Height */}
          <div className="max-h-64 sm:max-h-80 overflow-y-auto py-1 font-sans text-xs sm:text-sm custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-slate-500 text-center font-mono">
                No matching options
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value || 'all-option'}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 text-amber-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
