"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, FileText, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZiSidebar from "@/components/ZiSidebar";

const pillars = [
  "Pilar 1. MANAJEMEN PERUBAHAN",
  "Pilar 2. PENATAAN TATALAKSANA",
  "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR",
  "Pilar 4. PENGUATAN AKUNTABILITAS",
  "Pilar 5. PENGUATAN PENGAWASAN",
  "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK",
];

const pillarItems = pillars.map((p) => ({
  name: p,
  link: "https://drive.google.com/drive/folders/zi-2026",
}));

const uploadGroups = [
  {
    id: "u-0",
    title: "Bukti Dukung ZI 2026 (Pemenuhan)",
    items: pillarItems,
  },
  {
    id: "u-1",
    title: "Bukti Dukung ZI 2026 (Reform)",
    items: pillarItems,
  },
  {
    id: "u-2",
    title: "LKE ZI 2026",
    items: [
      { name: "LKE BPS Kepulauan Seribu 2026", link: "https://drive.google.com/drive/folders/zi-2026" },
    ],
  },
];

const contohGroups = [
  {
    id: "c-0",
    title: "Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)",
    items: pillarItems,
  },
  {
    id: "c-1",
    title: "Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)",
    items: pillarItems,
  },
  {
    id: "c-2",
    title: "LKE ZI BPS Kepulauan Seribu 2025",
    items: [
      { name: "LKE BPS Kepulauan Seribu 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
    ],
  },
  {
    id: "c-3",
    title: "Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)",
    items: pillarItems,
  },
  {
    id: "c-4",
    title: "Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)",
    items: pillarItems,
  },
  {
    id: "c-5",
    title: "LKE ZI BPS Kota Jakarta Timur 2025",
    items: [
      { name: "LKE BPS Kota Jakarta Timur 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
    ],
  },
  {
    id: "c-6",
    title: "Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)",
    items: pillarItems,
  },
  {
    id: "c-7",
    title: "Bukti Dukung ZI RB BPS RI 2024 (Reform)",
    items: pillarItems,
  },
  {
    id: "c-8",
    title: "Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)",
    items: pillarItems,
  },
  {
    id: "c-9",
    title: "Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)",
    items: pillarItems,
  },
  {
    id: "c-10",
    title: "LKE ZI BPS DKI Jakarta 2025",
    items: [
      { name: "LKE BPS DKI Jakarta 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
    ],
  },
];

interface GroupItem {
  name: string;
  link: string;
}

interface Group {
  id: string;
  title: string;
  items: GroupItem[];
}

function DropdownCard({
  title,
  items,
  open,
  onToggle,
}: {
  title: string;
  items: GroupItem[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#0072BC]/10 p-3 rounded-lg shrink-0">
            <FileText className="w-6 h-6 text-[#0072BC]" />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-[#111111] text-left">
            {title}
          </h3>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-gray-200 bg-gray-50">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 hover:bg-white transition-all border-b border-gray-200 last:border-b-0 group"
            >
              <span className="text-gray-700 group-hover:text-[#0072BC] font-medium">
                {item.name}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0072BC] shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Zi2026Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const header = document.getElementById("main-header");
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    observer.observe(header);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderGroups = (groups: Group[], prefix: string) => {
    return groups.map((group) => {
      const key = `${prefix}-${group.id}`;
      return (
        <div key={group.id} id={`zi-group-${group.id}`} className="scroll-mt-20">
          <DropdownCard
            title={group.title}
            items={group.items}
            open={openDropdown === key}
            onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
          />
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled} />

      <header
        id="main-header"
        className="relative h-[30vh] flex items-center border-b-4 border-[#D83F3F] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60 halftone-pattern" />
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl mb-4">
              ZI 2026
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Zona Integritas BPS Kepulauan Seribu
            </p>
          </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Content"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      <section
        id="content-section"
        className="bg-gradient-to-b from-gray-50 to-white py-16 flex-1"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <ZiSidebar uploadGroups={uploadGroups} contohGroups={contohGroups} />

            <div className="flex-1 min-w-0">
              <div className="text-center mb-12">
                <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
                  Zona Integritas 2026
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Pilih kategori untuk mengakses bukti dukung dan LKE ZI 2026
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111]">
                      LINK UPLOAD
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {renderGroups(uploadGroups, "u")}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111]">
                      LINK CONTOH BUKTI DUKUNG
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {renderGroups(contohGroups, "c")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
