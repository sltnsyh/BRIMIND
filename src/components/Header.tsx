import { Bell, Menu } from "lucide-react";
import { Badge } from "./ui/badge";

interface HeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
}

export function Header({ onNotificationClick, notificationCount }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 z-10 shadow-md">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6" />
          <div>
            <div className="text-xs opacity-90">BRIMIND</div>
            <h1>Dashboard Keuangan</h1>
          </div>
        </div>
        <button onClick={onNotificationClick} className="relative">
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-2 border-white">
              {notificationCount}
            </Badge>
          )}
        </button>
      </div>
    </header>
  );
}