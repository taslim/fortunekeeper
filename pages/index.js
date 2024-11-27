import React, { useState, useEffect } from 'react';
import { Share2, Heart, Clock } from 'lucide-react';
import Cookies from 'js-cookie';
import { getFortuneForUser, decryptFortune } from '../data/fortunes';

const FortuneCookie = () => {
  const [cookieState, setCookieState] = useState('ready');
  const [fortune, setFortune] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const lastCracked = Cookies.get('lastCracked');
    const today = new Date().toDateString();
    
    if (lastCracked === today) {
      const savedFortune = Cookies.get('currentFortune');
      if (savedFortune) {
        setFortune(decryptFortune(savedFortune));
        setCookieState('revealed');
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const breakCookie = () => {
    setCookieState('cracked');
    setTimeout(() => {
      const todaysFortune = getFortuneForUser();
      const decryptedFortune = decryptFortune(todaysFortune);
      setCookieState('revealed');
      setFortune(decryptedFortune);
      
      // Set cookies
      Cookies.set('lastCracked', new Date().toDateString());
      Cookies.set('currentFortune', todaysFortune);
    }, 1500);
  };

  const shareFortune = async () => {
    const shareText = `🥠 My Fortune Cookie says:\n"${fortune}"\n\nGet your daily fortune at [your-website-url]!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          text: shareText
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Fortune copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Fortune copied to clipboard!');
      } catch (clipboardError) {
        alert('Unable to share or copy fortune');
      }
    }
  };

  const WholeCookie = () => (
    <svg viewBox="0 0 300 150" className="w-full h-full">
      <path
        d="M45 75 Q75 30 150 30 Q225 30 255 75 Q225 120 150 120 Q75 120 45 75"
        fill="#FFD784"
        className="cookie-shadow"
      />
      <path
        d="M255 75 Q247 82 240 85"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="90" cy="67" r="1.5" fill="#000" opacity="0.3" />
      <circle cx="210" cy="67" r="1.5" fill="#000" opacity="0.3" />
      <circle cx="112" cy="97" r="1.5" fill="#000" opacity="0.3" />
      <circle cx="187" cy="97" r="1.5" fill="#000" opacity="0.3" />
    </svg>
  );

  const CrackedCookie = () => (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-4/5 aspect-[2/1]">
          <div 
            className="absolute inset-0 origin-right transition-all duration-700 ease-out" 
            style={{transform: 'rotate(-3deg) translateX(-10%)'}}
          >
            <svg viewBox="0 0 300 150">
              <path
                d="M45 75 Q75 30 150 30 L150 75 L150 120 Q75 120 45 75"
                fill="#FFD784"
                className="cookie-shadow"
              />
              <circle cx="90" cy="67" r="1.5" fill="#000" opacity="0.3" />
              <circle cx="112" cy="97" r="1.5" fill="#000" opacity="0.3" />
            </svg>
          </div>
          
          <div 
            className="absolute inset-0 origin-left transition-all duration-700 ease-out"
            style={{transform: 'rotate(3deg) translateX(10%)'}}
          >
            <svg viewBox="0 0 300 150">
              <path
                d="M150 30 Q225 30 255 75 Q225 120 150 120 L150 75 L150 30"
                fill="#FFD784"
                className="cookie-shadow"
              />
              <path
                d="M255 75 Q247 82 240 85"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle cx="210" cy="67" r="1.5" fill="#000" opacity="0.3" />
              <circle cx="187" cy="97" r="1.5" fill="#000" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
      <div className="text-center mb-8">
        {cookieState === 'ready' && (
          <h2 className="text-2xl font-bold text-amber-800 mb-2">
            Your fortune cookie is ready!
          </h2>
        )}
        <p className="text-amber-600">
          {cookieState === 'ready' ? 'Click to break it open' : ''}
        </p>
      </div>

      <div className="relative w-full max-w-sm aspect-square">
        {cookieState === 'ready' && (
          <div
            className="absolute inset-0 cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center"
            onClick={breakCookie}
          >
            <div className="w-4/5 aspect-[2/1]">
              <WholeCookie />
            </div>
          </div>
        )}

        {cookieState === 'cracked' && (
          <div className="absolute inset-0">
            <CrackedCookie />
          </div>
        )}

        {cookieState === 'revealed' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-4/5 animate-slide-up">
              <p className="text-lg text-gray-800 italic mb-4">{fortune}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart 
                    className={`w-6 h-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                  />
                </button>
                <button
                  onClick={shareFortune}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {(cookieState === 'cracked' || cookieState === 'revealed') && (
        <div className="mt-8 flex items-center text-amber-800">
          <Clock className="w-5 h-5 mr-2" />
          <span>Next cookie available at midnight: {timeRemaining}</span>
        </div>
      )}
    </div>
  );
};

export default FortuneCookie; 