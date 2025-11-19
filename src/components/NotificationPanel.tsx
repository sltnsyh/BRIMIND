import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { X, AlertTriangle, Info, CheckCircle, CircleDollarSign } from "lucide-react";
import { Badge } from "./ui/badge";

interface Notification {
  id: number;
  customerName: string;
  amount: number;
  timestamp: string;
  type: "withdrawal" | "deposit";
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onClearAll: () => void;
}

export function NotificationPanel({
  notifications,
  onClose,
  onClearAll,
}: NotificationPanelProps) {

  // Tab state for the panel
  const [activeTab, setActiveTab] = useState<"penarikan" | "realisasi">("penarikan");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden animate-slide-up">

        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">Notifikasi</h2>
              <Badge>{notifications.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* TABS */}
          <div className="mt-3 p-1 rounded-xl flex gap-2 bg-gray-200">
            <button
              onClick={() => setActiveTab("penarikan")}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition"
              style={{
                backgroundColor:
                  activeTab === "penarikan" ? "#4fa3ff" : "#e5e7eb",
                color: "black",
              }}
            >
              Penarikan Besar
            </button>

            <button
              onClick={() => setActiveTab("realisasi")}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition"
              style={{
                backgroundColor:
                  activeTab === "realisasi" ? "#4fa3ff" : "#e5e7eb",
                color: "black",
              }}
            >
              Realisasi Kredit
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[calc(80vh-140px)] p-4 space-y-3">

          {/* TAB: PENARIKAN BESAR */}
          {activeTab === "penarikan" && (
            <>
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <p>Tidak ada penarikan besar</p>
                  <p className="text-sm">Anda sudah up to date!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} className="border-red-200 bg-red-50">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span>Peringatan Penarikan Besar</span>
                            <span className="text-red-600 whitespace-nowrap font-medium">
                              Rp {notification.amount.toLocaleString("id-ID")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            {notification.customerName} melakukan penarikan besar
                          </p>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <Info className="w-3 h-3" />
                            {new Date(notification.timestamp).toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}

          {/* TAB: REALISASI KREDIT */}
          {activeTab === "realisasi" && (
            <>
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="border-green-200 bg-green-50"
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <CircleDollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span>Realisasi Kredit Baru</span>
                          <span className="text-green-700 whitespace-nowrap font-medium">
                            Rp {(i * 50000000).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          Nasabah #{i} telah melakukan realisasi kredit
                        </p>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <Info className="w-3 h-3" />
                          Baru saja
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

        </div>

        {/* FOOTER */}
        {notifications.length > 0 && activeTab === "penarikan" && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
            <Button variant="outline" className="w-full" onClick={onClearAll}>
              Hapus Semua Notifikasi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
