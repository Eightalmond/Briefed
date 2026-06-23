import NewsCard from './NewsCard';

function NewsFeed({ stories, isLoading, activeFilter, onExplain }) {
  const filteredStories = activeFilter === 'All' 
    ? stories 
    : stories.filter(story => story.topic === activeFilter);

  if (isLoading) {
    return (
      <div className="px-4 py-4 space-y-3">
        <p className="text-sm text-gray-400 text-center mb-4">
          Fetching today's briefing...
        </p>
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="border border-gray-800 rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-16 bg-gray-800 rounded"></div>
              <div className="h-4 w-24 bg-gray-800 rounded"></div>
            </div>
            <div className="h-5 bg-gray-800 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredStories.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-400">No stories found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-3">
      {filteredStories.map((story) => (
        <NewsCard 
          key={story.id} 
          story={story} 
          onExplain={onExplain}
        />
      ))}
    </div>
  );
}

export default NewsFeed;
