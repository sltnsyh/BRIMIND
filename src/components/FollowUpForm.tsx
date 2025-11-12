import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface FollowUpFormProps {
  onSubmit: (data: any) => void;
}

export function FollowUpForm({ onSubmit }: FollowUpFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    visitType: "",
    visitDate: "",
    visitTime: "",
    location: "",
    purposeOfVisit: "",
    maintenanceType: "",
    issuesDiscussed: "",
    nextFollowUpDate: "",
    actionItems: "",
    customerSatisfaction: "",
    additionalNotes: "",
    visited: false,
    maintenanceCompleted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.visitType || !formData.visitDate) {
      toast.error("Mohon isi semua field yang wajib");
      return;
    }

    toast.success("Laporan tindak lanjut berhasil dikirim", {
      description: `${formData.customerName} - ${formData.visitType}`,
    });

    onSubmit({
      ...formData,
      timestamp: new Date().toISOString(),
    });

    // Reset form
    setFormData({
      customerName: "",
      visitType: "",
      visitDate: "",
      visitTime: "",
      location: "",
      purposeOfVisit: "",
      maintenanceType: "",
      issuesDiscussed: "",
      nextFollowUpDate: "",
      actionItems: "",
      customerSatisfaction: "",
      additionalNotes: "",
      visited: false,
      maintenanceCompleted: false,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Form Tindak Lanjut Nasabah</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Information */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Nama Nasabah *</Label>
              <Input
                id="customerName"
                placeholder="Masukkan nama nasabah"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitType">Jenis Kunjungan *</Label>
              <Select
                value={formData.visitType}
                onValueChange={(value) =>
                  setFormData({ ...formData, visitType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kunjungan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer_visit">Kunjungan Nasabah</SelectItem>
                  <SelectItem value="maintenance">Pemeliharaan</SelectItem>
                  <SelectItem value="consultation">Konsultasi</SelectItem>
                  <SelectItem value="follow_up">Pertemuan Tindak Lanjut</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visit Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="visitDate" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Tanggal Kunjungan *
                </Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) =>
                    setFormData({ ...formData, visitDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitTime" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Waktu
                </Label>
                <Input
                  id="visitTime"
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) =>
                    setFormData({ ...formData, visitTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Lokasi
              </Label>
              <Input
                id="location"
                placeholder="Lokasi nasabah atau cabang"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            {/* Purpose and Details */}
            <div className="space-y-2">
              <Label htmlFor="purposeOfVisit">Tujuan Kunjungan</Label>
              <Textarea
                id="purposeOfVisit"
                placeholder="Jelaskan tujuan kunjungan ini..."
                value={formData.purposeOfVisit}
                onChange={(e) =>
                  setFormData({ ...formData, purposeOfVisit: e.target.value })
                }
                rows={3}
              />
            </div>

            {formData.visitType === "maintenance" && (
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">Jenis Pemeliharaan</Label>
                <Select
                  value={formData.maintenanceType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, maintenanceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis pemeliharaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account_review">Review Rekening</SelectItem>
                    <SelectItem value="portfolio_rebalancing">Rebalancing Portofolio</SelectItem>
                    <SelectItem value="documentation_update">Update Dokumentasi</SelectItem>
                    <SelectItem value="technical_support">Dukungan Teknis</SelectItem>
                    <SelectItem value="relationship_check">Pemeriksaan Hubungan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="issuesDiscussed">Isu yang Dibahas</Label>
              <Textarea
                id="issuesDiscussed"
                placeholder="Topik dan isu utama yang dibahas selama kunjungan..."
                value={formData.issuesDiscussed}
                onChange={(e) =>
                  setFormData({ ...formData, issuesDiscussed: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionItems">Item Tindakan</Label>
              <Textarea
                id="actionItems"
                placeholder="Daftar item tindakan dan langkah selanjutnya..."
                value={formData.actionItems}
                onChange={(e) =>
                  setFormData({ ...formData, actionItems: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* Follow-up */}
            <div className="space-y-2">
              <Label htmlFor="nextFollowUpDate">Tanggal Tindak Lanjut Berikutnya</Label>
              <Input
                id="nextFollowUpDate"
                type="date"
                value={formData.nextFollowUpDate}
                onChange={(e) =>
                  setFormData({ ...formData, nextFollowUpDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerSatisfaction">Kepuasan Nasabah</Label>
              <Select
                value={formData.customerSatisfaction}
                onValueChange={(value) =>
                  setFormData({ ...formData, customerSatisfaction: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nilai kepuasan nasabah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Sangat Baik</SelectItem>
                  <SelectItem value="good">Baik</SelectItem>
                  <SelectItem value="fair">Cukup</SelectItem>
                  <SelectItem value="poor">Kurang</SelectItem>
                  <SelectItem value="needs_attention">Perlu Perhatian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Catatan Tambahan</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Catatan atau observasi tambahan..."
                value={formData.additionalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, additionalNotes: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visited"
                  checked={formData.visited}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, visited: checked as boolean })
                  }
                />
                <Label htmlFor="visited" className="flex items-center gap-2 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Nasabah telah dikunjungi
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maintenanceCompleted"
                  checked={formData.maintenanceCompleted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, maintenanceCompleted: checked as boolean })
                  }
                />
                <Label htmlFor="maintenanceCompleted" className="flex items-center gap-2 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Pemeliharaan/Layanan selesai
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Kirim Laporan Tindak Lanjut
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
