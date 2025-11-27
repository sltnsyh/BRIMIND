import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Search,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Filter,
  Building2,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { FollowUpForm } from "./FollowUpForm";

interface Lead {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  fromBranch: string;
  productInterest: string;
  estimatedValue: number;
  status: "new" | "contacted" | "in_progress" | "converted" | "declined";
  receivedDate: string;
  urgency: "urgent" | "high" | "medium" | "low";
  customerProfile: string;
  notes: string;
}

const initialLeads: Lead[] = [
  {
    id: 1,
    customerName: "Agus Setiawan",
    phone: "+62 812-3456-0123",
    email: "agus.setiawan@gmail.com",
    fromBranch: "Jakarta Utara Branch",
    productInterest: "Investment Products",
    estimatedValue: 250_000_000,
    status: "new",
    receivedDate: "2024-11-12",
    urgency: "urgent",
    customerProfile: "High Net Worth",
    notes:
      "Tertarik pada diversifikasi portofolio. Nasabah lama di cabang Jakarta Utara selama 5 tahun.",
  },
  {
    id: 2,
    customerName: "Putri Wulandari",
    phone: "+62 813-5678-1124",
    email: "putri.wulandari@yahoo.com",
    fromBranch: "Jakarta Selatan Branch",
    productInterest: "Mortgage",
    estimatedValue: 450_000_000,
    status: "contacted",
    receivedDate: "2024-11-11",
    urgency: "high",
    customerProfile: "Mass Affluent",
    notes:
      "Berencana membeli rumah pertama. Sudah pra-disetujui di bank lain namun memiliki relasi dengan cabang ini.",
  },
  {
    id: 3,
    customerName: "Rizal Hidayat",
    phone: "+62 812-8899-2235",
    email: "rizal.hidayat95@gmail.com",
    fromBranch: "Bandung Branch",
    productInterest: "Business Banking",
    estimatedValue: 180_000_000,
    status: "in_progress",
    receivedDate: "2024-11-10",
    urgency: "medium",
    customerProfile: "Small Business",
    notes:
      "Sedang memperluas usaha ke wilayah Bandung. Membutuhkan rekening bisnis dan fasilitas kredit.",
  },
  {
    id: 4,
    customerName: "Melati Kusuma",
    phone: "+62 811-2233-5567",
    email: "melati.kusuma@outlook.com",
    fromBranch: "Surabaya Branch",
    productInterest: "Wealth Management",
    estimatedValue: 820_000_000,
    status: "contacted",
    receivedDate: "2024-11-09",
    urgency: "urgent",
    customerProfile: "High Net Worth",
    notes:
      "Baru menerima warisan keluarga. Membutuhkan perencanaan kekayaan yang komprehensif.",
  },
  {
    id: 5,
    customerName: "Dian Purnama Sari",
    phone: "+62 815-6677-8899",
    email: "dianpurnamasari98@gmail.com",
    fromBranch: "Yogyakarta Branch",
    productInterest: "Savings Account",
    estimatedValue: 75_000_000,
    status: "new",
    receivedDate: "2024-11-12",
    urgency: "low",
    customerProfile: "Retail",
    notes:
      "Baru pindah ke Yogyakarta untuk pekerjaan baru. Mencari bank lokal dengan layanan digital yang baik.",
  },
  {
    id: 6,
    customerName: "Fajar Nugroho",
    phone: "+62 812-9988-5544",
    email: "fajar.nugroho@ymail.com",
    fromBranch: "Semarang Branch",
    productInterest: "Loan/Financing",
    estimatedValue: 95_000_000,
    status: "converted",
    receivedDate: "2024-11-05",
    urgency: "medium",
    customerProfile: "Retail",
    notes:
      "Pinjaman kendaraan telah disetujui dan selesai. Memberikan ulasan positif tentang layanan cabang.",
  },
];

