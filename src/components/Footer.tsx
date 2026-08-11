import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A87932] via-[#D83F3F] to-[#A87932]"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A87932] rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logos/logo-bps.png"
              alt="Logo BPS"
              width={80}
              height={80}
              className="object-contain opacity-90"
              style={{ width: "auto", height: "80px" }}
            />
            <span className="text-white font-bold text-xl md:text-2xl uppercase">
              BADAN PUSAT STATISTIK
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-white max-w-5xl mx-auto mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-[#A87932]" />
              <h3 className="font-bold text-[#A87932]">Alamat Kantor</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Jl. Ikan Betok Putih Rt. 004 Rw. 05 Pulau Pramuka Kecamatan Kepulauan Seribu Utara 14530
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <Phone className="w-5 h-5 text-[#A87932]" />
              <h3 className="font-bold text-[#A87932]">Kantor Penghubung</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Jl. Cempaka Putih Tengah XIV Rt. 008 Rw. 05 No. 10B Kelurahan Cempaka Putih Timur, Kecamatan Cempaka Putih, Jakarta Pusat 10510
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <Globe className="w-5 h-5 text-[#A87932]" />
              <h3 className="font-bold text-[#A87932]">Website</h3>
            </div>
            <a
              href="https://kepulauanseribukab.bps.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-[#A87932] transition-colors"
            >
              kepulauanseribukab.bps.go.id
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2026 BPS Kabupaten Kepulauan Seribu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
