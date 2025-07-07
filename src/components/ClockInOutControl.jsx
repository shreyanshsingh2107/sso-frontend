import { useState } from 'react';

export default function ClockInOutControl() {
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
    <>
      {/* FULL BUTTON - shown only before clock-in */}
      {!isClockedIn && (
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleClick}
            className="w-80 h-14 px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-600 font-medium bg-white shadow-lg
              transition-all duration-300 hover:bg-purple-50"
          >
            Clock-in
          </button>
        </div>
      )}

      {/* SMALL FAB - shown after clock-in */}
      {isClockedIn && (
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow-lg transition-all duration-300 hover:bg-purple-700"
          >
            ⏱️ Clocked in at {clockInTime}
          </button>
        </div>
      )}
    </>
  );
}
