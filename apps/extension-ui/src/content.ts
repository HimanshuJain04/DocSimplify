chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SCRAPE_PAGE') {
    const text = scrapeReadableText();
    sendResponse({ text });
  }
  return true; // needed if you use async sendResponse
});

function scrapeReadableText() {
  const elements = Array.from(
    document.querySelectorAll('p, h1, h2, h3, li, td')
  );
  const visibleText = elements
    .filter((el) => el.offsetParent !== null && el.innerText.trim() !== '')
    .map((el) => el.innerText.trim())
    .join('\n\n');

  return visibleText;
}
