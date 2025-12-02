import { Bell, Menu } from "lucide-react";
import { Badge } from "./ui/badge";

interface HeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
}

export function Header({ onNotificationClick, notificationCount }: HeaderProps) {
  return (
    <header
      className="sticky top-0 text-white px-4 py-4 z-10 shadow-md"
      style={{ background: "#003366" }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">

        {/* LEFT AREA */}
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6" />

          {/* USER INFO BLOCK */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Profile"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                objectFit: "cover",
                background: "white",
              }}
            />

            {/* Text */}
            <div className="leading-tight">
              <div className="text-sm font-semibold">Bopat Lelono</div>
              <div className="text-[11px] opacity-80">
                00149891 / Team Member - RO
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-4">

          {/* Square Image beside bell */}
          <img
            src="https://play-lh.googleusercontent.com/-uBpLnnTm6qwrezS8jsdMU_E_J2Jg4ZaGxBsx6kPXCxsDwDniHJVxRLoGqtrRVq8mO4"
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />

          {/* Notification Button */}
          <button onClick={onNotificationClick} className="relative">
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-2 border-white">
                {notificationCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
