// Simple encryption to make it harder to view all fortunes
export const encryptFortune = (text) => {
  return Buffer.from(text).toString('base64');
};

export const decryptFortune = (encryptedFortune) => {
  return Buffer.from(encryptedFortune, 'base64').toString('utf-8');
};

// Get user's seen fortunes from localStorage with error handling
export const getSeenFortunes = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const seenFortunes = localStorage.getItem('seenFortunes');
    return seenFortunes ? JSON.parse(seenFortunes) : [];
  } catch (error) {
    console.error('Error reading seen fortunes:', error);
    return [];
  }
};

// Save seen fortunes to localStorage with error handling
export const saveSeenFortunes = (seenFortunes) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('seenFortunes', JSON.stringify(seenFortunes));
  } catch (error) {
    console.error('Error saving seen fortunes:', error);
  }
};

// Share fortune with error handling
export const shareFortune = async (fortune) => {
  const websiteUrl = window.location.origin;
  const shareText = `🥠 My Fortune Cookie says:\n"${fortune}"\n\nGet your daily fortune at ${websiteUrl}!`;
  
  try {
    if (navigator.share) {
      await navigator.share({ text: shareText });
      return;
    }
    await navigator.clipboard.writeText(shareText);
    alert('Fortune copied to clipboard!');
  } catch (error) {
    if (error.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Fortune copied to clipboard!');
      } catch (clipboardError) {
        console.error('Error sharing:', error);
        alert('Could not share or copy fortune. Please try again.');
      }
    }
  }
}; 