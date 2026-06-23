import { RefreshCw } from 'lucide-react';

function Header({ lastUpdated, onRefresh, isLoading }) {
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <header className="px-5 pt-6 pb-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-extrabold italic text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
              Briefed
            </h1>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1.5 tracking-wide">
            Updated {getTimeAgo(lastUpdated)}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 disabled:opacity-40"
          aria-label="Refresh news"
        >
          <RefreshCw
            className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
