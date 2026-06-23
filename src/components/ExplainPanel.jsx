import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.06] w-fit">
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function ExplainPanel({ story, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    sendMessage("Explain this story to me in simple terms, like I'm new to this topic", true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // TODO: Remove mock and use real /api/explain when ready
  const sendMessage = async (question, isInitial = false) => {
    if (!isInitial) {
      setMessages(prev => [...prev, { role: 'user', content: question }]);
    }
    setIsTyping(true);

    /* Uncomment when API is ready:
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story: { title: story.title, summary: story.summary },
          question,
        }),
      });
      if (!response.ok) throw new Error('Failed to get explanation');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.explanation }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I couldn\'t generate an explanation. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
    */

    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "This is a placeholder explanation. The real Claude response will appear here once the API key is configured."
    }]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setInput('');
    sendMessage(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-[480px] h-[75vh] bg-surface-raised border-t border-white/[0.08] rounded-t-2xl flex flex-col transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-5 pb-3 border-b border-white/[0.06]">
          <h2 className="text-[14px] font-bold text-white leading-snug line-clamp-2">
            {story.title}
          </h2>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white/[0.08] text-gray-200 rounded-2xl rounded-br-sm'
                    : 'bg-white/[0.04] text-gray-300 rounded-2xl rounded-bl-sm border border-white/[0.04]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <TypingDots />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up..."
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:bg-white/[0.05] disabled:text-gray-600 text-white transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExplainPanel;
