export const WholeCookie = () => (
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

export const CrackedCookie = () => (
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