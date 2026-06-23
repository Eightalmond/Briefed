import { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPills from './components/FilterPills';
import NewsFeed from './components/NewsFeed';
import ExplainPanel from './components/ExplainPanel';
import { mockStories } from './mockStories';

function App() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [explainStory, setExplainStory] = useState(null);

  const fetchNews = async () => {
    setIsLoading(true);
    
    // TODO: Remove mock data and uncomment API call when Anthropic key is ready
    // Simulating network delay for realistic loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    setStories(mockStories);
    setLastUpdated(new Date().toISOString());
    setIsLoading(false);

    /* Uncomment when ready to use real API:
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setStories(data);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleExplain = (story) => {
    setExplainStory(story);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-surface bg-noise">
      <div className="min-h-screen bg-gradient-to-b from-[#0c0c14] to-[#050507]">
        <div className="max-w-[480px] mx-auto min-h-screen relative">
          <Header
            lastUpdated={lastUpdated}
            onRefresh={fetchNews}
            isLoading={isLoading}
          />

          <FilterPills
            active={activeFilter}
            onChange={setActiveFilter}
          />

          <NewsFeed
            stories={stories}
            isLoading={isLoading}
            activeFilter={activeFilter}
            onExplain={handleExplain}
          />
        </div>
      </div>

      {explainStory && (
        <ExplainPanel
          story={explainStory}
          onClose={() => setExplainStory(null)}
        />
      )}
    </div>
  );
}

export default App;
