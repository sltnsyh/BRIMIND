import { useState } from "react";
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
  const [creditTab, setCreditTab] = useState<"penarikan" | "realisasi">("penarikan");

  // unified selected item: { kind, id } or null
  const [selected, setSelected] = useState<{ kind: "penarikan" | "realisasi"; id: number } | null>(null);

  return (
    <div className="space-y-4">

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Main Feature */}
      <Card className="p-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Main Feature</h2>

        <div className="flex gap-2">
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
                           rounded-lg hover:bg-gray-200 transition flex flex-col items-center gap-1"
              >
                <Icon className="w-4 h-4" />
                {btn.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Other Feature */}
      <Card className="p-3">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Other Feature</h2>

        <div className="flex gap-2">
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
                           rounded-lg hover:bg-gray-200 transition flex flex-col items-center gap-1"
              >
                <Icon className="w-4 h-4" />
                {btn.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Penarikan vs Realisasi Tabs */}
      <Card>
        <CardHeader>
          <div className="p-1 rounded-xl flex gap-2 bg-gray-200">
            {[
              { id: "penarikan", label: "Penarikan Besar Terkini" },
              { id: "realisasi", label: "Realisasi Kredit Terkini" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setCreditTab(t.id as any);
                  setSelected(null);
                }}
                className="flex-1 py-2 text-sm font-medium rounded-lg transition"
                style={{
                  backgroundColor: creditTab === t.id ? "#4fa3ff" : "#e5e7eb",
                  color: "black",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </CardHeader>

        {/* Wrap content in a relative container so absolute popups can position inside */}
        <CardContent className="space-y-3 relative">

          {/* click-out overlay: covers viewport when popup open to allow outside click to close */}
          {selected && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setSelected(null)}
            />
          )}

          {/* Penarikan list */}
          {creditTab === "penarikan" &&
            (notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Tidak ada penarikan besar hari ini</p>
            ) : (
              notifications.slice(0, 5).map((n) => (
                // Each item is relatively positioned to anchor the absolute popup
                <div key={n.id} className="relative">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected((prev) => (prev && prev.kind === "penarikan" && prev.id === n.id ? null : { kind: "penarikan", id: n.id }));
                    }}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-black">{n.customerName}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{n.timestamp}</div>
                    </div>

                    <div className="text-red-600 font-medium">
                      -Rp {n.amount.toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* absolutely positioned small action button under the item (no layout shift) */}
                  {selected && selected.kind === "penarikan" && selected.id === n.id && (
                    <div
                      className="absolute left-4 top-full mt-2 z-50"
                      // stopPropagation to avoid parent click toggling selection
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          console.log("Added to agenda:", n);
                          // TODO: integrate with real agenda logic if needed
                          setSelected(null);
                        }}
                        className="w-fit text-white text-xs px-3 py-1 rounded-md shadow-lg border border-white/10"
                        style={{ backgroundColor: "#4fa3ff" }}
                      >
                        Tambah ke Agenda
                      </button>
                    </div>
                  )}
                </div>
              ))
            ))}

          {/* Realisasi list */}
          {creditTab === "realisasi" &&
            [1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((prev) => (prev && prev.kind === "realisasi" && prev.id === i ? null : { kind: "realisasi", id: i }));
                  }}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-black">Nasabah #{i}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Baru realisasi kredit</div>
                  </div>

                  <div className="text-green-700 font-medium">
                    Rp {(i * 50000000).toLocaleString("id-ID")}
                  </div>
                </div>

                {selected && selected.kind === "realisasi" && selected.id === i && (
                  <div
                    className="absolute left-4 top-full mt-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        console.log("Added to agenda: Nasabah #" + i);
                        setSelected(null);
                      }}
                      className="w-fit text-white text-xs px-3 py-1 rounded-md shadow-lg border border-white/10"
                      style={{ backgroundColor: "#4fa3ff" }}
                    >
                      Tambah ke Agenda
                    </button>
                  </div>
                )}
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Performance Chart */}
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
