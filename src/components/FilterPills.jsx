function FilterPills({ active, onChange }) {
  const filters = ['All', 'AI', 'Tech', 'Geopolitics'];
  
  const getColorClasses = (filter) => {
    const isActive = active === filter;
    
    switch (filter) {
      case 'AI':
        return isActive
          ? 'bg-purple-600 text-white border-purple-600'
          : 'border-purple-600 text-purple-400 hover:bg-purple-600/10';
      case 'Tech':
        return isActive
          ? 'bg-blue-600 text-white border-blue-600'
          : 'border-blue-600 text-blue-400 hover:bg-blue-600/10';
      case 'Geopolitics':
        return isActive
          ? 'bg-orange-600 text-white border-orange-600'
          : 'border-orange-600 text-orange-400 hover:bg-orange-600/10';
      default:
        return isActive
          ? 'bg-gray-700 text-white border-gray-700'
          : 'border-gray-700 text-gray-400 hover:bg-gray-700/50';
    }
  };

  return (
    <div className="px-4 py-3 border-b border-gray-800 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${getColorClasses(filter)}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPills;
