import { Home, CalendarDays, MessageCircle, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "dashboard", label: "Beranda", icon: Home },
    { id: "organizer", label: "Organizer", icon: CalendarDays },
    { id: "pesan", label: "Pesan", icon: MessageCircle },
    { id: "settings", label: "Akun", icon: User }, // settings → akun
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-10 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
