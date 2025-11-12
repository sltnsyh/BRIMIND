import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

const customers = [
  { id: 1, name: "Ahmad Rizky Pratama", account: "****4521", balance: 247500, status: "active", lastActivity: "2h ago", risk: "low" },
  { id: 2, name: "Dewi Ayu Lestari", account: "****8932", balance: 892300, status: "active", lastActivity: "5h ago", risk: "medium" },
  { id: 3, name: "Siti Rahmawati", account: "****2156", balance: 156800, status: "active", lastActivity: "1d ago", risk: "low" },
  { id: 4, name: "Budi Santoso", account: "****7843", balance: 523400, status: "flagged", lastActivity: "30m ago", risk: "high" },
  { id: 5, name: "Andi Saputra", account: "****3298", balance: 384200, status: "active", lastActivity: "3h ago", risk: "low" },
  { id: 6, name: "Andi Saputra", account: "****5674", balance: 691500, status: "active", lastActivity: "6h ago", risk: "medium" },
];

export function CustomerList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.account.includes(searchQuery)
  );

  const formatRupiah = (number: number) => {
    return "Rp " + number.toLocaleString("id-ID");
  };

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
              className={`p-3 rounded-lg border ${
                customer.status === "flagged"
                  ? "bg-red-50 border-red-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span>{customer.name}</span>
                    {customer.status === "flagged" && (
                      <Badge variant="destructive" className="text-xs">
                        Ditandai
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{customer.account}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{formatRupiah(customer.balance)}</div>
                  <Badge
                    variant={
                      customer.risk === "high"
                        ? "destructive"
                        : customer.risk === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs mt-1"
                  >
                    {customer.risk === "high"
                      ? "tinggi"
                      : customer.risk === "medium"
                      ? "sedang"
                      : "rendah"}
                  </Badge>
                </div>
              </div>
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
    </div>
  );
}
