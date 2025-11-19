import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TrendingUp,
  Users,
  CircleDollarSign,
  AlertTriangle,
  FileInput,
  Briefcase,
  Settings as SettingsIcon,
  GitMerge,
  Lightbulb,
  Activity,
  Layers,
  BarChart,
  Folder,
  Bookmark,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface Notification {
  id: number;
  customerName: string;
  amount: number;
  timestamp: string;
  type: "withdrawal" | "deposit";
}

interface DashboardProps {
  notifications: Notification[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Dashboard({ notifications, activeTab, onTabChange }: DashboardProps) {
  const stats = [
    {
      title: "Total Nilai Portofolio",
      value: "Rp 2.847.392.322",
      change: "+12.5%",
      trend: "up",
      icon: CircleDollarSign,
    },
    {
      title: "Nasabah Aktif",
      value: "247",
      change: "+8",
      trend: "up",
      icon: Users,
    },
    {
      title: "Penarikan Besar",
      value: "12",
      change: "Hari Ini",
      trend: "warning",
      icon: AlertTriangle,
    },
    {
      title: "Pertumbuhan Bulanan",
      value: "+8.4%",
      change: "vs bulan lalu",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-4">

      {/* SEARCH BAR */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* MAIN FEATURE — 1x4 BUTTONS WITH ICONS */}
      <Card className="p-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Main Feature</h2>

        <div className="flex items-center justify-between gap-2">
          {[
            { label: "Pipeline Management", icon: GitMerge, action: "leads" },
            { label: "Prakarsa", icon: Lightbulb, action: "input" },
            { label: "Monitoring", icon: Activity, action: "customers" },
            { label: "Button 4", icon: Layers, action: null },
          ].map((btn, i) => {
            const Icon = btn.icon;
            return (
              <button
                key={i}
                onClick={() => btn.action && onTabChange(btn.action)}
                className="flex-1 py-2 text-xs text-gray-700 bg-gray-100 
                           rounded-lg text-center hover:bg-gray-200 transition flex flex-col items-center gap-1"
              >
                <Icon className="w-4 h-4" />
                {btn.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* OTHER FEATURE — 1x4 BUTTONS WITH ICONS */}
      <Card className="p-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Other Feature</h2>

        <div className="flex items-center justify-between gap-2">
          {[
            { label: "Sales Kit", icon: Briefcase },
            { label: "Reporting", icon: BarChart },
            { label: "Button 3", icon: Folder },
            { label: "Button 4", icon: Bookmark },
          ].map((btn, i) => {
            const Icon = btn.icon;
            return (
              <button
                key={i}
                className="flex-1 py-2 text-xs text-gray-700 bg-gray-100 
                           rounded-lg text-center hover:bg-gray-200 transition flex flex-col items-center gap-1"
              >
                <Icon className="w-4 h-4" />
                {btn.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* INTERNAL NAV MENU — 2x2 GRID */}
      {/* <div className="grid grid-cols-2 gap-3">
        {[
          { id: "input", label: "Input", icon: FileInput },
          { id: "leads", label: "Leads", icon: Briefcase },
          { id: "customers", label: "Customer", icon: Users },
          { id: "settings", label: "Akun", icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-2 py-4 
                          rounded-xl border transition ${
                            activeTab === tab.id
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 bg-white text-gray-600"
                          }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div> */}

      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon
                    className={`w-4 h-4 ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "warning"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  />
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-1">
                  <div>{stat.value}</div>
                  <div
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "warning"
                        ? "text-orange-600"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RECENT WITHDRAWALS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Penarikan Besar Terkini</span>
            <Badge variant="destructive">{notifications.length}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Tidak ada penarikan besar hari ini
            </p>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-3 
                           bg-red-50 rounded-lg border border-red-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>{notification.customerName}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {notification.timestamp}
                  </div>
                </div>

                <div className="text-red-600 font-medium">
                  -Rp {notification.amount.toLocaleString("id-ID")}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* PERFORMANCE CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Performa Portofolio</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 
                          rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <p>Visualisasi Grafik</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
