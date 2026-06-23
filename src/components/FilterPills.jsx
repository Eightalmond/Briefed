function FilterPills({ active, onChange }) {
  const filters = ['All', 'AI', 'Tech', 'Geopolitics'];

  const getStyles = (filter) => {
    const isActive = active === filter;

    const base = 'px-3.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap';

    if (!isActive) {
      return `${base} border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/10 bg-transparent`;
    }

    switch (filter) {
      case 'AI':
        return `${base} border-violet-500/50 text-violet-300 bg-violet-500/10 glow-violet`;
      case 'Tech':
        return `${base} border-cyan-500/50 text-cyan-300 bg-cyan-500/10 glow-cyan`;
      case 'Geopolitics':
        return `${base} border-amber-500/50 text-amber-300 bg-amber-500/10 glow-amber`;
      default:
        return `${base} border-white/20 text-white bg-white/5 glow-white`;
    }
  };

  return (
    <div className="px-5 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={getStyles(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPills;
