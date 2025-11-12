import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CircleDollarSign,
  AlertTriangle,
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
}

export function Dashboard({ notifications }: DashboardProps) {
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
      {/* Stats Grid */}
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

      {/* Recent Large Withdrawals */}
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
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
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

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performa Portofolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
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
