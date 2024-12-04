import React, { useState, useEffect } from 'react';
import { Share2, Heart, Clock } from 'lucide-react';
import Cookies from 'js-cookie';
import { WholeCookie, CrackedCookie } from '../components/CookieSVG';
import { decryptFortune, getSeenFortunes, saveSeenFortunes, shareFortune } from '../utils/fortune';
import { fortunes } from '../data/fortunes';

const COOKIE_EXPIRY = {
  path: '/',
  expires: 1, // 1 day
  sameSite: 'strict'
};

const FortuneCookie = () => {
  const [cookieState, setCookieState] = useState('ready');
  const [fortune, setFortune] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Check for existing fortune on mount
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

  // Countdown timer
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

  // Get a random unseen fortune
  const getFortuneForUser = () => {
    const seenFortunes = getSeenFortunes();
    
    // If user has seen all fortunes, reset the list
    if (seenFortunes.length >= fortunes.length) {
      saveSeenFortunes([]);
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    }
    
    // Get unseen fortunes
    const unseenFortunes = fortunes.filter(fortune => !seenFortunes.includes(fortune));
    
    // Pick a random unseen fortune
    const randomIndex = Math.floor(Math.random() * unseenFortunes.length);
    const selectedFortune = unseenFortunes[randomIndex];
    
    // Add to seen fortunes
    saveSeenFortunes([...seenFortunes, selectedFortune]);
    
    return selectedFortune;
  };

  const breakCookie = () => {
    setCookieState('cracked');
    setTimeout(() => {
      const todaysFortune = getFortuneForUser();
      const decryptedFortune = decryptFortune(todaysFortune);
      setCookieState('revealed');
      setFortune(decryptedFortune);
      
      // Set cookies for daily limit
      Cookies.set('lastCracked', new Date().toDateString(), COOKIE_EXPIRY);
      Cookies.set('currentFortune', todaysFortune, COOKIE_EXPIRY);
    }, 1500);
  };

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
                  title={isSaved ? 'Unlike' : 'Like'}
                >
                  <Heart 
                    className={`w-6 h-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                  />
                </button>
                <button
                  onClick={() => shareFortune(fortune)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Share"
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