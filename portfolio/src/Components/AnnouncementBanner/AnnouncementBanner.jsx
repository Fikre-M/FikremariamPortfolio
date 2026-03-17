import { useState } from "react";
import { FaTools, FaTimes } from "react-icons/fa";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-3 flex-1 justify-center text-sm sm:text-base">
        <FaTools className="shrink-0 animate-pulse" />
        <p className="text-center">
          Some projects are still in progress — thanks for your patience while I put the finishing touches on them!
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 p-1 hover:bg-blue-800 rounded transition-colors duration-200"
        aria-label="Dismiss"
      >
        <FaTimes />
      </button>
    </div>
  );
}
