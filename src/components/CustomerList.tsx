import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Search,
  TrendingDown,
  TrendingUp,
  Calendar,
  Users,
  X,
} from "lucide-react";

const customers = [
  { id: 1, name: "Ahmad Rizky Pratama", account: "****4521", balance: 247500, status: "active", lastActivity: "2h ago", risk: "low" },
  { id: 2, name: "Dewi Ayu Lestari", account: "****8932", balance: 892300, status: "active", lastActivity: "5h ago", risk: "medium" },
  { id: 3, name: "Siti Rahmawati", account: "****2156", balance: 156800, status: "active", lastActivity: "1d ago", risk: "low" },
  { id: 4, name: "Budi Santoso", account: "****7843", balance: 523400, status: "flagged", lastActivity: "30m ago", risk: "high" },
  { id: 5, name: "Andi Saputra", account: "****3298", balance: 384200, status: "active", lastActivity: "3h ago", risk: "low" },
];

export function CustomerList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.account.includes(searchQuery)
  );

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCustomer(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="space-y-4">

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari nasabah..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Nasabah Portofolio</span>
            <Badge>{filteredCustomers.length}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`p-3 rounded-xl border cursor-pointer transition active:scale-[0.98] ${customer.status === "flagged"
                ? "bg-red-50 border-red-200"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{customer.name}</span>
                    {customer.status === "flagged" && (
                      <Badge variant="destructive" className="text-xs">
                        Ditandai
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{customer.account}</span>
                </div>

                <div className="text-right">
                  <div className="font-medium">{rupiah(customer.balance)}</div>
                  <Badge
                    className="text-xs mt-1"
                    variant={
                      customer.risk === "high"
                        ? "destructive"
                        : customer.risk === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {customer.risk}
                  </Badge>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Aktivitas terakhir: {customer.lastActivity}</span>
                {customer.risk === "high" ? (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FROSTED BOTTOM SHEET */}
      {/* CLEAN WHITE BOTTOM SHEET */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{
            background: "rgba(0,0,0,0.35)",
            animation: "fadein 0.25s",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCustomer(null);
          }}
        >

          <div
            ref={sheetRef}
            className="w-full max-w-md mx-auto rounded-t-[32px] shadow-2xl border border-gray-200 bg-white"
            style={{
              padding: "26px 22px",
              animation: "slideup 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >

            {/* Drag handle */}
            <div
              className="w-14 h-1.5 rounded-full mx-auto mb-5"
              style={{ background: "rgba(0,0,0,0.15)" }}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-2xl shadow-md bg-blue-50"
                >
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Detail Nasabah
                </h3>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 text-sm text-gray-800">

              <DetailRow label="Nama" value={selectedCustomer.name} />
              <DetailRow label="Rekening" value={selectedCustomer.account} />
              <DetailRow
                label="Saldo"
                value={rupiah(selectedCustomer.balance)}
                big
                color="text-blue-700"
              />

              <div className="flex justify-between gap-4">
                <DetailRow
                  label="Risiko"
                  value={
                    <span
                      className="px-3 py-1 rounded-xl text-xs font-semibold"
                      style={{
                        background:
                          selectedCustomer.risk === "high"
                            ? "rgba(255, 80, 80, 0.2)"
                            : selectedCustomer.risk === "medium"
                              ? "rgba(255,165,0,0.2)"
                              : "rgba(80,200,120,0.2)",
                        color:
                          selectedCustomer.risk === "high"
                            ? "#b91c1c"
                            : selectedCustomer.risk === "medium"
                              ? "#d97706"
                              : "#166534",
                      }}
                    >
                      {selectedCustomer.risk}
                    </span>
                  }
                />

                <DetailRow
                  label="Status"
                  value={selectedCustomer.status}
                  alignRight
                />
              </div>

              <DetailRow
                label="Aktivitas Terakhir"
                value={selectedCustomer.lastActivity}
              />
            </div>

            {/* CTA BUTTON */}
            <button
              className="mt-6 w-full py-3 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] shadow-md transition"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              }}
            >
              <Calendar className="w-4 h-4" />
              Tambah ke Agenda
            </button>

            <style>{`
        @keyframes fadein {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes slideup {
          from { transform: translateY(100%); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
      `}</style>
          </div>
        </div>
      )}

    </div>
  );
}

/* Clean reusable detail row helper */
function DetailRow({
  label,
  value,
  alignRight = false,
  big = false,
  color = "",
}: any) {
  return (
    <div className={`${alignRight ? "text-right" : ""}`}>
      <div className="text-[11px] uppercase tracking-wider text-gray-600">
        {label}
      </div>
      <div
        className={`text-gray-900 ${big ? "text-lg font-semibold" : "text-base"
          } ${color}`}
      >
        {value}
      </div>
    </div>
  );
}
