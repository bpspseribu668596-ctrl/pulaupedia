"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";

interface DocumentItem {
  id: string;
  title: string;
  link: string;
  isExpandable?: boolean;
  subitems?: DocumentItem[];
}

interface PortalSectionData {
  section: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  documents: DocumentItem[];
  hasZi2024Button?: boolean;
}

const defaultSections: { [key: string]: PortalSectionData } = {
  keuangan: {
    section: "keuangan",
    title: "KEUANGAN",
    subtitle: "Dokumen dan Arsip Keuangan",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      {
        id: "1",
        title: "Kelengkapan Pengajuan Anggaran",
        link: "",
        isExpandable: true,
        subitems: [
          { id: "1-1", title: "Kelengkapan Pengajuan Anggaran TA2025", link: "https://docs.google.com/document/d/13iIYdPxVliFH4QpkSZzBklj6fVfSWT0vIfyuPUgYdSg/edit?usp=drive_link" },
          { id: "1-2", title: "SK", link: "https://drive.google.com/drive/folders/1XWtoIsFJ71RjWIyEq0bDEPgRcqZigNp1?usp=sharing" },
          { id: "1-3", title: "KAK", link: "https://drive.google.com/drive/folders/1ywN3EKvIrD_0WNGZhpWCfb9yD9dOL4Xx?usp=sharing" },
          { id: "1-4", title: "Form Permintaan", link: "https://drive.google.com/drive/folders/1mXhUitreD4IkCEJyJYmmM7qqKCM4_J8z?usp=sharing" },
        ],
      },
      { id: "2", title: "Kop Surat", link: "https://docs.google.com/document/d/1aFuAOrguDtiIQTyYUQvxUiNiXjuWhC-4/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true" },
      { id: "3", title: "Draft Notula", link: "https://docs.google.com/document/d/1lj_S3IWI_XbzKzY6_iij1Ux9Qy1GpquS/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true" },
      { id: "4", title: "Juknis Akuntansi Laporan Keuangan", link: "https://sites.google.com/view/bimbingan-sai" },
    ],
  },
  "bmn-persediaan": {
    section: "bmn-persediaan",
    title: "BMN & PERSEDIAAN",
    subtitle: "Barang Milik Negara dan Persediaan",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "Identifikasi Kebutuhan ATK 2026", link: "https://docs.google.com/spreadsheets/d/1SCAEUF2GU7e4x6TIUaJoAzt5ST7qobU06iMzhoRKCCc/edit?usp=sharing" },
      { id: "2", title: "Lampiran KMK", link: "https://drive.google.com/file/d/1Nalxe48cjtSiBpt26-kI06wi4yyIA0LK/view?usp=sharing" },
      { id: "3", title: "Penetapan Status Penggunaan BMN Bangunan dan Selain Tanah dan-atau Bangunan pada BPS", link: "https://drive.google.com/file/d/1SDleCEbGFKn1jT_Kz6ngu-9Zb_72PdD0/view?usp=drive_link" },
      { id: "4", title: "PSP Kendaraan Operasional Roda 4 dan 2_2012", link: "https://drive.google.com/file/d/19uOGbjq1NKQQsBuArWzLsNgHKm3aYutF/view?usp=drive_link" },
      { id: "5", title: "PSP Pulau Seribu 2024", link: "https://drive.google.com/file/d/1_hTwRvEEfqzIheHkoj8q40JjABcLQvFp/view?usp=drive_link" },
      { id: "6", title: "SK PSP No. 338 Tgl.28 Mei'24 di Wilayah Provinsi DKI Jakarta", link: "https://drive.google.com/file/d/1DxuAJ0Q5rSSqhNP2kr5W0D6AW4tv2Poq/view?usp=drive_link" },
    ],
  },
  sakip: {
    section: "sakip",
    title: "SAKIP",
    subtitle: "Sistem Akuntabilitas Kinerja Instansi Pemerintah",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "SAKIP 2024", link: "https://s.bps.go.id/Dokumen-SAKIP2024" },
      { id: "2", title: "SAKIP 2025", link: "https://drive.bps.go.id/s/WG5br3FbGjnd3nn" },
    ],
  },
  humas: {
    section: "humas",
    title: "HUMAS",
    subtitle: "Hubungan Masyarakat dan Komunikasi",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "Instagram", link: "https://www.instagram.com/bpskabupatenkepulauanseribu/" },
      { id: "2", title: "YouTube", link: "https://www.youtube.com/@bpskepulauanseribu4158" },
      {
        id: "3",
        title: "Foto Kegiatan",
        link: "",
        isExpandable: true,
        subitems: [
          { id: "3-1", title: "Tahun 2024", link: "https://drive.google.com/drive/folders/1KZCMDx_xr683WppTxLfa4usJpVYTMpgO?usp=sharing" },
          { id: "3-2", title: "Tahun 2025", link: "https://drive.google.com/drive/folders/1B58_QpN4CInHyeH6hPxoUtprBIVklBph?usp=sharing" },
        ],
      },
    ],
  },
  bigram: {
    section: "bigram",
    title: "BIGRAM",
    subtitle: "Bimbingan dan Pengawasan Umum",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "KK RPD, Revisi dan Matriks Mitra 2025", link: "https://docs.google.com/spreadsheets/d/1M6rp9hU0CUowVN363sD_zlN_oy1R3JDjC3pEXkwiHOA/edit?usp=sharing" },
      { id: "2", title: "DIPA dan POK", link: "https://drive.google.com/drive/folders/1QXFRoIYq4RKRFwonJ99fQuSgURJupK3X" },
      { id: "3", title: "E-Monev Bappenas", link: "https://e-monev.bappenas.go.id/portal/" },
      { id: "4", title: "Monitoring Evaluasi Kemenkeu", link: "https://monev.kemenkeu.go.id/" },
      { id: "5", title: "Masterplan", link: "https://shbj.bps.go.id/masterplan/" },
    ],
  },
  "zona-integritas": {
    section: "zona-integritas",
    title: "ZONA INTEGRITAS",
    subtitle: "Dokumen dan Arsip Zona Integritas",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "A.I. Pengungkit - Pemenuhan", link: "https://drive.google.com/drive/folders/pengungkit-pemenuhan" },
      { id: "2", title: "A.II. Pengungkit - Reform", link: "https://drive.google.com/drive/folders/pengungkit-reform" },
      { id: "3", title: "B. Hasil", link: "https://drive.google.com/drive/folders/hasil" },
    ],
    hasZi2024Button: true,
  },
  pengadaan: {
    section: "pengadaan",
    title: "PENGADAAN BARANG & JASA",
    subtitle: "Dokumen Pengadaan Barang dan Jasa",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "Pelatihan Sakernas Agustus 2024", link: "https://drive.google.com/drive/folders/14fZrahleLeoCrfDQKKLsY-gbnUbPmdNo?usp=drive_link" },
      { id: "2", title: "Pengadaan Jasa Keamanan dan Kebersihan 2024", link: "https://drive.google.com/drive/folders/1ZrYEmhYJPfJu5bUzimOpB8LnMBAU-jr2?usp=drive_link" },
    ],
  },
  kepegawaian: {
    section: "kepegawaian",
    title: "KEPEGAWAIAN",
    subtitle: "Dokumen dan Arsip Kepegawaian",
    backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
    documents: [
      { id: "1", title: "Nomor Surat dan Nomor SK", link: "https://docs.google.com/spreadsheets/d/1ka8xRpj1eTGDaO-9DRwMQ0u3WIi2ieDTYRdAAdRtDXg/edit?pli=1&gid=0#gid=0" },
      { id: "2", title: "Rekap Perjalanan Dinas", link: "https://docs.google.com/spreadsheets/d/1GSxAsD7MxE0iMBKMDzDlHQUA5hObz7XR1THVQhAAayE/edit?usp=sharing" },
      { id: "3", title: "Laporan FWA Pegawai 24-27 Maret '25", link: "https://drive.google.com/drive/folders/11h_2tkHKrkMxzfabOsbr6-hXFERvgp6x?usp=sharing" },
      { id: "4", title: "Aturan Kepegawaian", link: "https://drive.google.com/drive/folders/1RkF3WYZNNMXHQ81yB4W_1mKMSsOzbysU?usp=sharing" },
      { id: "5", title: "Penetapan Angka Kredit (PAK)", link: "http://s.bps.go.id/PAK_Pegawai" },
    ],
  },
};