export function LeadsData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [leads] = useState<Lead[]>(initialLeads);

  // ⭐ NEW TAB: REFERRAL / FOLLOW-UP
  const [activeLeadTab, setActiveLeadTab] = useState<"referral" | "followup">(
    "referral"
  );

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.fromBranch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "in_progress":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "converted":
        return "bg-green-100 text-green-700 border-green-200";
      case "declined":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  const totalLeadValue = filteredLeads.reduce(
    (sum, lead) => sum + lead.estimatedValue,
    0
  );
  const newLeadsCount = filteredLeads.filter(
    (lead) => lead.status === "new"
  ).length;

  const urgentLeadsCount = filteredLeads.filter(
    (lead) => lead.urgency === "urgent"
  ).length;

  return (
    <div className="space-y-4">

      {/* ⭐ TOP TABS */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => setActiveLeadTab("referral")}
          variant={activeLeadTab === "referral" ? "default" : "outline"}
          className="py-3"
        >
          Referral
        </Button>

        <Button
          onClick={() => setActiveLeadTab("followup")}
          variant={activeLeadTab === "followup" ? "default" : "outline"}
          className="py-3 flex items-center gap-1"
        >
          Tindak Lanjut
        </Button>
      </div>

      {/* ⭐ REFERRAL LIST PAGE */}
      {activeLeadTab === "referral" && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">
                  Referral Diterima
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>{filteredLeads.length}</div>
                <div className="text-xs text-blue-600 flex items-center gap-1">
                  {newLeadsCount} baru
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">
                  Total Potensi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  Rp{totalLeadValue.toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div className="text-xs text-red-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {urgentLeadsCount} mendesak
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search + Filter */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari referral..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Filter berdasarkan status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="new">Baru</SelectItem>
                    <SelectItem value="contacted">Dihubungi</SelectItem>
                    <SelectItem value="in_progress">Dalam Proses</SelectItem>
                    <SelectItem value="converted">Berhasil</SelectItem>
                    <SelectItem value="declined">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Leads Listing */}
          <div className="space-y-3">
            {filteredLeads.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <p>Tidak ada referral ditemukan</p>
                  <p className="text-sm">Coba sesuaikan filter Anda</p>
                </CardContent>
              </Card>
            ) : (
              filteredLeads.map((lead) => (
                <Card key={lead.id} className="overflow-hidden">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{lead.customerName}</span>
                          <Badge
                            variant={getUrgencyColor(lead.urgency) as any}
                            className="text-xs"
                          >
                            {lead.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Building2 className="w-3 h-3" />
                          <span>dari {lead.fromBranch}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm">
                          Rp{lead.estimatedValue.toLocaleString("id-ID")}
                        </div>
                        <Badge
                          className={`text-xs mt-1 ${getStatusColor(
                            lead.status
                          )}`}
                          variant="outline"
                        >
                          {lead.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mb-3 text-sm">
                      <span>Interest: {lead.productInterest}</span>
                      <span className="mx-2">•</span>
                      <span>{lead.customerProfile}</span>
                    </div>

                    <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="bg-gray-50 px-3 py-2 rounded-lg mb-3">
                        <div className="text-xs text-gray-500 mb-1">Catatan:</div>
                        <p className="text-sm text-gray-700">{lead.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Diterima:{" "}
                        {new Date(lead.receivedDate).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3 mr-1" />
                        Hubungi
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Conversion Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Performa Referral
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl">
                  {leads.filter((l) => l.status === "converted").length}
                </div>
                <div className="text-xs text-gray-500">Berhasil</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">
                  {(
                    (leads.filter((l) => l.status === "converted").length /
                      leads.length) *
                    100
                  ).toFixed(0)}
                  %
                </div>
                <div className="text-xs text-gray-500">Tingkat Sukses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">
                  {leads.filter((l) => l.status === "in_progress").length}
                </div>
                <div className="text-xs text-gray-500">Dalam Proses</div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ⭐ FOLLOW UP FORM TAB */}
      {activeLeadTab === "followup" && (
        <FollowUpForm
          onSubmit={(data: any) => console.log("Follow Up Submitted:", data)}
        />
      )}
    </div>
  );
}
