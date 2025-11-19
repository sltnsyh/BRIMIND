import {
  Search,
  Users,
  ClipboardCheck,
  Monitor,
  Megaphone,
  BarChart3,
} from "lucide-react";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="pb-28 bg-[#f3f4f6] min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#003a6f] to-[#0052a3] text-white px-4 pt-10 pb-8 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-xl font-bold">
            B
          </div>

          <div>
            <h2 className="font-semibold text-lg leading-tight">Bopat Lelono</h2>
            <p className="text-sm opacity-90">00149891 / Team Member - RO</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <input
            className="w-full bg-white text-gray-800 rounded-xl py-3 pl-4 pr-10 shadow-md focus:outline-none"
            placeholder="Cari Menu"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* FITUR UTAMA */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Fitur Utama</h3>

        <div className="bg-white rounded-2xl p-5 shadow-md grid grid-cols-3 gap-4 text-center">

          {/* Pipeline */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("input")}
          >
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Pipeline</span>
          </div>

          {/* Prakarsa */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("leads")}
          >
            <div className="p-3 bg-blue-50 rounded-full">
              <ClipboardCheck className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Prakarsa</span>
          </div>

          {/* Monitoring */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("monitoring")}
          >
            <div className="p-3 bg-blue-50 rounded-full">
              <Monitor className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Monitoring</span>
          </div>

        </div>
      </div>

      {/* FITUR LAINNYA */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Fitur Lainnya</h3>

        <div className="bg-white rounded-2xl p-5 shadow-md grid grid-cols-3 gap-4 text-center">

          {/* Sales Kit */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("posts")}
          >
            <div className="p-3 bg-orange-50 rounded-full">
              <Megaphone className="w-7 h-7 text-orange-500" />
            </div>
            <span className="text-sm font-medium">Sales Kit</span>
          </div>

          {/* Reporting */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("reports")}
          >
            <div className="p-3 bg-green-50 rounded-full">
              <BarChart3 className="w-7 h-7 text-green-600" />
            </div>
            <span className="text-sm font-medium">Reporting</span>
          </div>

        </div>
      </div>
    </div>
  );
}
