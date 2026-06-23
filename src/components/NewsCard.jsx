import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function NewsCard({ story, onExplain }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTopicColorClasses = (topic) => {
    switch (topic) {
      case 'AI':
        return 'bg-purple-600/20 text-purple-400 border-purple-600/30';
      case 'Tech':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      case 'Geopolitics':
        return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      default:
        return 'bg-gray-700/20 text-gray-400 border-gray-700/30';
    }
  };

  return (
    <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTopicColorClasses(story.topic)}`}>
              {story.topic}
            </span>
            {story.source && (
              <span className="text-xs text-gray-500">{story.source}</span>
            )}
          </div>
          
          <h3 className="text-base font-semibold text-white mb-1 leading-snug">
            {story.title}
          </h3>
          
          <p className="text-sm text-gray-400 leading-relaxed">
            {story.teaser}
          </p>

          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              {story.summary}
            </p>
            
            <button
              onClick={() => onExplain(story)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Explain this to me →
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-800 rounded transition-colors flex-shrink-0"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NewsCard;
