import NewsCard from './NewsCard';

function NewsFeed({ stories, isLoading, activeFilter, onExplain }) {
  const filteredStories = activeFilter === 'All'
    ? stories
    : stories.filter(story => story.topic === activeFilter);

  if (isLoading) {
    return (
      <div className="px-5 py-6 space-y-3">
        <p className="text-sm font-medium text-center mb-5 text-gradient-loading">
          Fetching your briefing...
        </p>
        {[
          { tag: 'w-12', title: 'w-4/5', teaser: 'w-full' },
          { tag: 'w-16', title: 'w-3/5', teaser: 'w-4/5' },
          { tag: 'w-20', title: 'w-3/4', teaser: 'w-2/3' },
        ].map((widths, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-white/[0.04] overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] shimmer-dark rounded-l-xl" />
            <div className="p-4 pl-5">
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-3.5 ${widths.tag} shimmer-dark rounded`} />
                <div className="h-3 w-16 shimmer-dark rounded" />
              </div>
              <div className={`h-4 shimmer-dark rounded mb-2 ${widths.title}`} />
              <div className={`h-3.5 shimmer-dark rounded ${widths.teaser}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredStories.length === 0) {
    return (
      <div className="px-5 py-12 text-center">
        <p className="text-sm text-gray-600">No stories found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 space-y-3">
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
