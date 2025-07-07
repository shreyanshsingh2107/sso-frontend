import { useState } from 'react';

const ClockInButton = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('');

  const handleClick = () => {
    if (!isClockedIn) {
      const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setClockInTime(now);
    }
    setIsClockedIn((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-80 h-14 px-6 py-3 rounded-lg font-medium overflow-hidden border-2 
        transition-all duration-10000 ease-in-out
        ${isClockedIn
          ? 'bg-[#00BDD6] text-white border-[#00BDD6]'
          : 'bg-transparent text-[#00BDD6] border-[#00BDD6]'}
      `}
    >
      <div className="relative w-full h-full">
        {/* Clock-in view */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out
          ${!isClockedIn ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-10 z-0'}`}
        >
          Clock-in
        </div>

        {/* Clock-out view */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2  transition-all duration-300 ease-in-out
          ${isClockedIn ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 z-0'}`}
        >
          <span className="font-semibold">Clock out</span>
          <span className="text-white/70">|</span>
          <span className="text-white/90">Clocked in at {clockInTime}</span>
        </div>
      </div>
    </button>
  );
};


export default ClockInButton;