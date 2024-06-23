export const fetchMockUniversities = async (filters) => {
    // Simulate API call with filters applied
    const data = [
      { id: 1, name: 'University A', year: 1990, region: 'North', corpus: 'Corpus A' },
      { id: 2, name: 'University B', year: 2000, region: 'South', corpus: 'Corpus B' },
    ];
  
    // Apply filters to the data
    return data.filter((uni) => {
      return (
        (!filters.year || uni.year === parseInt(filters.year)) &&
        (!filters.region || uni.region.includes(filters.region))
      );
    });
  };