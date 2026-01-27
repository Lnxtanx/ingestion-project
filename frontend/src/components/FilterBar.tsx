import React, { useState, useEffect } from 'react';
import type { LogFilters } from '../types';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: LogFilters) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<LogFilters>({});

  // Debounce filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleChange = (key: keyof LogFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 py-2">
      {/* Container - Single Line Flex */}
      <div className="flex flex-wrap xl:flex-nowrap items-center gap-3">
        
        {/* Search - Flexible Width */}
        <div className="relative flex-grow min-w-[240px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
            onChange={e => handleChange('message', e.target.value)}
          />
        </div>

        {/* Filters Group - Compact Row */}
        <div className="flex items-center gap-2 flex-shrink-0">
          
          {/* Level Filter */}
          <div className="relative w-32">
             <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
            <select
              className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-sm text-gray-700"
              onChange={e => handleChange('level', e.target.value)}
              value={filters.level || ''}
            >
              <option value="">All Levels</option>
              <option value="error">Error</option>
              <option value="warn">Warn</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>

          {/* Resource ID */}
           <div className="relative w-40">
            <input
              type="text"
              placeholder="Resource ID"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 font-mono bg-gray-50/50 focus:bg-white shadow-sm"
              onChange={e => handleChange('resourceId', e.target.value)}
            />
          </div>

          {/* Date Range Start */}
          <div className="relative w-[180px]">
            <input
              type="datetime-local"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 text-gray-600 bg-gray-50/50 focus:bg-white shadow-sm font-mono"
              onChange={e => handleChange('timestamp_start', e.target.value)}
            />
          </div>

          {/* connecting dash */}
          <span className="text-gray-400">-</span>

          {/* Date Range End */}
          <div className="relative w-[180px]">
            <input
              type="datetime-local"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 text-gray-600 bg-gray-50/50 focus:bg-white shadow-sm font-mono"
              onChange={e => handleChange('timestamp_end', e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
