import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  CircleDollarSign,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useMemo } from "react";

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
  
  // Dummy realisasi items
  const realisasiDummy = [1, 2, 3].map((i) => ({
    id: 2000 + i,
    customerName: `Nasabah #${i}`,
    amount: i * 50000000,
    timestamp: new Date().toISOString(),
    type: "deposit" as const,
  }));

  // Unified list (sorted newest first)
  const unifiedList = useMemo(() => {
    const combined = [
      ...notifications.map((n) => ({ ...n, category: "withdrawal" as const })),
      ...realisasiDummy.map((n) => ({ ...n, category: "realisasi" as const })),
    ];

    return combined.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [notifications]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div
        className="bg-white w-full rounded-t-2xl overflow-hidden animate-slide-up"
        style={{
          maxHeight: "75vh", // ⭐ perfect height for mobile
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">Notifikasi</h2>
            <Badge>{unifiedList.length}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* SCROLL AREA */}
        <div
          className="p-4 space-y-3 overflow-y-auto"
          style={{
            flex: 1,
          }}
        >
          {/* Empty State */}
          {unifiedList.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p>Tidak ada notifikasi</p>
              <p className="text-sm">Semua sudah dipantau</p>
            </div>
          )}

          {/* Notification List */}
          {unifiedList.map((item) => {
            const isWithdraw = item.category === "withdrawal";

            return (
              <Card
                key={item.id}
                className={`border ${
                  isWithdraw
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    {isWithdraw ? (
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    ) : (
                      <CircleDollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium">
                          {isWithdraw ? "Penarikan Besar" : "Realisasi Kredit"}
                        </span>
                        <span
                          className={`font-medium whitespace-nowrap ${
                            isWithdraw ? "text-red-600" : "text-green-700"
                          }`}
                        >
                          Rp {item.amount.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-1">
                        {isWithdraw
                          ? `${item.customerName} melakukan penarikan besar`
                          : `${item.customerName} telah realisasi kredit`}
                      </p>

                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FOOTER */}
        {unifiedList.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
            <Button variant="outline" className="w-full" onClick={onClearAll}>
              Hapus Semua Notifikasi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
