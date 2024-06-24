import React, { useState, useEffect } from 'react';
import { Button, Input, Label } from 'reactstrap';

const FilterComponent = ({ filters, onFilterChange, onClearFilters }) => {
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = { ...appliedFilters, [filterKey]: value };
    setAppliedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    onClearFilters();
  };

  useEffect(() => {}, [appliedFilters]);

  const gridClasses = () => {
    if (filters.length === 2) return 'grid-cols-2';
    if (filters.length === 3) return 'grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <>
      <div className={`grid gap-4 mt-3 ${gridClasses()}`}>
        {filters.map((filter) => (
          <div key={filter.key} className="filter-item">
            <Label htmlFor={filter.key} className="block mb-2 text-sm font-medium text-gray-700">
              {filter.label}
            </Label>
            {filter.type === 'select' && (
              <select
                id={filter.key}
                value={appliedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="form-control block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select...</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {filter.type === 'number' && (
              <Input
                type="number"
                id={filter.key}
                placeholder={filter.key}
                value={appliedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            )}
            {filter.type === 'date' && (
              <Input
                type="date"
                id={filter.key}
                value={appliedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            )}
            {filter.type === 'text' && (
              <Input
                type="text"
                placeholder={filter.key}
                id={filter.key}
                value={appliedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-3">
        <Button outline onClick={handleClearFilters} className="px-5 rounded-lg">
          Clear
        </Button>
      </div>
    </>
  );
};

export default FilterComponent;