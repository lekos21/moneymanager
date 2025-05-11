import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const DateRangeSelector = ({ onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('thisMonth');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Predefined date ranges
  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'thisWeek', label: 'This Week' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' },
    { id: 'last3Months', label: 'Last 3 Months' },
    { id: 'thisYear', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  // Calculate actual date range based on selection
  const getDateRange = (rangeId) => {
    const today = new Date();
    let startDate, endDate;
    
    switch (rangeId) {
      case 'today':
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case 'thisWeek':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        endDate = new Date(today);
        break;
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'last3Months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        endDate = new Date(today);
        break;
      case 'thisYear':
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today);
        break;
      case 'custom':
        startDate = customStartDate ? new Date(customStartDate) : null;
        endDate = customEndDate ? new Date(customEndDate) : null;
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today);
    }
    
    return { startDate, endDate };
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Handle range selection
  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    setIsOpen(false);
    
    const { startDate, endDate } = getDateRange(rangeId);
    onDateRangeChange({ startDate, endDate, rangeId });
  };

  // Handle custom date changes
  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      const { startDate, endDate } = getDateRange('custom');
      onDateRangeChange({ startDate, endDate, rangeId: 'custom' });
      setIsOpen(false);
    }
  };

  // Get current range display text
  const getCurrentRangeText = () => {
    if (selectedRange === 'custom' && customStartDate && customEndDate) {
      return `${formatDate(new Date(customStartDate))} - ${formatDate(new Date(customEndDate))}`;
    }
    
    const range = dateRanges.find(r => r.id === selectedRange);
    return range ? range.label : 'This Month';
  };

  return (
    <div className="relative">
      {/* Date range selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-sm"
      >
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-700 font-medium">{getCurrentRangeText()}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-2">
            {dateRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handleRangeSelect(range.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedRange === range.id
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Custom date range inputs */}
          {selectedRange === 'custom' && (
            <div className="p-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={handleCustomDateChange}
                disabled={!customStartDate || !customEndDate}
                className={`w-full py-2 text-sm rounded-lg text-center ${
                  customStartDate && customEndDate
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                Apply Custom Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
