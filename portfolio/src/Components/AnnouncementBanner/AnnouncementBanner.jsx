import { useState } from "react";
import { FaTools, FaTimes } from "react-icons/fa";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes colorShift {
          0%   { color: #60a5fa; }
          25%  { color: #f472b6; }
          50%  { color: #34d399; }
          75%  { color: #fbbf24; }
          100% { color: #60a5fa; }
        }
        .marquee-text {
          display: inline-block;
          animation: marquee 40s linear infinite, colorShift 6s ease-in-out infinite;
          white-space: nowrap;
          font-weight: 600;
          font-size: 0.95rem;
        }
        @keyframes toolSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: toolSpin 2s linear infinite;
        }
      `}</style>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 to-blue-600 border-t border-blue-500 px-4 py-3 flex items-center gap-3 shadow-lg overflow-hidden">
        <FaTools className="spin-icon shrink-0 text-blue-400 text-lg" />
        <div className="flex-1 overflow-hidden">
          <span className="marquee-text">
            🚧 Some projects are still in progress — thanks for your patience while I put the finishing touches on them! &nbsp;&nbsp;&nbsp; 🚧 Some projects are still in progress — thanks for your patience while I put the finishing touches on them!
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-1 text-white/70 hover:text-white hover:bg-blue-800 rounded transition-colors duration-200"
          aria-label="Dismiss"
        >
          <FaTimes />
        </button>
      </div>
    </>
  );
}
