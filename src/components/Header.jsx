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
    <header className="px-4 py-4 border-b border-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Briefed</h1>
          <p className="text-xs text-gray-400 mt-1">
            Last updated {getTimeAgo(lastUpdated)}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          aria-label="Refresh news"
        >
          <RefreshCw 
            className={`w-5 h-5 text-gray-400 ${isLoading ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
