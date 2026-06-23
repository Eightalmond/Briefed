import { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPills from './components/FilterPills';
import NewsFeed from './components/NewsFeed';

function App() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchNews = async () => {
    setIsLoading(true);
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
  };

  const handleExplain = async (story) => {
    const question = prompt('What would you like to know about this story?');
    if (!question) return;

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story: {
            title: story.title,
            summary: story.summary,
          },
          question,
        }),
      });

      if (!response.ok) throw new Error('Failed to get explanation');
      const data = await response.json();
      alert(data.explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      alert('Failed to get explanation. Please try again.');
    }
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
    </div>
  );
}

export default App;
