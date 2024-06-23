import React, { useState, useEffect } from 'react';
import { Button, Input, Label } from 'reactstrap';

const FilterComponent = ({ filters, onFilterChange, onClearFilters }) => {
  const [appliedFilters, setAppliedFilters] = useState({});

  // When a filter value changes, update the state and trigger backend request
  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = { ...appliedFilters, [filterKey]: value };
    setAppliedFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent component of filter change
  };

  // Clear all applied filters
  const handleClearFilters = () => {
    setAppliedFilters({});
    onClearFilters(); // Notify parent component to clear filters
  };

  // Effect to trigger backend request whenever appliedFilters change
  useEffect(() => {
    // Example: Send a request to backend with appliedFilters
    // This is where you'd integrate with your backend API
    console.log("Sending request to backend with filters:", appliedFilters);
  }, [appliedFilters]);

  return (
  <>
    <div className='grid grid-cols-3 gap-4 mt-3'>
      {filters.map(filter => (
        <div key={filter.key} className="filter-item">
          <Label htmlFor={filter.key}>{filter.label}</Label>
          {filter.type === 'select' && (
            <select
              id={filter.key}
              value={appliedFilters[filter.key] || ''}
              onChange={e => handleFilterChange(filter.key, e.target.value)}
              className='form-control'
            >
              <option value="">Select...</option>
              {filter.options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
          {filter.type === 'number' && (
            <Input
              type="number"
              id={filter.key}
              value={appliedFilters[filter.key] || ''}
              onChange={e => handleFilterChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === 'date' && (
            <Input
              type="date"
              id={filter.key}
              value={appliedFilters[filter.key] || ''}
              onChange={e => handleFilterChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === 'text' && (
            <Input
              type="text"
              id={filter.key}
              value={appliedFilters[filter.key] || ''}
              onChange={e => handleFilterChange(filter.key, e.target.value)}
            />
          )}
        </div>
      ))}
     
    </div>
     
     <div  className='flex justify-end mt-3'>
     <Button outline onClick={handleClearFilters} className='px-5 rounded-lg '>Clear</Button>
    </div>
  </>
  );
};

export default FilterComponent;
