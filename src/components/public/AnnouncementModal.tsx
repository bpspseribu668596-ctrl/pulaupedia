"use client";

import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";

export default function AnnouncementModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalTimer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(modalTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setShowModal(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md aspect-[3/4] animate-modal-pop flex flex-col">
        <div className="bg-[#D83F3F] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-lg uppercase tracking-wide">
              Pengumuman
            </h2>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-all"
            aria-label="Tutup pengumuman"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-white">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <Megaphone className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-400 font-medium">
            Belum ada pengumuman
          </p>
        </div>
      </div>
    </div>
  );
}