const sectionOptions = [
  { value: "keuangan", label: "Keuangan" },
  { value: "bmn-persediaan", label: "BMN & Persediaan" },
  { value: "sakip", label: "SAKIP" },
  { value: "humas", label: "HUMAS" },
  { value: "bigram", label: "Bigram" },
  { value: "zona-integritas", label: "Zona Integritas" },
  { value: "pengadaan", label: "Pengadaan" },
  { value: "kepegawaian", label: "Kepegawaian" },
];

export default function AdminPortalUmumSectionsPage() {
  const [selectedSection, setSelectedSection] = useState<string>("keuangan");
  const [formData, setFormData] = useState<PortalSectionData>(defaultSections.keuangan);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setFormData(defaultSections[section as keyof typeof defaultSections]);
    setSaveMessage("");
  };

  const handleFieldChange = (field: keyof PortalSectionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentChange = (docId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === docId ? { ...doc, [field]: value } : doc
      ),
    }));
  };

  const handleSubitemChange = (docId: string, subitemId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc => {
        if (doc.id === docId && doc.subitems) {
          return {
            ...doc,
            subitems: doc.subitems.map(subitem =>
              subitem.id === subitemId ? { ...subitem, [field]: value } : subitem
            ),
          };
        }
        return doc;
      }),
    }));
  };

  const handleAddDocument = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, { id: newId, title: "", link: "", isExpandable: false }],
    }));
  };

  const handleRemoveDocument = (docId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== docId),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage(`${formData.title} berhasil diperbarui!`);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sub-Halaman Portal Umum</h1>
        <p className="text-muted-foreground mt-2">Kelola konten 8 sub-halaman Portal Umum</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes("berhasil") 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Section Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Pilih Section</CardTitle>
          <CardDescription>Pilih halaman sub-portal yang ingin dikelola</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {sectionOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedSection === option.value ? "default" : "outline"}
                onClick={() => handleSectionChange(option.value)}
                className="text-xs md:text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Header Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Header Settings</CardTitle>
          <CardDescription>Pengaturan header hero untuk {formData.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleFieldChange("subtitle", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="bgImage">Background Image URL</Label>
            <Input
              id="bgImage"
              value={formData.backgroundImage}
              onChange={(e) => handleFieldChange("backgroundImage", e.target.value)}
              className="mt-2"
              placeholder="/images/hero.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents Management */}
      <Card>
        <CardHeader>
          <CardTitle>Documents/Links</CardTitle>
          <CardDescription>Kelola dokumen dan link untuk section ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {formData.documents.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Judul Dokumen</Label>
                    <Input
                      value={doc.title}
                      onChange={(e) => handleDocumentChange(doc.id, "title", e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="Judul dokumen"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Link</Label>
                    <Input
                      value={doc.link}
                      onChange={(e) => handleDocumentChange(doc.id, "link", e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="https://..."
                      disabled={doc.isExpandable}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`expand-${doc.id}`}
                    checked={doc.isExpandable || false}
                    onChange={(e) => handleDocumentChange(doc.id, "isExpandable", String(e.target.checked))}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={`expand-${doc.id}`} className="cursor-pointer text-sm">
                    Adalah dropdown/expandable
                  </Label>
                </div>

                {doc.isExpandable && doc.subitems && (
                  <div className="pl-4 border-l-2 border-gray-300 space-y-2">
                    <Label className="text-xs font-semibold">Sub-items:</Label>
                    {doc.subitems.map((subitem) => (
                      <div key={subitem.id} className="bg-white p-2 rounded space-y-2">
                        <Input
                          value={subitem.title}
                          onChange={(e) => handleSubitemChange(doc.id, subitem.id, "title", e.target.value)}
                          placeholder="Judul sub-item"
                          className="text-xs"
                        />
                        <Input
                          value={subitem.link}
                          onChange={(e) => handleSubitemChange(doc.id, subitem.id, "link", e.target.value)}
                          placeholder="https://..."
                          className="text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="w-full text-xs"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Hapus
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleAddDocument} className="w-full text-xs">
            <Plus className="w-3 h-3 mr-2" />
            Tambah Dokumen
          </Button>
        </CardContent>
      </Card>

      {/* Special Features */}
      {formData.hasZi2024Button && (
        <Card>
          <CardHeader>
            <CardTitle>Special Features</CardTitle>
            <CardDescription>Fitur khusus untuk section ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="zi2024Btn"
                defaultChecked={true}
                className="cursor-pointer"
              />
              <Label htmlFor="zi2024Btn" className="cursor-pointer">
                Tampilkan tombol "ZI 2024" di bawah dokumen
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => handleSectionChange(selectedSection)}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}
