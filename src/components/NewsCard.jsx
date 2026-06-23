import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function NewsCard({ story, onExplain }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAccentColor = (topic) => {
    switch (topic) {
      case 'AI': return 'bg-violet-500';
      case 'Tech': return 'bg-cyan-500';
      case 'Geopolitics': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getTagClasses = (topic) => {
    switch (topic) {
      case 'AI': return 'text-violet-400';
      case 'Tech': return 'text-cyan-400';
      case 'Geopolitics': return 'text-amber-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div
      className="group relative rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent hover:border-white/[0.1] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-200 overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${getAccentColor(story.topic)} rounded-l-xl`} />

      <div className="p-4 pl-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${getTagClasses(story.topic)}`}>
                {story.topic}
              </span>
              {story.source && (
                <span className="text-[10px] text-gray-600">
                  {story.source}
                </span>
              )}
            </div>

            <h3 className="text-[15px] font-bold text-white leading-snug mb-1.5">
              {story.title}
            </h3>

            <p className="text-[13px] text-gray-500 leading-relaxed">
              {story.teaser}
            </p>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? 'max-h-[400px] opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-white/[0.04] pt-3">
                <p className="text-[13px] text-gray-400 leading-relaxed mb-4">
                  {story.summary}
                </p>

                <button
                  onClick={() => onExplain(story)}
                  className="text-[12px] font-medium text-violet-400 hover:text-violet-300 transition-colors duration-200 tracking-wide"
                >
                  Explain this to me →
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 flex-shrink-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
