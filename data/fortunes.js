// Simple encryption to make it harder to view all fortunes
const encryptFortune = (text) => {
  return Buffer.from(text).toString('base64');
};

const fortunes = [
  "A pigeon will eye your sandwich today. Stand strong.",
  "You will find a sock, but it won't match any others you own.",
  "A stranger will compliment your shoes. Wear your fanciest pair.",
  "The stars say today is a great day… for snacks.",
  "Someone will ask you a question, and your answer will surprise even you.",
  "Your favorite song is about to play. Turn up the volume.",
  "A typo you make will lead to a hilarious misunderstanding.",
  "Beware of ice cream that looks too perfect.",
  "You'll laugh at the same meme twice today.",
  "A cat will cross your path. It may or may not be lucky.",
  "You are one good decision away from a fantastic day.",
  "Keep going. Future-you is cheering you on.",
  "Your ideas are worth sharing—don't hold back.",
  "Big things often start with small, bold steps.",
  "The journey is more important than the speed.",
  "Something you've been waiting for is closer than you think.",
  "Take a leap of faith today. The net will appear.",
  "Progress, not perfection, will take you far.",
  "You've got this. And if you don't, you'll figure it out.",
  "The best version of you is already inside—let it shine.",
  "You'll accidentally say 'you too' when someone says, 'Happy Birthday.'",
  "A bird will sing directly to you today. Or at least it'll feel like it.",
  "A random object in your home will seem suspiciously out of place.",
  "Someone will explain something to you as if you don't already know it. Nod wisely.",
  "You will discover the joy of folding laundry… for 30 seconds.",
  "A meeting you attend will start late, but no one will acknowledge it.",
  "Someone you know will say, 'What's for dinner?' and expect you to know.",
  "You will find a snack in your bag that you forgot was there. Celebrate this.",
  "A YouTube rabbit hole awaits you this evening. Choose wisely.",
  "The answer to your question is: '42.'",
  "An exciting opportunity is coming your way.",
  "A loyal friend will bring you unexpected joy.",
  "Today's efforts will lead to tomorrow's rewards.",
  "Good news will arrive when you least expect it.",
  "Your kindness will inspire someone today.",
  "A small act of courage will make a big difference.",
  "A smile is your secret weapon today—use it often.",
  "Happiness is not a destination; it's the journey.",
  "The harder you work, the luckier you'll get.",
  "Your perseverance is about to pay off.",
  "A squirrel is judging you. Don't take it personally.",
  "Someone nearby will sneeze twice. Bless them generously.",
  "A mysterious package will arrive today—it's called 'your mail.'",
  "Beware of the color orange today. No reason, just vibes.",
  "A cup of coffee will give you more than caffeine—it'll give you hope.",
  "Your inbox will finally reach 'inbox zero.' Relish the moment.",
  "You will lose a pen today, but it'll reappear next week.",
  "Someone will call you by the wrong name. Roll with it.",
  "Your next snack will be legendary. Choose wisely.",
  "An unexpected delay will save you from a bigger inconvenience.",
  "An old song will bring back fond memories today.",
  "Your intuition will surprise you—it's sharper than you think.",
  "A compliment you give will make someone's day.",
  "The universe has a surprise for you. It's small but delightful.",
  "A fortune cookie a day keeps the bad vibes away. Keep it up!",
  "Today is a great day to start something small but meaningful.",
  "A tiny mistake will lead to an amusing story. Enjoy it.",
  "Your next dream will feature a cameo from a celebrity. Stay tuned.",
  "Beware of people who say, 'Trust me.' Proceed with caution.",
  "An unexpected message will brighten your day.",
  "You'll discover a new favorite food this week.",
  "Your next big idea will come while you're in the shower.",
  "Someone will ask you for advice and actually listen to it.",
  "A happy accident will lead to a fun discovery.",
  "The stars align for you today—metaphorically, not literally.",
  "A small act of kindness will come back to you tenfold.",
  "You will find joy in the little things today. Look closely.",
  "An old friend will resurface, bringing good vibes.",
  "Today, you are exactly where you need to be. Trust the timing.",
  "You'll realize something you thought was lost is still within you.",
  "A fun coincidence will make you smile today.",
  "Your bravery will inspire someone silently watching you.",
  "Take a deep breath. Clarity is closer than you think.",
  "The most exciting journeys begin with an uncertain step.",
  "Your sense of humor will defuse an awkward situation today.",
  "You are a magnet for good vibes today. Enjoy it.",
  "A small surprise will remind you that life is unpredictable.",
  "Someone will look to you for leadership—step up confidently.",
  "You will encounter a pun so bad, it's actually good.",
  "Laughter is contagious, and you're about to spread it.",
  "Be curious today. It will lead to something unexpected.",
  "A tiny moment of joy will have a ripple effect. Savor it.",
  "You will find strength in unexpected places today."
].map(fortune => encryptFortune(fortune));

// Get user's seen fortunes from localStorage
const getSeenFortunes = () => {
  try {
    const seenFortunes = localStorage.getItem('seenFortunes');
    return seenFortunes ? JSON.parse(seenFortunes) : [];
  } catch (error) {
    console.error('Error reading seen fortunes:', error);
    return [];
  }
};

// Save seen fortunes to localStorage
const saveSeenFortunes = (seenFortunes) => {
  try {
    localStorage.setItem('seenFortunes', JSON.stringify(seenFortunes));
  } catch (error) {
    console.error('Error saving seen fortunes:', error);
  }
};

// Get a random unseen fortune
export const getFortuneForUser = () => {
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

export const decryptFortune = (encryptedFortune) => {
  return Buffer.from(encryptedFortune, 'base64').toString('utf-8');
}; 