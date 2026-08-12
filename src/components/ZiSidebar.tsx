"use client";

interface ZiGroupItem {
  name: string;
  link: string;
}

interface ZiGroup {
  id: string;
  title: string;
  items: ZiGroupItem[];
}

interface ZiSidebarProps {
  uploadGroups: ZiGroup[];
  contohGroups: ZiGroup[];
}

export default function ZiSidebar({ uploadGroups, contohGroups }: ZiSidebarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(`zi-group-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderNav = (groups: ZiGroup[]) => {
    return groups.map((group) => (
      <button
        key={group.id}
        onClick={() => scrollTo(group.id)}
        className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-gray-100 hover:text-[#0072BC] transition-all"
      >
        {group.title}
      </button>
    ));
  };

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:sticky md:top-24">
        <div className="flex items-center gap-2 px-2 mb-4">
          <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
          <h3 className="font-bold text-[#0072BC] uppercase text-sm tracking-wide">
            Navigasi ZI
          </h3>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <p className="px-2 mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
              Link Upload
            </p>
            <nav className="space-y-1">{renderNav(uploadGroups)}</nav>
          </div>

          <div>
            <p className="px-2 mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
              Link Contoh Bukti Dukung
            </p>
            <nav className="space-y-1">{renderNav(contohGroups)}</nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
