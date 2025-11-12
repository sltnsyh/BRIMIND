import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bell, Mail, Lock, User } from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Pengaturan Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifikasi Penarikan Besar</Label>
              <div className="text-xs text-gray-500">
                Dapatkan notifikasi untuk penarikan ≥ threshold
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifikasi Email</Label>
              <div className="text-xs text-gray-500">
                Terima peringatan via email
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifikasi Push</Label>
              <div className="text-xs text-gray-500">
                Peringatan push real-time
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="pt-2">
            <Label htmlFor="threshold" className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Rp</span>
              Jumlah Threshold Peringatan
            </Label>
            <Input
              id="threshold"
              type="number"
              placeholder="100000000"
              defaultValue="100000000"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Jumlah penarikan minimum untuk memicu peringatan
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Pengaturan Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" defaultValue="Aroma Terapi" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input id="email" type="email" defaultValue="aroma.t@company.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Jabatan</Label>
            <Input id="role" defaultValue="BRIMIND Marketing" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Keamanan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Ubah Password
          </Button>
          <Button variant="outline" className="w-full">
            Aktifkan Autentikasi Dua Faktor
          </Button>
        </CardContent>
      </Card>

      <div className="pt-4 pb-2">
        <Button className="w-full">Simpan Perubahan</Button>
      </div>
    </div>
  );
}
