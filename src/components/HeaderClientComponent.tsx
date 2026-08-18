"use client";

import { ChevronDown } from "lucide-react";

export default function HeaderClientComponent() {
  return (
    <button
      onClick={() => {
        const portalSection = document.getElementById("portal-pulau-pedia");
        if (portalSection) {
          portalSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
      aria-label="Scroll ke Portal Pulau Pedia"
    >
      <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
    </button>
  );
}
