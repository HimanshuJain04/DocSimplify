import { useState } from 'react';

export default function Popup() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');

    // Send message to content script to scrape text
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async (tabs: chrome.tabs.Tab[]) => {
        if (!tabs[0].id) return;
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'SCRAPE_PAGE' },
          (response) => {
            if (response?.text) {
              // setSummary('🚀 Summary coming soon... (connect backend next)');
              console.log('RES=> ', response.text);
              setSummary(response.text);
            } else {
              setSummary('⚠️ Failed to fetch content.');
            }
            setIsLoading(false);
          }
        );
      }
    );
  };

  return (
    <div className="p-4 w-80 text-sm">
      <h1 className="text-xl font-bold mb-2">DocSimplify</h1>
      <p className="mb-4">Simplify this page's documentation with AI.</p>
      <button
        onClick={handleSummarize}
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 rounded w-full hover:opacity-90"
      >
        {isLoading ? 'Summarizing...' : 'Summarize This Page'}
      </button>

      {summary && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-gray-800">
          {summary}
        </div>
      )}
    </div>
  );
}
