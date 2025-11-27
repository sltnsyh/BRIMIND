import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { FollowUpForm } from "./FollowUpForm";
import { Send, UserCheck, Building2, User, FileText } from "lucide-react";

interface InputPipelineProps {
  onSubmit: (data: any) => void;
  onFollowUpSubmit: (data: any) => void;
}

export function InputPipeline({ onSubmit, onFollowUpSubmit }: InputPipelineProps) {
  const [activeForm, setActiveForm] = useState<"referral" | "followup">("referral");
  const [formData, setFormData] = useState({
    pnRm: "",
    customerName: "",
    cifNasabah: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    plafond: "",
    supplierExisting: "",
    supplierName: "",
    supplierPhone: "",
    supplierNumber: "",
    supplierAddress: "",
    toBranch: "",
    kodeKantorCabang: "",
    kantorUnit: "",
    kodeKantorUnit: "",
    productInterest: "",
    estimatedValue: "",
    customerProfile: "",
    urgency: "",
    referralNotes: "",
    relationshipWithCustomer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.toBranch || !formData.productInterest) {
      toast.error("Mohon isi semua field yang wajib");
      return;
    }

    toast.success("Referral berhasil dikirim", {
      description: `${formData.customerName} dirujuk ke ${formData.toBranch}`,
      duration: 4000,
    });

    onSubmit({
      ...formData,
      timestamp: new Date().toISOString(),
      status: "sent",
      fromBranch: "Your Branch",
    });

    setFormData({
      pnRm: "",
      customerName: "",
      cifNasabah: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      plafond: "",
      supplierExisting: "",
      supplierName: "",
      supplierPhone: "",
      supplierNumber: "",
      supplierAddress: "",
      toBranch: "",
      kodeKantorCabang: "",
      kantorUnit: "",
      kodeKantorUnit: "",
      productInterest: "",
      estimatedValue: "",
      customerProfile: "",
      urgency: "",
      referralNotes: "",
      relationshipWithCustomer: "",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={activeForm === "referral" ? "default" : "outline"}
              onClick={() => setActiveForm("referral")}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <Send className="w-5 h-5" />
              <span>Kirim Referral</span>
            </Button>
            {/* <Button
              variant={activeForm === "followup" ? "default" : "outline"}
              onClick={() => setActiveForm("followup")}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <UserCheck className="w-5 h-5" />
              <span>Tindak Lanjut</span>
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {activeForm === "referral" ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Kirim Referral ke Cabang
              </CardTitle>
              <p className="text-sm text-gray-500">Rujuk nasabah ke cabang lain</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* === Informasi RM & CIF Nasabah === */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Informasi RM & CIF Nasabah</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pnRm">PN RM</Label>
                    <Input
                      id="pnRm"
                      placeholder="Masukkan PN RM"
                      value={formData.pnRm}
                      onChange={(e) => setFormData({ ...formData, pnRm: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cifNasabah">CIF Nasabah</Label>
                    <Input
                      id="cifNasabah"
                      placeholder="Masukkan CIF Nasabah"
                      value={formData.cifNasabah}
                      onChange={(e) => setFormData({ ...formData, cifNasabah: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plafond">Plafond</Label>
                    <Input
                      id="plafond"
                      type="number"
                      placeholder="0"
                      value={formData.plafond}
                      onChange={(e) => setFormData({ ...formData, plafond: e.target.value })}
                    />
                  </div>
                </div>

                {/* === Informasi Nasabah === */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Informasi Nasabah</span>
                  </div>
                  {/* ... existing Nama, Telepon, Email, Alamat fields ... */}
                </div>

                {/* === Informasi Supplier === */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Informasi Supplier</span>
                  </div>

                  <div className="space-y-2">
                    <Label>Apakah Supplier Sudah Menjadi Nasabah BRI?</Label>
                    <Select
                      value={formData.supplierExisting}
                      onValueChange={(v) => setFormData({ ...formData, supplierExisting: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jawaban" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Ya</SelectItem>
                        <SelectItem value="no">Belum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierName">Nama Supplier</Label>
                    <Input
                      id="supplierName"
                      placeholder="Masukkan nama supplier"
                      value={formData.supplierName}
                      onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierPhone">Nomor Telp Supplier</Label>
                    <Input
                      id="supplierPhone"
                      placeholder="+62 812-xxxx-xxxx"
                      value={formData.supplierPhone}
                      onChange={(e) => setFormData({ ...formData, supplierPhone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierNumber">Nomor Supplier</Label>
                    <Input
                      id="supplierNumber"
                      placeholder="Nomor ID Supplier"
                      value={formData.supplierNumber}
                      onChange={(e) => setFormData({ ...formData, supplierNumber: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierAddress">Alamat Supplier</Label>
                    <Input
                      id="supplierAddress"
                      placeholder="Alamat lengkap supplier"
                      value={formData.supplierAddress}
                      onChange={(e) => setFormData({ ...formData, supplierAddress: e.target.value })}
                    />
                  </div>
                </div>

                {/* === Kantor Cabang & Unit === */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Kantor Rujukan & Unit</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toBranch">Pilih Kantor Cabang *</Label>
                    <Select
                      value={formData.toBranch}
                      onValueChange={(v) => setFormData({ ...formData, toBranch: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kantor cabang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north_branch">Cabang Utara</SelectItem>
                        <SelectItem value="south_branch">Cabang Selatan</SelectItem>
                        <SelectItem value="east_branch">Cabang Timur</SelectItem>
                        <SelectItem value="west_branch">Cabang Barat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kodeKantorCabang">Kode Kantor Cabang</Label>
                    <Input
                      id="kodeKantorCabang"
                      placeholder="Masukkan kode cabang"
                      value={formData.kodeKantorCabang}
                      onChange={(e) =>
                        setFormData({ ...formData, kodeKantorCabang: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kantorUnit">Pilih Kantor Unit (Optional)</Label>
                    <Select
                      value={formData.kantorUnit}
                      onValueChange={(v) => setFormData({ ...formData, kantorUnit: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kantor unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unit_a">Unit A</SelectItem>
                        <SelectItem value="unit_b">Unit B</SelectItem>
                        <SelectItem value="unit_c">Unit C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kodeKantorUnit">Kode Kantor Unit</Label>
                    <Input
                      id="kodeKantorUnit"
                      placeholder="Masukkan kode unit (jika ada)"
                      value={formData.kodeKantorUnit}
                      onChange={(e) =>
                        setFormData({ ...formData, kodeKantorUnit: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Referral
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      ) : (
        <FollowUpForm onSubmit={onFollowUpSubmit} />
      )}
    </div>
  );
}
